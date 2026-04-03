export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { updateAppointmentStatus } from './actions'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch pending and confirmed appointments
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:profiles!patient_id(full_name, phone),
      services:service_id(name)
    `)
    .in('status', ['pending', 'confirmed'])
    .order('appointment_date', { ascending: true })

  if (error) {
    console.error("Fetch Error:", error.message, error.hint, error.details)
    throw new Error(error.message)
  }

  const pendingCount = appointments?.filter(a => a.status === 'pending').length || 0

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-serif text-charcoal mb-2">Clinic Dashboard</h1>
      <p className="text-gray-500 mb-8">Manage incoming appointments and requests.</p>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium mb-4 flex items-center justify-between">
            Pending Approvals
            <span className="bg-rose-gold text-white text-sm px-3 py-1 rounded-full">{pendingCount}</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="pb-3 px-4 font-medium">Patient</th>
                  <th className="pb-3 px-4 font-medium">Date & Time</th>
                  <th className="pb-3 px-4 font-medium">Service</th>
                  <th className="pb-3 px-4 font-medium">Type</th>
                  <th className="pb-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments?.length === 0 && (
                   <tr><td colSpan={5} className="py-8 text-center text-gray-400">No active appointments found.</td></tr>
                )}
                {appointments?.map(apt => (
                  <tr key={apt.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-charcoal">{apt.patient?.full_name}</p>
                      <p className="text-xs text-gray-500">{apt.patient?.phone || 'No phone'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-charcoal">{format(new Date(apt.appointment_date), 'MMM dd, yyyy')}</p>
                      <p className="text-sm text-gray-500">{apt.appointment_time.slice(0, 5)}</p>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {apt.services?.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        apt.type === 'teleconsultation' ? 'bg-purple-100 text-purple-700' : 'bg-teal/10 text-teal'
                      }`}>
                        {apt.type === 'teleconsultation' ? 'Video' : 'In-Clinic'}
                      </span>
                      {apt.status === 'confirmed' && (
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">Confirmed</span>
                      )}
                    </td>
                    <td className="py-4 px-4 flex gap-2">
                       {apt.status === 'pending' && (
                         <form action={async () => {
                           'use server'
                           await updateAppointmentStatus(apt.id, 'confirmed')
                         }}>
                           <button className="bg-teal text-white px-3 py-1.5 rounded text-sm hover:bg-teal-light transition-colors">
                             Approve
                           </button>
                         </form>
                       )}
                       {apt.status === 'confirmed' && (
                         <form action={async () => {
                           'use server'
                           await updateAppointmentStatus(apt.id, 'completed')
                         }}>
                           <button className="bg-charcoal text-white px-3 py-1.5 rounded text-sm hover:bg-black transition-colors">
                             Complete
                           </button>
                         </form>
                       )}
                       <form action={async () => {
                         'use server'
                         await updateAppointmentStatus(apt.id, 'cancelled')
                       }}>
                         <button className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                           Cancel
                         </button>
                       </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
