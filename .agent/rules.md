---
description: DermaGlow Explicit Prompting & Design Rules
---

# Development Rules

## UI / UX Aesthetic Standards
1. **Color Palette Constraints**: Stick strictly to DermaGlow branding variables.
   - Backgrounds: `bg-cream` (#FAF7F2).
   - Accents: `text-teal` (#184E52) and `text-rose-gold` (#C5A898).
   - Typography: `text-charcoal` (#2B2B2B).
2. **Component Behavior**: Use `.glass` utilities aggressively to maintain the high-end modern cosmetic feel. Avoid stark, high-contrast borders and thick drop-shadows. Keep transitions buttery smooth.
3. **Typography**: Headings must be `font-serif` to evoke luxury, body text must be clean sans-serif. 

## TypeScript & Linting
1. Avoid `any` logic in frontend maps (e.g., `data?.map((item: any) => ...)` unless absolutely crucial. Fallback gracefully securely utilizing TS models when handling Supabase types.
2. Hydration mismatches: Next.js 15 body tags can trigger errors against heavy chrome extensions. Use `suppressHydrationWarning` on root `html`/`body` tags.

## Component Handling
- All complex user interaction (Forms, Checkboxes, Carousel logic) must be isolated into `'use client'` files distinct from the main layout.
- The Layout itself should always strive to remain Server Components for maximum SEO/Speed.
- Any Server Actions (mutations) MUST inherently encapsulate `checkRole([])` boundaries preventing API abuse.
