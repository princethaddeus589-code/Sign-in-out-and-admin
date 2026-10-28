# Black & White Vercel Admin Dashboard

## Deploy
1. Upload these project files to a GitHub repository and import it into Vercel (or use them to replace files in an existing project).
2. In Vercel → Project → Settings → Environment Variables, add `ADMIN_EMAIL` and `ADMIN_PASSWORD` with the credentials you choose.
3. Redeploy after adding the variables. Sign in on the deployed site with those values.

The login API checks credentials server-side in `/api/login`; credentials are not hardcoded in React.

## Important limitations
The sample user directory is stored in this browser's `localStorage` and contains sample records. It is not connected to real application users or a shared database. The login token is a basic sign-in demonstration, not a complete authorization/session system. Before using this for sensitive data or production user management, add secure server-side sessions, protect all data APIs, and connect a persistent database. Never commit real secrets to GitHub.
