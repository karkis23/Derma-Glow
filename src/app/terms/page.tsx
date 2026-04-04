import { Scale, FileText, Ban, Trash2, Calendar, CreditCard, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | DermaGlow Clinic',
  description: 'Review the terms and conditions for treatments, bookings, and clinic attendance at DermaGlow Clinic.',
}

export default function TermsOfService() {
  const lastUpdated = 'April 4, 2026'

  return (
    <div className="min-h-screen bg-cream/30 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal/10 rounded-2xl mb-4 text-teal">
            <Scale size={32} />
          </div>
          <h1 className="text-5xl font-serif text-charcoal mb-4">Terms of Service</h1>
          <p className="text-gray-500 font-medium">Last updated: {lastUpdated}</p>
        </div>

        <div className="glass bg-white/80 p-10 md:p-16 rounded-[3rem] shadow-xl border border-charcoal/5 space-y-12 text-gray-700 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <ShieldCheck className="text-rose-gold shrink-0" size={24} /> 
              Clinic Membership & Patient Accounts
            </h2>
            <p>
              By creating a patient portal account at DermaGlow Clinic, you represent that you are at least 18 years of age or possess legal parental or guardian consent. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <Calendar className="text-rose-gold shrink-0" size={24} /> 
              Appointments & Cancellations
            </h2>
            <p>
              Your appointment time is reserved exclusively for you. We request at least 24 hours' notice for any cancellation or rescheduling. Failure to provide such notice may result in a cancellation fee of 50% of the scheduled service price.
            </p>
            <p>We reserve the right to refuse treatment if there is a medical contraindication to the requested service.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <CreditCard className="text-rose-gold shrink-0" size={24} /> 
              Pricing & Payments
            </h2>
            <p>
              All prices are listed in Indian Rupees (₹) and are subject to change without notice. Payment is due at the time the service is rendered. We accept major credit cards, UPI, and digital wallets.
            </p>
            <p><strong>Note on Packages:</strong> Prepaid treatment packages are non-refundable but may be converted to clinic credit under certain medical circumstances.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <Ban className="text-rose-gold shrink-0" size={24} /> 
              Medical Disclaimer
            </h2>
            <p>
              The content provided on this website and our patient portal is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your dermatologist or other qualified skin health provider.
            </p>
            <div className="bg-red-50/50 p-6 rounded-2xl border-l-4 border-red-200">
               <p className="text-charcoal font-medium italic">Clinical results may vary individually based on skin type, lifestyle, and aftercare compliance.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <FileText className="text-rose-gold shrink-0" size={24} /> 
              Dispute Resolution
            </h2>
            <p>
              Any disputes arising from these terms or our services shall be governed by the laws of the local jurisdiction where DermaGlow Clinic is registered. We strive to resolve all concerns directly through patient-clinic direct communication first.
            </p>
          </section>

          <div className="pt-8 border-t border-charcoal/10 text-center">
            <p className="text-sm font-medium text-gray-400 mb-2 italic">By using our services, you agree to these legal terms.</p>
            <p className="text-charcoal font-bold mt-4">DermaGlow Clinic Legal Team</p>
          </div>

        </div>
      </div>
    </div>
  )
}
