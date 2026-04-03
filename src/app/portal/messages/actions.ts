'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { error: 'Not authenticated' }

  const content = formData.get('content') as string
  if (!content || content.trim() === '') return { error: 'Message cannot be empty' }

  // Send to the default clinic admin/reception (For now, we'll assign it to a placeholder UUID or null if allowed)
  // Usually, you'd look up the admin or assigned doctor.
  // We'll query an admin user from profiles to send it to.
  const { data: adminUser } = await supabase
    .from('profiles')
    .select('id')
    .in('role', ['admin', 'doctor'])
    .limit(1)
    .single()

  const { error } = await supabase.from('messages').insert({
    sender_id: user.id,
    recipient_id: adminUser?.id || user.id, // Fallback if no admin exists yet
    content: content,
    is_read: false
  })

  if (error) {
    console.error('Error sending message:', error)
    return { error: 'Failed to send message' }
  }

  revalidatePath('/portal/messages')
}
