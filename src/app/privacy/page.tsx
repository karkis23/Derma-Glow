import { Shield, Lock, Eye, FileText, Scale, Info } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | DermaGlow Clinic',
  description: 'Learn how DermaGlow Clinic protects and manages your personal and medical data.',
}

export default function PrivacyPolicy() {
  const lastUpdated = 'April 4, 2026'

  return (
    <div className="min-h-screen bg-cream/30 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal/10 rounded-2xl mb-4">
            <Shield className="text-teal" size={32} />
          </div>
          <h1 className="text-5xl font-serif text-charcoal mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-medium">Last updated: {lastUpdated}</p>
        </div>

        <div className="glass bg-white/80 p-10 md:p-16 rounded-[3rem] shadow-xl border border-charcoal/5 space-y-12 text-gray-700 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <Info className="text-rose-gold shrink-0" size={24} /> 
              Introduction
            </h2>
            <p>
              At DermaGlow Clinic, we are committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our clinic, use our website, or interact with our patient portal.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <Eye className="text-rose-gold shrink-0" size={24} /> 
              Information We Collect
            </h2>
            <p>To provide high-quality medical and aesthetic services, we may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identification:</strong> Name, address, phone number, email, and date of birth.</li>
              <li><strong>Medical History:</strong> Skin conditions, past treatments, allergies, and medication history.</li>
              <li><strong>Financial Data:</strong> Billing information and payment history for the services rendered.</li>
              <li><strong>Digital Interactions:</strong> Log data, IP addresses, and session interaction on our patient portal.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <Lock className="text-rose-gold shrink-0" size={24} /> 
              Data Security & Storage
            </h2>
            <p>
              Your security is our priority. We implement industry-standard encryption and security protocols (including SSL encryption) to protect your data both in transit and at rest. Access to medical records is strictly restricted to authorized staff members on a need-to-know basis.
            </p>
            <p>We do not sell your personal data to third parties. We only share information with partners involved in your care or when required by governing medical laws.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
              <FileText className="text-rose-gold shrink-0" size={24} /> 
              Clinical Photography (Before/After)
            </h2>
            <p>
              By agreeing to our Clinical Consent, you may allow us to take "before and after" photos. These photos are part of your medical record. We will never use these photos for marketing purposes without your explicit, written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-serif text-charcoal flex items-center gap-3">
               <Scale className="text-rose-gold shrink-0" size={24} /> 
               Your Rights
            </h2>
            <p>Patients under our care have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request a copy of their medical records.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Opt-out of non-essential marketing communications.</li>
              <li>Withdraw consent for data processing (where applicable).</li>
            </ul>
          </section>

          <div className="pt-8 border-t border-charcoal/10 text-center">
            <p className="text-sm font-medium text-gray-400 mb-2 italic">For any privacy-related inquiries, please contact us at:</p>
            <a href="mailto:privacy@dermaglowclinic.com" className="text-teal font-bold hover:underline">privacy@dermaglowclinic.com</a>
          </div>

        </div>
      </div>
    </div>
  )
}
