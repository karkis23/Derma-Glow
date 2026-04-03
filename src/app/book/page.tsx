export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import BookingClientForm from './BookingClientForm'
import { redirect } from 'next/navigation'

export default async function BookPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?message=Create an account or login to book an appointment')
  }

  // Fetch all active services for the dropdown
  const { data: services } = await supabase
    .from('services')
    .select('id, name, duration_minutes, price')
    .eq('is_active', true)
    .order('name')

  // Phase 2: Fetch existing occupied slots to prevent double-booking
  const today = new Date().toISOString().split('T')[0]
  const { data: existingAppts } = await supabase
    .from('appointments')
    .select('appointment_date, appointment_time')
    .in('status', ['pending', 'confirmed'])
    .gte('appointment_date', today)

  const bookedSlots = existingAppts?.map(a => ({
    date: a.appointment_date,
    time: a.appointment_time,
  })) || []

  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Book a Consultation</h1>
          <p className="text-gray-600 text-lg">
            Choose your desired treatment, select a date and time, and we'll confirm your visit.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-xl border border-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-rose-gold-light/20 rounded-full blur-3xl opacity-50 -z-10 -translate-y-1/2 translate-x-1/4"></div>
             
             {/* The interactive booking form is pushed to a client component to handle state */}
             <BookingClientForm services={services || []} bookedSlots={bookedSlots} />
        </div>
      </div>
    </div>
  )
}
