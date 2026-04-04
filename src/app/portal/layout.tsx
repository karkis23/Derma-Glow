export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CalendarDays, User, MessageSquare, LogOut, Settings, Clock } from 'lucide-react'
import { logout } from '@/app/(auth)/actions'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const navItems = [
    { name: 'Dashboard', href: '/portal', icon: User },
    { name: 'Appointments', href: '/portal/appointments', icon: CalendarDays },
    { name: 'Messages', href: '/portal/messages', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-cream pt-20 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-charcoal text-white shrink-0 md:min-h-[calc(100vh-80px)] shadow-xl relative z-20">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-rose-gold/20 flex items-center justify-center border border-white/10 shrink-0 overflow-hidden">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="text-rose-gold" size={24} />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="font-serif font-medium text-lg truncate">
                {profile?.full_name || 'Patient'}
              </p>
              <p className="text-xs text-gray-400 capitalize">{profile?.role}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <Icon size={18} className="text-teal" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl transition-colors text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 relative z-10">
         {/* Background soft gradients */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-gold-light/10 rounded-full blur-3xl opacity-60 pointer-events-none -z-10"></div>
         {children}
      </main>
    </div>
  )
}
