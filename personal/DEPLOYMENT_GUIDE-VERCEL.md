# 🚀 Vercel Deployment Guide — DermaGlow Clinic
**Platform**: Next.js 15 (App Router) + Supabase
**Target Environment**: Vercel

This guide outlines the exact, step-by-step process required to deploy the DermaGlow Clinic platform to production without breaking the cache, styling, or database connections.

---

## Step 1: Pre-Deployment Checks (Local)
Before pushing your final commit to GitHub, run these checks locally to ensure a smooth Vercel build.

1. **Verify the Build**:
   Open your terminal in the project directory and run:
   ```bash
   npm run build
   ```
   *Note: If this fails locally with a TypeScript or ESLint error, it will fail on Vercel. Fix any red errors before proceeding.*

2. **Verify your Branch**:
   Ensure all changes are pushed to your main branch on GitHub:
   ```bash
   git add .
   git commit -m "Prepare for production"
   git push origin main
   ```

---

## Step 2: Supabase Production Prep
You need to ensure Supabase allows Vercel to handle authentications.

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication -> URL Configuration**.
3. Under **Site URL**, change `http://localhost:3000` to your actual domains (e.g., `https://dermaglow.vercel.app` or your custom domain).
4. Under **Redirect URLs**, add the following (replace with your actual domain later):
   - `https://dermaglow.vercel.app/**`
5. Navigate to **Project Settings -> API** and keep this tab open; you will need these keys for Vercel.

---

## Step 3: Vercel Setup

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New -> Project**.
3. Import your `Derma-Glow` repository from GitHub.
4. On the **Configure Project** screen:
   - **Framework Preset**: Vercel should auto-detect **Next.js**.
   - **Root Directory**: Leave as `./` (unless you have a monorepo).

### 🔑 CRITICAL: Environment Variables
Open the "Environment Variables" dropdown. You MUST add the exact strings from your local `.env.local` file. Copy them individually from Supabase:

| Name | Value | Where to find it |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxx.supabase.co` | Supabase -> Settings -> API -> Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJh...` | Supabase -> Settings -> API -> Project API Keys (anon, public) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJh...` | *(Only if you plan to use the Admin Staff creation tool directly via Vercel)* Supabase -> Settings -> API -> service_role secret. **NEVER expose this to the client.** |

5. Click **Deploy**. Vercel will now install dependencies, run the React Server Components cache generation, and put the site live.

---

## Step 4: Post-Deployment Verification

Once Vercel gives you the green "Success" screen and your deployment URL:

1. **Test the Edge Cache**: Go to `https://your-app-url.vercel.app/services`. Click around. The pages should load nearly instantly.
2. **Test Auth Routing**: Try navigating to `https://your-app-url.vercel.app/admin`. It should instantly redirect you to `/login`.
3. **Test Database Write**: Go to the Contact page. Submit the form. Then check your Supabase `contact_submissions` table to ensure the row appeared.

---

## 🛠️ Troubleshooting Common Vercel Errors

### 1. Build fails with `TypeScript error` or `eslint error`
- Vercel is extremely strict. If you have unused variables or missing types, it kills the build.
- **Fix**: Check your Vercel Build Logs. It will tell you the exact file and line number. Fix it locally, commit, and push. Vercel will auto-rebuild.

### 2. "500 Internal Server Error" on the Homepage/Gallery
- **Cause**: Vercel couldn't connect to Supabase during the static generation phase.
- **Fix**: Double-check that your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables are typed perfectly in Vercel.

### 3. Users get logged out when refreshing
- **Cause**: Vercel sometimes drops cookie parsing if the Route Handlers aren't configured perfectly.
- **Fix**: We fixed this in the audit by placing the session update logic directly inside the Next.js `middleware.ts`. Ensure your Vercel logs aren't throwing errors inside `/src/lib/supabase/middleware.ts`.

### 4. Admin Dashboard buttons don't update the UI
- **Cause**: Vercel caches Server Actions.
- **Fix**: We fixed this entirely by adding `revalidateTag()` to the mutation actions.

---

## Step 5: Connecting a Custom Domain (Optional)
1. In Vercel, go to your Project -> **Settings** -> **Domains**.
2. Type in your domain (e.g., `dermaglowclinic.com`) and click **Add**.
3. Vercel will give you Nameservers or an A/CNAME record. Go to your domain registrar (GoDaddy, Namecheap, Route53) and paste those records into your DNS settings.
4. **Important**: Go back to Supabase -> Authentication -> URL Configuration, and add `https://dermaglowclinic.com/**` so auth redirects properly!
