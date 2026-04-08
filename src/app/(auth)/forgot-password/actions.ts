'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email) {
    redirect('/forgot-password?message=Please enter your email address')
  }

  // Build the redirect URL using the Vercel deployment URL or localhost
  // VERCEL_URL is auto-set by Vercel, or use NEXT_PUBLIC_SITE_URL for custom domains
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  })

  if (error) {
    const msg = error.message.toLowerCase()
    // Supabase rate-limits repeat email requests — the email was already sent.
    if (msg.includes('security purposes') || msg.includes('rate limit')) {
      redirect('/forgot-password?success=A reset link was already sent. Please check your inbox (and spam folder).')
    }
    redirect(`/forgot-password?message=${encodeURIComponent(error.message)}`)
  }

  redirect('/forgot-password?success=Check your email for a password reset link')
}
