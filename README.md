# Wisteria Trust — Global Authority in Premium Seller Verification

> **Institutional-Grade Digital Trust & Authentication Infrastructure**

Official Website: [https://wisteriatrust.com](https://wisteriatrust.com)

---

## 🏛️ Project Overview

**Wisteria Trust** is an independent verification platform designed for luxury merchants, sovereign enterprises, and institutional sellers. This repository is architected as a **Unified Monorepo** containing both the high-performance client-side verification interface and the robust Express API engine.

```
wisteria-trust/
├── assets/                  # Luxury Brand Assets, CSS styles & Client Scripts
│   ├── css/style.css        # Responsive Luxury Theme & Glassmorphic UI
│   ├── js/config.js         # Centralized Client-Side Configuration Engine
│   ├── js/main.js           # Search Lookup, Modals & Live Counter Engine
│   └── images/              # Official Branding & Logos
├── seller/                  # Seller Verification Certificate Hub
│   ├── index.html           # Public Registry File & Live SVG Badge Preview Box
│   ├── seller.css           # Institutional File Styling & Badge Embed Box
│   └── seller.js            # Real-time Verification Parser & HTML Snippet Generator
├── admin/                   # Institutional Administration Suite
│   ├── login.html           # Secure JWT Admin Portal
│   ├── dashboard.html       # Registry Management & Extend Expiry Modals
│   ├── create.html          # Seller Credential Onboarding Form
│   ├── admin.css            # Executive Dark UI & Toast System
│   ├── admin.js             # Client Administration Logic & Dynamic Toasts
│   └── admin-config.js      # Centralized Admin Endpoint Resolver
├── wisteria-backend/        # Express.js REST API & Verification Engine
│   ├── src/                 # Pure ESM Controllers, Models, Routes & Middlewares
│   ├── package.json         # Backend Dependencies
│   └── .env.example         # Environment Configuration Template
├── CNAME                    # Custom Domain Configuration (wisteriatrust.com)
├── 404.html                 # Luxury Branded Not Found Handler
├── index.html               # Public Registry Verification Portal
└── README.md                # System Architecture & Documentation
```

---

## 🚀 Live Dynamic SVG Trust Badges

Merchants embedded with Wisteria Trust can showcase real-time verification badges using our dynamic SVG engine. Badges update status instantaneously without merchants needing to replace static image files:

```html
<!-- Verified Merchant Badge -->
<a href="https://wisteriatrust.com/?id=WT-2026-0001" target="_blank" rel="noopener noreferrer">
  <img src="https://wisteria-backend.onrender.com/api/badge/WT-2026-0001.svg" 
       alt="Verified by Wisteria Trust" 
       width="260">
</a>
```

### Supported Dynamic Badge States:
* `ACTIVE` — Emerald Gold Verified Emblem (`#10B981`)
* `EXPIRED` — Amber Review Emblem (`#F59E0B`)
* `REVOKED` — Crimson Revocation Warning (`#EF4444`)
* `NOT_FOUND` — Slate Unregistered Notice (`#64748B`)

---

## 💻 Local Development Setup

### 1. Start the Backend API
```bash
cd wisteria-backend
npm install
npm run dev
```
*Backend runs on `http://localhost:5000` with MongoDB connection.*

### 2. Run the Frontend Interface
Open `index.html` in any browser or launch with VS Code Live Server. The built-in `assets/js/config.js` engine automatically detects `localhost` and routes all API calls to `http://localhost:5000`.

---

## ☁️ Production Deployment

### Frontend (GitHub Pages / Custom Domain)
1. Go to repository **Settings** ➡️ **Pages**.
2. Set **Source** to `Deploy from a branch` (Branch: `main`, Folder: `/ (root)`).
3. Custom domain is automatically linked via `CNAME` (`wisteriatrust.com`).

### Backend (Render / Web Service)
1. Create a new **Web Service** on Render connected to this repository.
2. Set **Root Directory** to `wisteria-backend`.
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `npm start`
5. Configure Environment Variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`).

---

## 🛡️ Security & Integrity Standard

* **Pure ECMAScript Modules (ESM):** Zero CommonJS collisions.
* **Rate Limiting:** Protects `/api` endpoints against DDoS & brute-force queries.
* **Concurrency-Safe ID Generation:** Unique sequential identification (`WT-YYYY-XXXX`).
* **Strict Validation:** Regex-checked email formats, sanitized API output, and future-date verification.
