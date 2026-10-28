# Black & White Admin Dashboard (React + Express)

A responsive monochrome admin dashboard with a real Express API and persistent local user records.

## Features that work
- Admin sign-in backed by server-side credentials in `.env`.
- Dashboard counts based on the API's actual user records.
- Add, edit, delete, search and refresh users.
- Export visible users to CSV.
- User role/status fields, recent registrations, responsive navigation and sign-out.
- JSON records persist in `server/data/users.json` between server restarts.

## Run locally
Requirements: Node.js 18 or newer.

1. Open this folder in VS Code.
2. Copy `.env.example` to `.env`.
3. Change `ADMIN_EMAIL` and `ADMIN_PASSWORD` to your own private credentials.
4. In terminal one run `npm install`, then `npm run server`.
5. In terminal two run `npm run dev`.
6. Open the local URL Vite prints (normally `http://localhost:5173`) and sign in with the credentials from `.env`.

The API runs on `http://localhost:8787` by default. `CLIENT_ORIGIN` should match the frontend origin. For another API host, set `VITE_API_URL` at Vite build time.

## Important security notes
This is a local development starter, not a production-ready identity service. Sessions are in memory and expire when the server restarts; user records are stored in a local JSON file and are not designed for concurrent/multi-server deployments. Before public deployment, use a managed database, secure session storage, rate limiting, HTTPS, CSRF protections as appropriate, and a proper authentication provider. Never commit `.env` or expose admin credentials in frontend code. The admin UI manages user records; it does not create or reset end-user passwords.
