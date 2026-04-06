# 🗄️ Supabase Reference — DermaGlow Database
**Date**: April 7, 2026

## 📊 Core Tables Summary

| Table | Column (Partial) | RLS Strategy |
|:------|:-----------------|:-------------|
| `profiles` | `id, full_name, role` | Users can view own, Admins can view all. |
| `services` | `id, name, price, is_active` | Publicly readable, Admins manage. |
| `appointments` | `id, patient_id, status` | Patients manage own, Staff manage all. |
| `messages` | `id, sender_id, content` | Senders/Recipients only. |
| `gallery_photos` | `id, before_url, after_url`| Publicly readable if `is_published`. |
| `blog_posts` | `id, title, content` | Publicly readable if `is_published`. |
| `contact` | `id, email, message` | Publicly insertable (spam protected in app layer). |
| `testimonials` | `id, content, rating` | Publicly readable if `is_published`. |

## 🔐 Auth & Roles
We use a custom `user_role` Postgres enum for RBAC:
- `'patient'` (Default): Limited to portal.
- `'receptionist'`: Can manage appointments/messages.
- `'doctor'`: Access to medical stats/scheduling.
- `'admin'`: Full system control (Staff management).

## 🚀 Performance
Applied 7 foreign key indexes for: `patient_id`, `doctor_id`, `service_id` (appointments/gallery/messages).

## 💡 Important RLS Warning
All RLS policies currently use `auth.uid()`. For high-scale performance, it is recommended to wrap these in a subselect: `(select auth.uid())` to prevent per-row re-evaluation.

---
*Reference for quick database context.*
