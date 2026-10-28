import crypto from 'node:crypto';
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return res.status(500).json({ error: 'Admin login is not configured in Vercel Environment Variables.' });
  const given = Buffer.from(typeof password === 'string' ? password : '');
  const expected = Buffer.from(adminPassword);
  const passwordMatches = given.length === expected.length && crypto.timingSafeEqual(given, expected);
  if (typeof email !== 'string' || email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || !passwordMatches) return res.status(401).json({ error: 'Incorrect email or password.' });
  return res.status(200).json({ ok: true, token: crypto.randomBytes(32).toString('hex'), email: adminEmail });
}
