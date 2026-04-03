import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, LogOut, ImagePlus, MessageSquare } from 'lucide-react'
import { logout } from '@/app/(auth)/actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (!['admin', 'doctor', 'receptionist'].includes(profile?.role)) {
    redirect('/portal') // redirect non-staff back to patient portal
  }

  const role = profile?.role

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-charcoal text-white min-h-[calc(100vh-80px)] shadow-xl hidden md:block">
        <div className="p-6">
          <p className="font-serif text-lg text-rose-gold mb-1">Clinic Portal</p>
          <p className="text-sm text-gray-400 capitalize">{role}</p>
          <p className="text-sm text-gray-400 mb-8 font-medium">{profile?.full_name}</p>
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <LayoutDashboard size={18} /> Overview
            </Link>
            
            {role === 'admin' && (
              <Link href="/admin/assets" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
                <ImagePlus size={18} /> Asset Manager
              </Link>
            )}
            
            {(role === 'admin' || role === 'doctor') && (
              <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
                <MessageSquare size={18} /> Inbox
              </Link>
            )}
            
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Users size={18} /> Patients
            </Link>
          </nav>
        </div>
        <div className="absolute bottom-4 w-64 px-6">
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
              <LogOut size={18} /> Exit Admin
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
