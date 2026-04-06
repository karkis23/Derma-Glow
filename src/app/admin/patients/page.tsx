import { createClient } from '@/lib/supabase/server'
import { User, Phone, Mail, UserCheck } from 'lucide-react'

export default async function AdminPatientsPage() {
  const supabase = await createClient()

  // Fetch all users with patient role
  const { data: patients, error } = await supabase
    .from('profiles')
    .select('*, appointments!patient_id(id)')
    .eq('role', 'patient')
    .order('created_at', { ascending: false })

  if (error) console.error("Patients fetch error:", error.message)

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-serif text-charcoal mb-2">Patient Directory</h1>
      <p className="text-gray-500 mb-8">View and manage all registered clinic patients.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-medium text-charcoal flex items-center gap-2">
              <UserCheck className="text-teal" size={20} /> Total Registered Patients
            </h2>
            <span className="bg-charcoal text-white font-bold px-4 py-1.5 rounded-full text-sm">
              {patients?.length || 0}
            </span>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-gray-500 bg-white">
                  <th className="py-4 px-6 font-medium">Patient Index</th>
                  <th className="py-4 px-6 font-medium">Contact Details</th>
                  <th className="py-4 px-6 font-medium">Joined Date</th>
                  <th className="py-4 px-6 font-medium text-center">Total Appointments</th>
                </tr>
              </thead>
              <tbody>
                {patients?.length === 0 ? (
                   <tr>
                     <td colSpan={4} className="py-12 text-center text-gray-400">
                       No patients found in the database.
                     </td>
                   </tr>
                ) : (
                  patients?.map((patient: any) => (
                    <tr key={patient.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center text-teal font-bold text-lg overflow-hidden shrink-0">
                            {patient.avatar_url ? (
                              <img src={patient.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              patient.full_name?.charAt(0)?.toUpperCase() || <User size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-charcoal text-lg">{patient.full_name || 'Unnamed Patient'}</p>
                            <p className="text-xs text-gray-400">ID: {patient.id.split('-')[0]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 space-y-1">
                         <p className="text-sm text-gray-600 flex items-center gap-2">
                           <Mail size={14} className="text-gray-400" /> {patient.email || 'N/A'}
                         </p>
                         <p className="text-sm text-gray-600 flex items-center gap-2">
                           <Phone size={14} className="text-gray-400" /> {patient.phone || 'No phone provided'}
                         </p>
                      </td>
                      <td className="py-5 px-6">
                        <p className="text-sm text-charcoal font-medium">
                          {new Date(patient.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <span className="inline-flex items-center justify-center min-w-[2rem] h-8 px-3 rounded-full bg-rose-gold/10 text-rose-gold font-bold text-sm">
                          {patient.appointments?.length || 0}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  )
}
