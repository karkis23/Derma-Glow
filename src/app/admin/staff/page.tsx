import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Users, ShieldAlert, KeyRound, Plus } from 'lucide-react'
import { createStaffMember } from './actions'

export default async function StaffManagementPage({
  searchParams
}: {
  searchParams: { success?: string, error?: string }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/admin')

  // Fetch current administrative staff (filtering out regular patients)
  const { data: staff } = await supabase
    .from('profiles')
    .select('*')
    .in('role', ['admin', 'doctor', 'receptionist'])
    .order('role', { ascending: true })

  // Check if Service Role Key is configured
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif text-charcoal mb-2">Staff Management</h1>
          <p className="text-gray-600">Provision and manage internal clinic credentials with enforced RBAC.</p>
        </div>
      </div>

      {!hasServiceKey && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-6 rounded-2xl flex items-start gap-4">
          <ShieldAlert className="shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">Critical Configuration Missing</h3>
            <p className="mb-2">
              The application cannot securely create users without bypassing standard Auth flows. 
              To spawn staff credentials, you must provide your Supabase Service Role Key.
            </p>
            <p className="font-mono text-sm bg-red-100 p-3 rounded">
              Add <b>SUPABASE_SERVICE_ROLE_KEY=YOUR_KEY_HERE</b> to your <b>.env.local</b> file.
            </p>
          </div>
        </div>
      )}

      {searchParams.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl font-medium">
          Error: {searchParams.error}
        </div>
      )}
      {searchParams.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl font-medium">
          ✓ Staff credentials successfully generated and provisioned.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Creation Form */}
        <div className="lg:col-span-1">
          <div className="glass bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="font-serif text-xl border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
              <Plus size={20} className="text-teal" /> Create Member
            </h2>
            
            <form action={createStaffMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input required name="fullName" type="text" className="w-full px-3 py-2 border rounded-xl outline-none focus:border-teal" placeholder="e.g. Dr. Sarah Jenkins" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Clinic Role</label>
                <select required name="role" className="w-full px-3 py-2 border rounded-xl outline-none focus:border-teal capitalize">
                  <option value="doctor">Doctor</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="admin">System Admin</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">Review RBAC matrix before granting Admin.</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Login Email</label>
                <input required name="email" type="email" className="w-full px-3 py-2 border rounded-xl outline-none focus:border-teal" placeholder="sarah@dermaglow.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Temporary Password</label>
                <div className="relative">
                  <input required name="password" minLength={6} type="password" className="w-full px-3 py-2 border rounded-xl outline-none focus:border-teal" placeholder="••••••••" />
                  <KeyRound size={16} className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
                <input name="phone" type="tel" className="w-full px-3 py-2 border rounded-xl outline-none focus:border-teal" />
              </div>

              <button 
                disabled={!hasServiceKey}
                type="submit" 
                className="w-full mt-4 bg-teal hover:bg-teal-light text-white font-medium py-3 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                Provision Credentials
              </button>
            </form>
          </div>
        </div>

        {/* Staff Roster */}
        <div className="lg:col-span-2">
           <div className="glass bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="font-serif text-xl border-b border-gray-100 pb-3 mb-6 flex items-center gap-2">
               <Users size={20} className="text-rose-gold" /> Active Directory
             </h2>

             {staff && staff.length > 0 ? (
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-gray-100">
                       <th className="py-3 px-4 font-semibold text-gray-500 text-sm">Member</th>
                       <th className="py-3 px-4 font-semibold text-gray-500 text-sm">Role Access</th>
                       <th className="py-3 px-4 font-semibold text-gray-500 text-sm">Contact</th>
                       <th className="py-3 px-4 font-semibold text-gray-500 text-sm">Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     {staff.map((s: any) => (
                       <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                         <td className="py-4 px-4 font-medium text-charcoal">{s.full_name || 'Unnamed User'}</td>
                         <td className="py-4 px-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                             s.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                             s.role === 'doctor' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'
                           }`}>
                             {s.role}
                           </span>
                         </td>
                         <td className="py-4 px-4 text-sm text-gray-500">{s.phone || 'N/A'}</td>
                         <td className="py-4 px-4">
                             <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                               <div className="w-2 h-2 rounded-full bg-green-500"></div> Active
                             </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             ) : (
               <p className="text-gray-500 py-4">No staff members configured in database.</p>
             )}
           </div>
        </div>

      </div>
    </div>
  )
}
