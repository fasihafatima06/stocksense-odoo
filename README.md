# StockSense — Inventory Management System

[![StockSense Demo Video](https://img.youtube.com/vi/XZwN0viF-9k/maxresdefault.jpg)](https://youtu.be/XZwN0viF-9k)

🎬 **[Watch the Demo Video on YouTube](https://youtu.be/XZwN0viF-9k)**  
🌐 **[Live GitHub Pages Demo](https://fasihafatima06.github.io/stocksense-odoo/)**

---

StockSense is a modular, ledger-backed inventory management system for warehouse teams. It replaces manual paper registers, spreadsheets, and scattered tracking with a centralized, real-time web application. Built with a vanilla JavaScript/Vite frontend, Express REST API, PostgreSQL, and Firebase Authentication.

## Key Features

- **Live Inventory Dashboard:** Real-time KPI metrics (Total Products, Low Stock alerts, Pending Receipts, Deliveries, Internal Transfers) and category distribution charts.
- **Products & Stock Visibility:** SKU tracking, multi-location on-hand, reserved, and available quantities, plus safety reorder rules.
- **Double-Entry Operations:**
  - **Inbound Receipts (`WH/IN`):** Supplier shipment receiving and verification.
  - **Delivery Orders (`WH/OUT`):** Order picking, packing, and dispatch.
  - **Internal Transfers (`WH/INT`):** Inter-warehouse and rack-to-rack stock balancing.
- **Stock Adjustments & Audit Trail:** Physical inventory count reconciliation with mandatory reason codes, backed by an immutable, append-only **Stock Ledger**.
- **Multi-Warehouse & Locations:** Multi-site support with hierarchy (Warehouses → Locations/Racks/Bays).
- **Role-Based Access Control (RBAC):** Admin, Inventory Manager, and Warehouse Staff roles with OTP-based password recovery.

## Demo Credentials

For quick evaluation without database configuration:
- **URL:** [https://fasihafatima06.github.io/stocksense-odoo/](https://fasihafatima06.github.io/stocksense-odoo/) (or `http://localhost:5174`)
- **Email:** `manager@stocksense.dev`
- **Password:** `password123` *(any 8+ characters)*

## Local Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` (PostgreSQL / Neon).
2. Install dependencies:
   ```bash
   npm install
   npm run migrate
   npm run seed
   npm run dev
   ```
   The client runs at `http://localhost:5173` (or `5174`), API at `http://localhost:4000`.
3. Run core inventory tests:
   ```bash
   npm test
   ```

## Architecture & Data Integrity

- **Append-only Stock Ledger:** Every validated movement inserts a permanent `stock_ledger` record in the same PostgreSQL transaction.
- **Concurrency Protection:** Balances are locked using `SELECT ... FOR UPDATE` to prevent race conditions during concurrent stock reservations.
- **Modular Design:** Clear separation of concerns between catalog, operations, and audit services.
