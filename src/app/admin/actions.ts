'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'

async function checkRole(allowedRoles: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!allowedRoles.includes(profile?.role)) return null
  return supabase
}

export async function updateAppointmentStatus(appointmentId: string, status: 'confirmed' | 'completed' | 'cancelled' | 'no_show') {
  const supabase = await checkRole(['admin', 'doctor', 'receptionist'])
  if (!supabase) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', appointmentId)

  if (error) return { error: 'Failed to update status' }
  revalidatePath('/admin')
  revalidateTag('appointments')
}

export async function createPresignedUploadUrl(fileName: string, contentType: string) {
  const supabase = await checkRole(['admin'])
  if (!supabase) return { error: 'Unauthorized' }

  // Normally we would generate a signed upload URL or just upload directly from client 
  // if RLS allows it (which it does via Auth check). So we don't strictly *need* server-side.
  // We'll handle direct client-side upload in the UI to demonstrate Supabase Storage capabilities.
  return { success: true }
}
