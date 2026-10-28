import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app=express(); const PORT=Number(process.env.PORT||8787);
const here=path.dirname(fileURLToPath(import.meta.url)); const dataDir=path.join(here,'data'); const dbFile=path.join(dataDir,'users.json');
fs.mkdirSync(dataDir,{recursive:true}); if(!fs.existsSync(dbFile))fs.writeFileSync(dbFile,'[]','utf8');
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:5173'})); app.use(express.json({limit:'100kb'}));
const sessions=new Map();
function readUsers(){try{const d=JSON.parse(fs.readFileSync(dbFile,'utf8'));return Array.isArray(d)?d:[]}catch{return []}}
function writeUsers(users){fs.writeFileSync(dbFile,JSON.stringify(users,null,2),'utf8')}
function safeUser(u){const {passwordHash,passwordSalt,...safe}=u;return safe}
function requireAdmin(req,res,next){const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');const session=sessions.get(token);if(!session||session.role!=='admin')return res.status(401).json({message:'Your session is invalid or expired. Please sign in again.'});req.admin=session;next()}
app.get('/api/health',(req,res)=>res.json({ok:true,service:'admin-api'}));
app.post('/api/admin/login',(req,res)=>{const email=String(req.body?.email||'').trim().toLowerCase();const password=String(req.body?.password||'');const adminEmail=String(process.env.ADMIN_EMAIL||'admin@example.com').trim().toLowerCase();const adminPassword=String(process.env.ADMIN_PASSWORD||'');if(!adminPassword)return res.status(503).json({message:'Admin password is not configured. Set ADMIN_PASSWORD in your .env file and restart the server.'});if(email!==adminEmail||password!==adminPassword)return res.status(401).json({message:'Incorrect administrator email or password.'});const token=crypto.randomBytes(32).toString('hex');sessions.set(token,{email:adminEmail,role:'admin',createdAt:Date.now()});res.json({token,email:adminEmail,role:'admin'})});
app.post('/api/admin/logout',requireAdmin,(req,res)=>{const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');sessions.delete(token);res.json({ok:true})});
app.get('/api/admin/users',requireAdmin,(req,res)=>{const users=readUsers().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));res.json({users:users.map(safeUser),total:users.length})});
app.post('/api/admin/users',requireAdmin,(req,res)=>{const name=String(req.body?.name||'').trim();const email=String(req.body?.email||'').trim().toLowerCase();const role=req.body?.role==='admin'?'admin':'user';const status=req.body?.status==='disabled'?'disabled':'active';if(!name||!email||!/^\S+@\S+\.\S+$/.test(email))return res.status(400).json({message:'Enter a name and valid email address.'});const users=readUsers();if(users.some(u=>u.email.toLowerCase()===email))return res.status(409).json({message:'A user with this email already exists.'});const user={id:crypto.randomUUID(),name,email,role,status,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};users.push(user);writeUsers(users);res.status(201).json({user:safeUser(user)})});
app.patch('/api/admin/users/:id',requireAdmin,(req,res)=>{const users=readUsers();const index=users.findIndex(u=>u.id===req.params.id);if(index<0)return res.status(404).json({message:'User not found.'});const name=String(req.body?.name??users[index].name).trim();const email=String(req.body?.email??users[index].email).trim().toLowerCase();if(!name||!/^\S+@\S+\.\S+$/.test(email))return res.status(400).json({message:'Enter a name and valid email address.'});if(users.some((u,i)=>i!==index&&u.email.toLowerCase()===email))return res.status(409).json({message:'A user with this email already exists.'});users[index]={...users[index],name,email,role:req.body?.role==='admin'?'admin':'user',status:req.body?.status==='disabled'?'disabled':'active',updatedAt:new Date().toISOString()};writeUsers(users);res.json({user:safeUser(users[index])})});
app.delete('/api/admin/users/:id',requireAdmin,(req,res)=>{const users=readUsers();const next=users.filter(u=>u.id!==req.params.id);if(next.length===users.length)return res.status(404).json({message:'User not found.'});writeUsers(next);res.json({ok:true})});
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:'Unexpected server error.'})});
app.listen(PORT,()=>console.log(`Admin API running at http://localhost:${PORT}`));
