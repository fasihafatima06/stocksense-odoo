# StockSense

StockSense is a modular, ledger-backed inventory management system for warehouse teams. It uses a vanilla JavaScript/Vite frontend, Express REST API, PostgreSQL, Firebase Authentication, and Firebase Admin token verification.

## What is implemented

- Compact, responsive Odoo-inspired StockSense application shell and authentication screens.
- Products, categories, warehouses, locations, dashboard, receipts, deliveries, transfers, adjustments, and append-only move history.
- PostgreSQL transaction-backed validation: receipts increase stock, deliveries reject insufficient stock, transfers create paired in/out ledger entries, and adjustments reconcile to physical count.
- RBAC middleware for Admin, Inventory Manager, and Warehouse Staff; HTTP hardening with Helmet, CORS, rate limiting, validation, and consistent API errors.
- Secure OTP orchestration: hashed code only, ten-minute expiry, five attempts, request throttling, Resend delivery, and Firebase Admin password update. The server never returns or logs OTP values.

## Local setup

1. Create a PostgreSQL database (Neon is recommended) and copy `.env.example` to `.env`.
2. Set `DATABASE_URL` and Firebase server values. For local API-only development, use `NODE_ENV=development`; Firebase verification is enforced in production.
3. Install and prepare the app:

   ```bash
   npm install
   npm run migrate
   npm run seed
   npm run dev
   ```

   The client runs at `http://localhost:5173`, API at `http://localhost:4000`.

4. Run core inventory tests with `npm test`.

## Production authentication

Enable **Email/Password** in Firebase Authentication. Create a Firebase web app and expose only the public `FIREBASE_*` client configuration through Vite variables. Place Firebase Admin values (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) only in Render environment variables. The frontend must obtain the Firebase ID token after sign-in and send it as `Authorization: Bearer <token>`; the Express `requireAuth` middleware verifies it server-side.

For full production sign-up/sign-in, add the Firebase web SDK configuration to the client deployment environment. The UI currently provides the integration-ready screens and uses the deliberately limited development session only while `NODE_ENV=development`.

## Deployment (free-tier-first)

1. **Neon:** create a PostgreSQL project; add its pooled connection string as `DATABASE_URL`; run `npm run migrate` and `npm run seed` locally against it.
2. **Firebase:** create a project, enable Email/Password, create a web app, and set up Hosting. Add the Firebase web configuration to your frontend environment.
3. **Render:** create a Node Web Service from this repo. Use build command `npm install && npm run build`, start command `npm start`, and add all server environment variables from `.env.example`. Set `CLIENT_URL` to the Firebase Hosting domain.
4. **Firebase Hosting:** deploy `dist` using `firebase deploy --only hosting`. Set the frontend’s API URL to the Render service URL. No database or Admin credentials belong in Hosting.
5. **Email:** create a Resend API key, verify the `EMAIL_FROM` sender domain, and add `EMAIL_PROVIDER_API_KEY`/`EMAIL_FROM` to Render. The OTP route uses Resend’s transactional-email API; verify rate limits, reset expiry, and CORS domain before launch.

Services may change their free quotas or require billing verification; check each provider’s current policy before production use.

## Key API routes

`/api/products`, `/api/categories`, `/api/warehouses`, `/api/locations`, `/api/receipts`, `/api/deliveries`, `/api/transfers`, `/api/adjustments`, `/api/stock-ledger`, and `/api/dashboard/*` are protected REST endpoints. Status values are `DRAFT`, `WAITING`, `READY`, `DONE`, and `CANCELED`.

## Data integrity notes

Current availability comes from `stock_balances`, never a product field. Every validated mutation inserts a `stock_ledger` record inside the same transaction. Balances are locked using `SELECT … FOR UPDATE`; a failed validation rolls back the complete operation.
