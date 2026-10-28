# Admin Console — React + Vercel

This is a real dashboard UI scaffold, not a seeded demo. It contains no sample user records. The Users page shows an explicit empty state until you connect your friend's backend.

## Deploy
1. Upload these files to a GitHub repository and import it into Vercel.
2. In Vercel → Project → Settings → Environment Variables, set:
   - `ADMIN_EMAIL` to your administrator email
   - `ADMIN_PASSWORD` to your chosen administrator password
3. Redeploy and sign in.

The credentials are checked by the serverless `/api/login` endpoint and are not included in the browser bundle. Do not commit real passwords to GitHub.

## Backend integration
The included login endpoint only verifies admin credentials and issues a random UI token. It does not yet implement server-side sessions or protect data APIs. Before connecting sensitive real user data, implement secure server-side session/token validation and authorization on every backend route. Your friend should provide the API base URL, authentication contract, and user endpoints (e.g. list, update, disable, delete). The UI intentionally shows no fake user records until that API is connected.
