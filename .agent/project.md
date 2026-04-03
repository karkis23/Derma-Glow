---
description: DermaGlow Clinic Architecure & Overview
---

# DermaGlow Clinic Web Application

## Core Objective
DermaGlow is a premium aesthetic dermatology clinic and medical spa web application. It handles modern visual marketing (gallery/services) and provides a secure, role-based backend for staff to manage appointments, patients, and assets.

## Technology Stack
- **Framework**: Next.js 14/15 (App Router)
- **Styling**: Vanilla CSS (`index.css`) featuring custom Glassmorphism, Tailwind colors manually defined, and standard media queries. Do not use standard Tailwind configurations.
- **Database**: Supabase PostgreSQL.
- **Authentication**: Supabase SSR Auth (Server-side rendering flow).

## Key Domains

### Frontend (Client-Facing)
- `/`: Hero landing page with dynamic UI and luxury aesthetics.
- `/services`: Menu of dermatology services, generated dynamically from the Supabase `services` table.
- `/gallery`: Real-world before/after interactive comparisons fetching from `gallery_photos`.
- `/contact`: Static contact forms.
- `/book`: Fully interactive robust client booking form. Authenticated via SSR before rendering.

### Administrative Backend (`/admin`)
- Accessible strictly via authenticated sessions mapped to the `profiles` table.
- **Roles**:
  - `admin`: Full unrestricted system access.
  - `doctor`: Able to read/reply to sensitive patient messages and manage calendar, but explicitly denied from `/admin/assets`.
  - `receptionist`: Can view `patients` and exclusively approve/decline `appointments`. Excluded from Messages and Asset uploads.

## Database Core Definitions
1. **profiles**: Connects to `auth.users`. Contains the `role` enum (`admin`, `doctor`, `receptionist`, `patient`).
2. **appointments**: Used heavily by scheduling. Joined to `profiles` using foreign key paths (e.g. `patient:profiles!patient_id(first_name, last_name, phone)`).
3. **services**: Holds all treatments with local static image mappings (`/images/services/...`).
4. **gallery_photos**: Holds specific patient visual results matching a `service_id`.
5. **messages**: Secure patient messaging system.

## Important Engineering Quicks
1. **Caching**: Next.js aggressively caches pages like `/admin` and `/book`. Always inject `export const dynamic = 'force-dynamic'` at the top of these sensitive routes to trigger active authentication evaluations.
2. **Supabase Foreign Key Ambiguity**: The `appointments` table has two links to `profiles` (for patient and staff). Always uniquely identify join paths like `.select('*, patient:profiles!patient_id(*)')` to prevent PostgREST errors.
