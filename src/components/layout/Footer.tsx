import Link from 'next/link'
import { MapPin, Phone, Mail, Camera, MessageCircle, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t-4 border-rose-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div>
            <div className="flex items-center mb-6">
              <span className="font-serif text-3xl tracking-wider text-white">Derma</span>
              <span className="font-serif text-3xl tracking-wider text-rose-gold">Glow</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium dermatology and skincare aesthetic treatments tailored to enhance your natural beauty and restore your skin's health.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-gold transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-gold transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-gold transition-colors">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-rose-gold">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Treatments & Services</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">Before & After Gallery</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Our Specialists</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Skin Health Blog</Link></li>
              <li><Link href="/portal" className="text-gray-300 hover:text-white transition-colors">Patient Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-rose-gold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-rose-gold shrink-0 mt-1" size={20} />
                <span className="text-gray-300">
                  123 Aesthetic Avenue, Medical District<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-rose-gold shrink-0" size={20} />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-rose-gold shrink-0" size={20} />
                <span className="text-gray-300">hello@dermaglowclinic.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-rose-gold">Opening Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-300">Mon - Fri</span>
                <span className="text-white">9:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-300">Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-gray-300">Sunday</span>
                <span className="text-rose-gold font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DermaGlow Clinic. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
