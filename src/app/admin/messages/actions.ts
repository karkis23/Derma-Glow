'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function replyToMessage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const content = formData.get('content') as string
  const recipientId = formData.get('recipient_id') as string

  if (!content || content.trim() === '') return { error: 'Reply cannot be empty' }
  if (!recipientId) return { error: 'No recipient specified' }

  const { error } = await supabase.from('messages').insert({
    sender_id: user.id,
    recipient_id: recipientId,
    content: content.trim(),
    is_read: false,
  })

  if (error) {
    console.error('Error sending reply:', error)
    return { error: 'Failed to send reply' }
  }

  revalidatePath('/admin/messages')
  revalidatePath('/portal/messages')
  return { success: true }
}

export async function markMessageRead(messageId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', messageId)

  if (error) {
    console.error('Error marking message read:', error)
    return { error: 'Failed to mark message read' }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}
