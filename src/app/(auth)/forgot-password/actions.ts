'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email) {
    redirect('/forgot-password?message=Please enter your email address')
  }

  // Get the origin from the request headers so it works in both local dev and production
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3000'

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  })

  if (error) {
    redirect(`/forgot-password?message=${encodeURIComponent(error.message)}`)
  }

  redirect('/forgot-password?success=Check your email for a password reset link')
}
