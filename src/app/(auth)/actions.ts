'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/portal')
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const data = {
    email,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('fullName') as string,
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    const msg = error.message.toLowerCase()
    // Supabase rate-limits repeat signup/email requests — show the check-email screen.
    if (msg.includes('security purposes') || msg.includes('rate limit')) {
      redirect(`/register?success=${encodeURIComponent('A verification email was already sent. Please check your inbox (and spam folder) to verify your account.')}`)
    }
    redirect(`/register?message=${encodeURIComponent(error.message)}`)
  }

  redirect(`/register?success=${encodeURIComponent('Account created! Please check your email to verify your account before signing in.')}`)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
