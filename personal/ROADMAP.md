# 🛣️ DermaGlow Clinic — Strategic Roadmap
**Date**: April 7, 2026

## 🎯 Phase 1: Communication Backbone (Priority: High)
*Objective: Automate patient engagement.*

- [ ] **Transactional Email Integration**: Set up **Resend** or **Nodemailer**.
- [ ] **Booking Confirmation**: Send immediate email when a patient books.
- [ ] **Status Alerts**: Notify patient when appointment is "Confirmed" or "Cancelled".
- [ ] **Password Reset**: Implement the "Forgot Password" UI and Supabase `resetPassword`-based server action.

## 💳 Phase 2: Revenue & Deposits (Priority: High)
*Objective: Reduce no-shows through financial commitment.*

- [ ] **Stripe / Razorpay Integration**: Add a payment step to the `/book` flow.
- [ ] **Deposit System**: Require a ₹500 - ₹2,000 non-refundable hold for new patients.
- [ ] **Payment Status**: Update `appointments` table to include `payment_id` and `is_paid`.

## 📑 Phase 3: SEO & Content (Priority: Medium)
*Objective: Drive organic traffic to the clinic.*

- [ ] **Public Blog**: Create `/blog` and `/blog/[slug]` routes. 
- [ ] **Blog Data Layer**: Use `getCachedBlogPosts()` to display the 3 current posts in the DB.
- [ ] **Rich Snippets**: Add `JSON-LD` schema for dermatology services to rank better in Google.

## 🏥 Phase 4: Clinic Growth (Priority: Future)
*Objective: Expand medical service delivery.*

- [ ] **Telehealth Hub**: Integrate **Daily.co** or **Twilio Video** for `teleconsultation` calls.
- [ ] **Patient Records**: Add a "Medical History" or "Skin Profile" section in the portal.
- [ ] **Admin Analytics**: Build charts (Revenue, Most Booked Service, Patient Demographics).

---
*Roadmap curated for clinic growth and production-readiness.*
