import { createClient } from '@/lib/supabase/server'
import { Calendar, Clock, MapPin, Search } from 'lucide-react'
import { format } from 'date-fns'

export default async function AppointmentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch all appointments for the user
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, services(name, duration_minutes, price)')
    .eq('patient_id', user?.id)
    .order('appointment_date', { ascending: false })
    .order('appointment_time', { ascending: false })

  const upcoming = appointments?.filter(a => new Date(a.appointment_date) >= new Date()) || []
  const past = appointments?.filter(a => new Date(a.appointment_date) < new Date()) || []

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-serif text-charcoal mb-8">My Appointments</h1>

      {/* Upcoming Section */}
      <h2 className="text-xl font-serif text-teal mb-4 flex items-center gap-2">
        <Calendar size={20} /> Upcoming Visits
      </h2>
      <div className="glass rounded-3xl p-6 mb-12 shadow-sm">
        {upcoming.length === 0 ? (
          <p className="text-gray-500 py-4">You have no upcoming appointments.</p>
        ) : (
          <div className="space-y-4">
            {upcoming.map((apt: any) => (
               <div key={apt.id} className="bg-white/60 p-5 rounded-2xl border border-white flex flex-col md:flex-row justify-between md:items-center gap-6">
                 <div className="flex items-start gap-4">
                   <div className="bg-teal/10 text-teal p-3 rounded-xl shrink-0 text-center min-w-[80px]">
                     <p className="text-sm uppercase font-bold">{format(new Date(apt.appointment_date), 'EEE')}</p>
                     <p className="font-bold text-2xl">{format(new Date(apt.appointment_date), 'd')}</p>
                     <p className="text-xs uppercase font-medium">{format(new Date(apt.appointment_date), 'MMM, yyyy')}</p>
                   </div>
                   <div>
                     <h3 className="font-medium text-lg text-charcoal">{apt.services?.name || 'General Consultation'}</h3>
                     <div className="flex flex-col gap-1 text-sm text-gray-500 mt-2">
                       <span className="flex items-center gap-2"><Clock size={16} className="text-rose-gold" /> {apt.appointment_time.slice(0, 5)} ({apt.services?.duration_minutes} mins)</span>
                       <span className="flex items-center gap-2"><MapPin size={16} className="text-rose-gold" /> {apt.type === 'teleconsultation' ? 'Telehealth Video Call' : 'DermaGlow Ny Office'}</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex flex-col md:items-end gap-3 border-t md:border-t-0 md:border-l border-charcoal/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                   <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-center ${
                     apt.status === 'confirmed' ? 'bg-green-100 text-green-700 border border-green-200' :
                     apt.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-700'
                   }`}>
                     {apt.status === 'pending' ? 'Waiting for Approval' : apt.status}
                   </span>
                   {apt.type === 'teleconsultation' && apt.status === 'confirmed' && (
                     <button className="text-sm bg-teal text-white w-full px-4 py-2 rounded-lg font-medium hover:bg-teal-light">
                       Join Call
                     </button>
                   )}
                 </div>
               </div>
            ))}
          </div>
        )}
      </div>

      {/* Past History */}
      <h2 className="text-xl font-serif text-charcoal mb-4 flex items-center gap-2">
        <Clock size={20} /> Treatment History
      </h2>
      <div className="bg-white/40 rounded-3xl p-6 border border-white">
        {past.length === 0 ? (
          <p className="text-gray-500 py-4">No past treatments found.</p>
        ) : (
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-charcoal/10 text-charcoal text-sm">
                    <th className="pb-3 px-2">Date</th>
                    <th className="pb-3 px-2">Treatment</th>
                    <th className="pb-3 px-2 hidden sm:table-cell">Duration</th>
                    <th className="pb-3 px-2 hidden sm:table-cell">Cost</th>
                    <th className="pb-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {past.map((apt: any) => (
                    <tr key={apt.id} className="border-b border-charcoal/5 last:border-0 hover:bg-white/50 transition-colors">
                      <td className="py-4 px-2 text-charcoal font-medium whitespace-nowrap">
                        {format(new Date(apt.appointment_date), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-4 px-2 font-medium">
                        {apt.services?.name || 'Consultation'}
                      </td>
                      <td className="py-4 px-2 text-gray-500 hidden sm:table-cell">
                        {apt.services?.duration_minutes} min
                      </td>
                      <td className="py-4 px-2 text-gray-500 hidden sm:table-cell">
                        ${apt.services?.price}
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${
                          apt.status === 'completed' ? 'text-teal bg-teal/10' :
                          apt.status === 'no_show' ? 'text-red-600 bg-red-100' :
                          'text-gray-600 bg-gray-200'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        )}
      </div>
    </div>
  )
}
