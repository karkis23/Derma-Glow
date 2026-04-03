import { createClient } from '@/lib/supabase/server'
import { Calendar, Clock, MapPin, ChevronRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function PortalDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user?.id)
    .single()

  // Fetch upcoming appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, services(name, duration_minutes)')
    .eq('patient_id', user?.id)
    .gte('appointment_date', new Date().toISOString().split('T')[0])
    .order('appointment_date', { ascending: true })
    .order('appointment_time', { ascending: true })
    .limit(3)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-charcoal mb-2">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Patient'}
          </h1>
          <p className="text-gray-600">Here is an overview of your treatment plan and upcoming visits.</p>
        </div>
        <Link 
          href="/book" 
          className="hidden sm:flex bg-teal hover:bg-teal-light text-white px-6 py-3 rounded-xl shadow-md transition-colors font-medium items-center gap-2"
        >
          <Calendar size={18} />
          New Appointment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats/Actions */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-serif text-rose-gold mb-6 border-b border-charcoal/10 pb-4">Upcoming Appointments</h2>
            
            {!appointments || appointments.length === 0 ? (
              <div className="text-center py-8 bg-white/50 rounded-2xl border border-dashed border-charcoal/20">
                <Calendar className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-charcoal font-medium">No upcoming appointments</p>
                <p className="text-sm text-gray-500 mb-4">It looks like you don't have anything scheduled.</p>
                <Link href="/book" className="text-teal font-medium hover:underline">Book a consultation &rarr;</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt: any) => (
                  <div key={apt.id} className="bg-white/60 p-5 rounded-2xl border border-white flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-teal/10 text-teal p-3 rounded-xl shrink-0 text-center min-w-[70px]">
                        <p className="font-bold text-xl">{format(new Date(apt.appointment_date), 'd')}</p>
                        <p className="text-xs uppercase font-medium">{format(new Date(apt.appointment_date), 'MMM')}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-charcoal">{apt.services?.name || 'Consultation'}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><Clock size={14} /> {apt.appointment_time.slice(0, 5)}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {apt.type === 'teleconsultation' ? 'Online Video' : 'In-Clinic'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                           apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                           apt.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                         }`}>
                           {apt.status}
                         </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-charcoal text-white rounded-3xl p-6 shadow-md">
             <h3 className="font-serif text-xl text-rose-gold mb-4">Quick Actions</h3>
             <ul className="space-y-3">
               <li>
                 <Link href="/book" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors">
                   <span className="flex items-center gap-2"><Calendar size={18} className="text-teal" /> Book Visit</span>
                   <ChevronRight size={16} className="text-gray-400" />
                 </Link>
               </li>
               <li>
                 <Link href="/portal/messages" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors">
                   <span className="flex items-center gap-2">
                     <div className="relative">
                       <AlertCircle size={18} className="text-rose-gold" />
                       <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                     </div>
                     Messages
                   </span>
                   <ChevronRight size={16} className="text-gray-400" />
                 </Link>
               </li>
             </ul>
          </div>

          <div className="glass rounded-3xl p-6">
             <h3 className="font-serif text-lg text-charcoal mb-3">Clinic Contact</h3>
             <p className="text-sm text-gray-600 mb-2">If you need to cancel a within 24 hours, please call us directly.</p>
             <p className="text-teal font-medium flex items-center gap-2 mt-4 text-sm">
                <MapPin size={16} /> 123 Aesthetic Ave, NY
             </p>
             <a href="tel:555-123-4567" className="text-charcoal font-medium flex items-center gap-2 mt-2 hover:text-teal transition-colors">
                (555) 123-4567
             </a>
          </div>
        </div>
      </div>
    </div>
  )
}
