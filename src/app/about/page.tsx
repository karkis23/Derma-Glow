import { ShieldCheck, Award, GraduationCap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      
      {/* Clinic Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative">
         <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-light/10 rounded-full blur-3xl -z-10 translate-y-[-50%]"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-rose-gold/20 to-teal/20 rounded-3xl -z-10 rotate-3 scale-105"></div>
             <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" 
                alt="Clinic building" 
                className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
             />
           </div>
           
           <div>
             <h1 className="text-5xl font-serif text-charcoal mb-6">Elevating the Standard of Skincare</h1>
             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
               Founded in 2010 by Dr. Elena Chen, DermaGlow Clinic was created with a singular vision: to bridge the gap between rigorous medical dermatology and premium aesthetic care.
             </p>
             <p className="text-lg text-gray-600 mb-8 leading-relaxed">
               We believe that aesthetic treatments should never be performed as a "one-size-fits-all" assembly line. Because your skin is an incredibly complex living organ, it demands the attention of experts who understand its underlying biology.
             </p>
             
             <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="glass p-5 rounded-2xl border-l-4 border-teal">
                 <h4 className="font-bold text-2xl text-teal mb-1">15+</h4>
                 <p className="text-sm font-medium text-gray-600">Years of Clinical Excellence</p>
               </div>
               <div className="glass p-5 rounded-2xl border-l-4 border-rose-gold">
                 <h4 className="font-bold text-2xl text-rose-gold mb-1">5+</h4>
                 <p className="text-sm font-medium text-gray-600">Board-Certified Specialists</p>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Philosophy / Values */}
      <section className="bg-charcoal text-white py-24 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-white mb-4">Our Core Philosophy</h2>
            <div className="w-16 h-1 bg-rose-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-gold">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-serif mb-4">Safety First</h3>
              <p className="text-gray-400">All treatments are FDA-cleared and performed solely by licensed medical professionals under stringent clinical protocols.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-teal">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-serif mb-4">Science-Backed</h3>
              <p className="text-gray-400">We ignore fleeting social media trends in favor of evidence-based modalities scientifically proven to yield measurable results.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-gold">
                <Award size={32} />
              </div>
              <h3 className="text-2xl font-serif mb-4">Natural Harmony</h3>
              <p className="text-gray-400">Our aesthetic goal is never to change how you look, but to restore youthfulness and enhance your own unique, natural architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-charcoal mb-4">Meet Our Specialists</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The DermaGlow team consists exclusively of board-certified dermatologists, nurse practitioners, and master estheticians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor 1 */}
          <div className="glass rounded-3xl overflow-hidden group">
            <div className="h-80 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" 
                alt="Dr. Elena Chen" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <p className="text-white font-serif text-2xl">Dr. Elena Chen</p>
                <p className="text-rose-gold font-medium">Founder & Medical Director</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                Board-certified dermatologist specializing in laser medicine, advanced injectables, and acne scar revision. A graduate of Harvard Medical School, Dr. Chen frequently speaks at national aesthetic conferences.
              </p>
              <Link href="/contact" className="text-teal font-medium hover:underline text-sm flex items-center gap-1">
                Consult with Dr. Chen <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="glass rounded-3xl overflow-hidden group">
            <div className="h-80 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" 
                alt="Dr. Marcus Thorne" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <p className="text-white font-serif text-2xl">Dr. Marcus Thorne</p>
                <p className="text-rose-gold font-medium">Lead Dermatologist</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                Expert in clinical dermatology, skin cancer screenings, and non-invasive skin tightening devices. Dr. Thorne completed his residency at Mayo Clinic with a focus on cutting-edge energy-based devices.
              </p>
              <Link href="/contact" className="text-teal font-medium hover:underline text-sm flex items-center gap-1">
                Consult with Dr. Thorne <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Nurse Practitioner */}
          <div className="glass rounded-3xl overflow-hidden group">
            <div className="h-80 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" 
                alt="Sarah Jenkins, NP" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                <p className="text-white font-serif text-2xl">Sarah Jenkins, FNP-C</p>
                <p className="text-rose-gold font-medium">Advanced Aesthetic Nurse</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                With a master's degree in nursing and an artistic eye, Sarah is our lead injector and microneedling specialist. She prioritizes conservative adjustments that provide maximum aesthetic balance.
              </p>
              <Link href="/book" className="text-teal font-medium hover:underline text-sm flex items-center gap-1">
                Book with Sarah <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
