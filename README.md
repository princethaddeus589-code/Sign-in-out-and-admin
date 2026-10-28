# Portfolia — Landing, Authentication and Admin

This project keeps Portfolia's black/white visual style with a lime accent and includes the landing page, sign-up/sign-in modal, logout, and an owner-only admin area. The user's workspace UI is not being rewritten as part of this update.

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env`.
3. Set `VITE_ADMIN_EMAIL` and `ADMIN_EMAIL` to the same owner email. Set `ADMIN_PASSWORD` to a strong password that is different from your normal user password.
4. In a terminal, run `npm install`.
5. Start the API in one terminal: `npm run server`.
6. Start the site in a second terminal: `npm run dev`.
7. Open the Vite URL shown in the terminal, normally `http://localhost:5173`.
8. Create regular accounts through Sign up. To enter `/admin`, sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## User records

New registrations are saved in `server/data/users.json`; passwords are stored as scrypt hashes, not plain text. The admin People section calls a protected API endpoint and displays real records from that local development store. Do not manually add fake users to the file.

## Important deployment note

This Express API is designed for local development. The JSON file and in-memory sessions are not a production database/authentication service, and the admin password/token setup is not sufficient for a public production launch. For Vercel or another hosted deployment, deploy the API separately and replace the local API URL in `src/App.jsx` with your API URL; use a managed database, secure persistent sessions, HTTPS, rate limiting, and server-side role checks. Do not expose `.env` or commit it to Git.
