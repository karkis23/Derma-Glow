# 🌟 DermaGlow Clinic Platform

![DermaGlow Luxury Aesthetic](public/images/hero_bg.png)

A fully integrated, cloud-native Web Application built for luxury dermatology clinics and high-end medical spas. DermaGlow bridges the gap between public-facing marketing aesthetics and hardened, role-based backend administrative capabilities.

---

## 📋 Table of Contents
1. [Project Architecture](#project-architecture)
2. [Tech Stack](#tech-stack)
3. [Core Capabilities](#core-capabilities)
4. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
5. [Database Schema Mapping](#database-schema-mapping)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)

---

## 🏗 Project Architecture
DermaGlow utilizes **Next.js 14/15 App Router** allowing us to strictly partition Server and Client code. All heavy database retrieval happens exclusively on the Server utilizing highly secure Server Components, ensuring no private Supabase API endpoints leak into the client network pane.
Interactive layouts like Booking Calendars and Admin Dashboards hydrate cleanly onto the browser strictly parsing down sterilized, typed JSON structures.

## 🚀 Tech Stack

* **Framework:** Next.js (App Router, Server Actions)
* **Design Aesthetic:** Vanilla CSS with custom dynamic UI tokens (Glassmorphism, Parallax)
* **Authentication:** Supabase Auth (SSR Cookie-based tracking)
* **Database:** Supabase PostgreSQL (Strict Row Level Security enabled)
* **Assets:** AI-Generated Stable Storage
* **Typography:** Premium Serif Fonts (Playfair/Georgia) mixed with clean Sans-Serif readability

---

## ✨ Core Capabilities

### 1. Patient Portal & Booking Engine
A seamless, visually intensive booking process capturing:
* Selected service & treatment type parameters.
* Intelligent scheduling blocking out already-reserved time slots dynamically.
* SSR validation checking if a user possesses an active security token prior to completing checkout.

### 2. Patient Result Gallery
Dynamic rendering of high-quality "Before" and "After" aesthetic transformations directly mapped from our relational database to their parent dermatological services, eliminating the need for rigid hard-coded values.

### 3. Comprehensive Admin Dashboard
An all-in-one portal (`/admin/*`) containing:
* **The Command Center:** A high-level overview of pending operations vs completed cases.
* **Patient Operations:** Calendar views approving or declining appointment requests dynamically hitting our database via `actions.ts`.
* **Medical Messaging / Inbox:** Two-way portal handling private messages.
* **Asset Manager:** Upload interfaces allowing direct system injection of new services or visual proofs.

---

## 🔒 Role-Based Access Control (RBAC)

DermaGlow implements an extraordinarily structured access tier heavily tied to our backend `profiles.role` configuration logic.

| Role Parameter | Permissions | Hidden Modules |
| :--- | :--- | :--- |
| `admin` | Total unrestricted access to manage infrastructure, schedules, messaging, and system assets. | None |
| `doctor` | Elevated clearance. Strictly reads & replies to pending patient medical messages and processes appointments. | `Asset Management` |
| `receptionist`| Front-Desk scheduler. Manages patient directory and solely exists to approve/recline calendar bookings. | `Messages`, `Asset Management` |

All unauthorized access kicks the user completely out of the zone back to `/login` utilizing Next.js `redirect`.

---

## 🗄 Database Schema Mapping
All backend logistics resolve through our tightly coupled PostgreSQL layers:
* `profiles` (Auth handler, `first_name`, `last_name`, `phone`, `role`)
* `appointments` (Patient linker to Profile UID, date, time string, enum `status`)
* `services` (Contains aesthetic mappings, durations, pricing arrays)
* `gallery_photos` (Bridges Foreign Key mapping dynamically rendering before/after visuals connecting to a service).
* `messages` (Encrypted pipeline for Patient/Clinic consultation logic).

---

## ⚙️ Getting Started

To spin up DermaGlow on your local environment:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/karkis23/Derma-Glow.git
   cd dermaglow
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```
4. Access the platform at `http://localhost:3000`.

---

## 🔐 Environment Variables

The `/admin` infrastructure fundamentally requires connection keys. In your root directory, create an `.env.local` file containing:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_KEY_HERE
```
Never commit your `.env.local` to a remote repository.

---
*Built with precision for premium dermatology management.*
