import { submitContactForm } from './actions'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage({
  searchParams,
}: {
  searchParams: { success?: string, error?: string }
}) {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-light/5 to-transparent -z-10"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-rose-gold-light/20 rounded-full blur-3xl -z-10"></div>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-charcoal mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We're here to answer any questions you have about our treatments, booking process, or clinic policies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Contact Information & Map */}
        <div className="space-y-10">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-2xl font-serif text-charcoal mb-6 border-b border-charcoal/10 pb-4">Clinic Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-rose-gold/10 p-3 rounded-full text-rose-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-lg mb-1">Our Location</h4>
                  <p className="text-gray-600">123 Aesthetic Avenue<br />Medical District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-teal/10 p-3 rounded-full text-teal shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-lg mb-1">Phone</h4>
                  <p className="text-gray-600">Main: (555) 123-4567<br />Fax: (555) 123-4568</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-charcoal/10 p-3 rounded-full text-charcoal shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-lg mb-1">Email</h4>
                  <p className="text-gray-600">hello@dermaglowclinic.com<br />support@dermaglowclinic.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-rose-gold/10 p-3 rounded-full text-rose-gold shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-charcoal text-lg mb-1">Hours of Operation</h4>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 7:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-64 bg-gray-200 rounded-3xl overflow-hidden relative">
            <img 
               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" 
               alt="Map placeholder" 
               className="w-full h-full object-cover"
            />
            {/* Visual map pin indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-teal text-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <MapPin size={24} />
                </div>
                <div className="w-4 h-1 bg-black/30 rounded-[100%] mx-auto mt-1 blur-[2px]"></div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-10 rounded-3xl shadow-xl h-fit">
          <h2 className="text-3xl font-serif text-charcoal mb-2">Send a Message</h2>
          <p className="text-gray-600 mb-8">Please fill out the form below and our team will get back to you within 24 hours.</p>
          
          {searchParams.success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 font-medium text-center">
              {searchParams.success}
            </div>
          )}
          {searchParams.error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium text-center">
              {searchParams.error}
            </div>
          )}

          <form action={submitContactForm} className="space-y-6">
            {/* Anti-spam: honeypot field — invisible to users, bots fill it */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {/* Anti-spam: timestamp to detect speed bots */}
            <input type="hidden" name="_timestamp" value={Date.now().toString()} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-charcoal/20 focus:ring-2 focus:ring-teal bg-white/50 backdrop-blur-sm outline-none transition-all"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-charcoal/20 focus:ring-2 focus:ring-teal bg-white/50 backdrop-blur-sm outline-none transition-all"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-charcoal/20 focus:ring-2 focus:ring-teal bg-white/50 backdrop-blur-sm outline-none transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">Subject</label>
                <select 
                  id="subject" 
                  name="subject" 
                  className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-charcoal/20 focus:ring-2 focus:ring-teal bg-white/50 backdrop-blur-sm outline-none transition-all text-charcoal h-[48px]"
                  defaultValue="General Inquiry"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Appointment Change">Appointment Change/Cancellation</option>
                  <option value="Treatment Question">Question about a Treatment</option>
                  <option value="Billing">Billing Issue</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">Message *</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                required
                className="w-full px-4 py-3 rounded-xl border-none ring-1 ring-charcoal/20 focus:ring-2 focus:ring-teal bg-white/50 backdrop-blur-sm outline-none transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-charcoal hover:bg-black text-white py-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              For medical emergencies, please call 911 or go to your nearest emergency room immediately.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
