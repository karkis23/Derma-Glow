'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function createAppointment(formData: FormData) {
  const supabase = await createClient()

  // Ensure user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login?message=Please log in to book an appointment')
  }

  const serviceId = formData.get('service_id') as string
  const dateStr = formData.get('date') as string
  const timeStr = formData.get('time') as string
  const appointmentType = formData.get('type') as 'in_person' | 'teleconsultation'
  const notes = formData.get('notes') as string

  if (!serviceId || !dateStr || !timeStr || !appointmentType) {
    return { error: 'Please fill in all required fields' }
  }

  const { error } = await supabase.from('appointments').insert({
    patient_id: user.id,
    service_id: serviceId,
    appointment_date: dateStr,
    appointment_time: timeStr,
    type: appointmentType,
    status: 'pending',
    notes,
  })

  if (error) {
    console.error('Server error creating appointment:', error)
    return { error: 'Failed to create appointment. Please try again or call us.' }
  }

  revalidatePath('/portal')
  revalidateTag('appointments')
  redirect('/portal?message=Appointment booked successfully')
}
