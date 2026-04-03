'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    redirect('/contact?error=Missing required fields')
  }

  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    phone,
    subject,
    message,
    is_read: false
  })

  if (error) {
    redirect('/contact?error=Failed to submit your message. Please try again later.')
  }

  redirect('/contact?success=Your message has been sent successfully!')
}
