'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User, Calendar, LogIn, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { type User as SupabaseUser } from '@supabase/supabase-js'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl tracking-wider text-teal">Derma</span>
              <span className="font-serif text-2xl tracking-wider text-rose-gold">Glow</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-charcoal-light hover:text-rose-gold transition-colors px-3 py-2 text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <Link 
                  href="/portal" 
                  className="text-teal font-bold transition-all bg-teal/5 px-4 py-2 rounded-full border border-teal/10 hover:bg-teal/10 flex items-center gap-2 text-sm"
                >
                  <User size={18} />
                  My Portal
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  className="text-teal hover:text-teal-light flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <LogIn size={18} />
                  Portal
                </Link>
              )}
              
              <Link
                href="/book"
                className="bg-teal hover:bg-teal-light text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Calendar size={18} />
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-teal focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/20 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-charcoal hover:text-rose-gold hover:bg-white/30"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 border-t border-charcoal/10 pt-4 flex flex-col space-y-3 px-3">
              {user ? (
                <Link
                  href="/portal"
                  className="flex items-center justify-between text-teal font-bold bg-teal/5 p-4 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <User size={20} />
                    <span>My Patient Portal</span>
                  </div>
                  <ExternalLink size={18} />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-teal font-medium p-4 rounded-xl hover:bg-teal/5"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={20} />
                  Patient Login
                </Link>
              )}
              
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 w-full bg-teal text-white px-4 py-4 rounded-2xl font-bold shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                <Calendar size={20} />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

