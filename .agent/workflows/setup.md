---
description: How to setup and deploy DermaGlow successfully.
---

# DermaGlow Workflow Guide

### Step 1: Environment Bootstrapping
Before spinning up the app locally, ensure `.env.local` exists in the root mapping our primary Supabase logic.

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
```

### Step 2: Running Locally
// turbo
```bash
npm run dev
```

### Step 3: Verifying Auth Sessions
If routes begin throwing 404s or 401 Unauthorized arbitrarily, utilize the "Portal" action inside the header to visually confirm session integrity.

### Step 4: Asset Additions
Whenever adding new static image mockups, do not rely on Unsplash API parameters as they regularly break or throttle limits. Generate directly leveraging AI Models, rename strictly using `snake_case.png` formatting, and securely lodge them in `public/images/...`.
