'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient()

  // Honeypot: bots will fill this invisible field
  const honeypot = formData.get('website') as string
  if (honeypot) {
    // Silently reject — looks like success to the bot
    redirect('/contact?success=Your message has been sent successfully!')
  }

  // Timestamp validation: form must take at least 3 seconds to fill
  const formTimestamp = formData.get('_timestamp') as string
  if (formTimestamp) {
    const elapsed = Date.now() - parseInt(formTimestamp, 10)
    if (elapsed < 3000) {
      // Submitted too fast — likely a bot
      redirect('/contact?success=Your message has been sent successfully!')
    }
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    redirect('/contact?error=Missing required fields')
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    redirect('/contact?error=Please enter a valid email address')
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
