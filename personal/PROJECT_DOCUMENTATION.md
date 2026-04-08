# 📖 DermaGlow Clinic — Complete Project Documentation
**Version**: 1.1
**Last Updated**: April 7, 2026

---

## 1. Project Overview & Vision
**DermaGlow** is a premium, high-performance web application tailored for modern dermatology and aesthetic clinics. It serves a dual purpose:
1. **Public-Facing Medical Website**: Serving static, highly optimized marketing content (services, gallery, testimonials) to prospective patients to drive conversions.
2. **Secure Internal Portal**: A HIPAA-compliant-style secure enclave offering Role-Based Access Control (RBAC) for patients to manage bookings and for staff to manage clinical workflows.

The core engineering objective is bridging the gap between **Edge-delivered static speeds** for marketing and **strictly protected dynamic routes** for personal medical data.

---

## 2. Technology Stack

### Core Frameworks
- **Framework**: Next.js 15 (App Router paradigm)
- **Language**: TypeScript (Strict typing for robust state management)
- **UI & Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Backend & Database**: Supabase (PostgreSQL, Auth, Edge Functions)

### Architecture Patterns
- **React Server Components (RSC)**: Default architecture for reduced client payload.
- **Server Actions**: Form submissions and data mutations (`"use server"`).
- **Next.js Data Cache**: Aggressive static caching with selective tag-based invalidation (`unstable_cache`, `revalidateTag`).

---

## 3. Core Capabilities & Workflows

### 👱‍♀️ Patient Experience
1. **Discovery**: Patients browse `getCachedServices` and `getCachedGalleryPhotos` securely synced from the database but served statically from the CDN edge.
2. **Booking Workflow**: Patients select treatments -> Create account / Login -> Submit requested date/time -> Status set to `pending`.
3. **Portal Access**: Secure dashboard (`/portal`) where patients view past/upcoming appointments and exchange secure text messages with the clinic.

### 👩‍⚕️ Staff & Admin Experience
1. **Dashboard Overview**: Immediate glimpse into pending appointments (Requires `admin` or `receptionist` role).
2. **Asset Management**: Full CRUD interface to update Services, upload Before/After Gallery Photos, and moderate Testimonials.
3. **Surgical Invalidation**: Modifying a service automatically invokes `revalidateTag('services')`, instantly updating the public website globally without requiring a full redeploy.
4. **Patient Communications**: Read, mark as read, and reply to client inquiries in a secure inbox.
5. **Role Provisioning**: High-privilege Admins can provision new staff accounts (Doctors, Receptionists) using a secure Server Role Key bypass.

---

## 4. Role-Based Access Control (RBAC)
DermaGlow uses a custom PostgreSQL ENUM (`user_role`) synced to the `profiles` table to dictate application state and database access.

| Role | Access Level | Description |
| :--- | :--- | :--- |
| **`patient`** | Default | Confined to `/portal`. Can only see and manipulate their own records (appointments, messages, profile). |
| **`receptionist`**| Operational | Access to `/admin`. Can approve/cancel appointments and read/reply to all patient messages. |
| **`doctor`** | Medical | Access to `/admin`. Similar to receptionist but positioned for future telehealth/medical history integrations. |
| **`admin`** | System | Full Access. Can modify the public website (assets) and access the Staff Provisioning dashboard. |

---

## 5. Security & Authentication Model

### Middleware Implementation
The application uses a robust Next.js middleware (`src/lib/supabase/middleware.ts`) to intercept every request. It serves two functions:
1. **Token Refresh**: Passively refreshes expired Supabase JWTs.
2. **Route Protection**: Validates the session. Unauthenticated users hitting `/portal` or `/admin` are immediately redirected to `/login`.

### Row-Level Security (RLS)
The Postgres database is hardened with strict RLS policies. 
- *Public Tables* (Services, Published Gallery) allow `SELECT` for everyone.
- *Private Tables* (Appointments, Messages) use policies like `(select auth.uid()) = patient_id` to ensure users can theoretically never fetch another user's data, even if the frontend routing failed.

### Form Hardening
Public ingest points (like the `/contact` form) utilize:
1. **Honeypots**: Hidden fields that catch automated form-fillers.
2. **Timestamp Checks**: Measuring completion speed to block sub-3-second bot submissions.

---

## 6. Premium Caching Strategy (The "Hybrid" Model)
The defining technical achievement of the platform is handling Supabase's cookie-based auth without destroying Next.js static rendering.

### The Problem Solved
Historically, calling `createClient()` (which reads cookies) anywhere in a Next.js layout forces the entire routing tree into dynamic, server-rendered mode down to the root.

### The DermaGlow Solution
1. **Public vs. Private Clients**: 
   - `createClient()`: Reads cookies. Used *only* in Server Actions and the `/admin` or `/portal` folders.
   - `createPublicClient()`: Ignores cookies. Used inside the `/lib/data.ts` fetching layer for public assets.
2. **`unstable_cache`**: 
   - Public pages (`/services`, `/gallery`) await data from functions wrapped in `unstable_cache(..., ['tags'])`. 
   - This allows Next.js to statically compile the entire public site at build time while still polling Supabase.
3. **Decoupled Auth Navbar**: 
   - The Root Layout has **no** session fetching. 
   - The `<Navbar>` is a Client Component that uses `onAuthStateChange` to actively listen for login events. This allows the layout to remain static while the UI adapts to the user context.

---

## 7. System Architecture Map (Directory Structure)

```text
/src
 ├── /app
 │    ├── /(auth)               # Login & Registration flows
 │    ├── /admin                # Staff Dashboard (Force Dynamic)
 │    │    ├── /assets          # Manage Services & Gallery
 │    │    ├── /messages        # Secure Inbox
 │    │    ├── /patients        # Patient Directory
 │    │    └── /staff           # RBAC User Provisioning
 │    ├── /portal               # Patient Dashboard (Force Dynamic)
 │    ├── /book                 # Appointment Booking Engine
 │    ├── /contact              # Public Contact Form
 │    ├── /gallery              # Static Before/After Showcase
 │    ├── /services             # Static Treatment Catalog
 │    ├── globals.css           # Tailwind configurations
 │    └── layout.tsx            # Global UI Root
 │
 ├── /components
 │    └── /layout               # Structural components (Navbar, Footers)
 │
 ├── /lib
 │    ├── data.ts               # Centralized Caching & Fetching Layer
 │    └── /supabase
 │         ├── middleware.ts    # Edge Route Protection & Token Refresh
 │         └── server.ts        # Client Generators (Auth & Public)
 │
/personal
 ├── AUDIT_FINAL_SUMMARY.md     # Engineering Logs
 ├── ROADMAP.md                 # Future Feature Pipeline
 └── PROJECT_DOCUMENTATION.md   # Current File
```

---

## 8. Database Schema Snapshot
*Hosted entirely on Supabase Postgres.*

1. **`profiles`**: Linked directly to Supabase Auth (`auth.users`). Holds phone numbers, names, and the critical `role` enum.
2. **`services`**: The catalog. Includes pricing, duration, and `is_active` flags.
3. **`appointments`**: The core transactional nexus. Links a `patient_id` (profile) to a `service_id` and tracks `status` (pending/confirmed/cancelled).
4. **`gallery_photos`**: Before/After image URLs linked via foreign key to a specific `service_id`.
5. **`messages`**: Bi-directional secure communication (Sender ID ↔ Recipient ID).
6. **`testimonials`**: 1-5 star patient reviews.

*(Note: All tables possess foreign key indexes to prevent slow sequential scans during reporting queries).*

---

## 9. Deployment Specs
- **Hosting**: Recommended for deployment on **Vercel**.
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`: DB Connection string.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Safe public key for browser.
  - `SUPABASE_SERVICE_ROLE_KEY`: **CRITICAL**. Only needed locally/in-Vercel to allow Admins to bypass Auth triggers to create new staff accounts. Never expose to client.

---
*End of Documentation*
