import Link from 'next/link'
import { ArrowRight, Star, ShieldCheck, Sparkles, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-rose-gold-light/20 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-teal-light/10 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-rose-gold/10 text-rose-gold font-medium text-sm mb-6 tracking-wide uppercase">
                Premium Dermatology Clinic
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-charcoal leading-tight mb-6">
                Reveal Your <span className="text-teal italic">Natural</span> Radiance
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
                Experience advanced medical grade treatments paired with luxury aesthetic care. Our board-certified specialists craft personalized journeys to your best skin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/book" 
                  className="bg-teal hover:bg-teal-light text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl text-center flex justify-center items-center gap-2"
                >
                  Book Consultation <ArrowRight size={18} />
                </Link>
                <Link 
                  href="/services" 
                  className="border-2 border-charcoal/10 hover:border-charcoal text-charcoal px-8 py-4 rounded-full font-medium transition-colors text-center"
                >
                  View Treatments
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-cream bg-gray-200 overflow-hidden relative">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                        alt="Patient avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-rose-gold">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-medium mt-1">Trusted by 2,000+ patients</p>
                </div>
              </div>
            </div>
            
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-gold/20 to-teal/20 rounded-t-[140px] rounded-b-[40px] -z-10 rotate-3 scale-105"></div>
              <img 
                src="/images/hero_bg.png" 
                alt="Woman with beautiful skin" 
                className="rounded-t-[140px] rounded-b-[40px] shadow-2xl object-cover h-full w-full max-h-[600px]"
              />
              {/* Floating Badge */}
              <div className="absolute -left-6 bottom-20 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-teal text-white w-12 h-12 rounded-full flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">Board Certified</p>
                  <p className="text-xs text-gray-500">Dermatologists</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div>
              <p className="text-4xl font-serif text-rose-gold mb-2">15+</p>
              <p className="text-sm tracking-wide uppercase text-gray-300">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-rose-gold mb-2">10k+</p>
              <p className="text-sm tracking-wide uppercase text-gray-300">Happy Patients</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-rose-gold mb-2">4.9</p>
              <p className="text-sm tracking-wide uppercase text-gray-300">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-rose-gold mb-2">30+</p>
              <p className="text-sm tracking-wide uppercase text-gray-300">Advanced Treatments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-charcoal mb-4">Signature Treatments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular procedures designed to deliver transformative results with minimal downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src="/images/services/treatment_facial.png" 
                  alt="Chemical Peel" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal flex items-center gap-1">
                  <Clock size={12} /> 45 Min
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-3 group-hover:text-teal transition-colors">Advanced Chemical Peels</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Reveal brighter, smoother skin with our medical-grade chemical peels customized to your specific skin type and concerns.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">From $150</span>
                  <Link href="/services/chemical-peel" className="text-rose-gold hover:text-rose-gold-light font-medium flex items-center gap-1">
                    Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src="/images/services/treatment_facial.png" 
                  alt="Microneedling" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal flex items-center gap-1">
                  <Clock size={12} /> 60 Min
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-3 group-hover:text-teal transition-colors">Collagen Microneedling</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Stimulate your body's natural collagen production to firm skin, reduce scars, and minimize pores with precision technology.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">From $250</span>
                  <Link href="/services/microneedling" className="text-rose-gold hover:text-rose-gold-light font-medium flex items-center gap-1">
                    Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src="/images/services/treatment_facial.png" 
                  alt="Injectables" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal flex items-center gap-1">
                  <Clock size={12} /> 30 Min
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-3 group-hover:text-teal transition-colors">Botox & Dermal Fillers</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Smooth wrinkles and restore youthful volume with precision injections administered by our board-certified expert injectors.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-lg">From $300</span>
                  <Link href="/services/botox-fillers" className="text-rose-gold hover:text-rose-gold-light font-medium flex items-center gap-1">
                    Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 border-2 border-teal text-teal hover:bg-teal hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              View All 20+ Treatments <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif text-charcoal mb-6">The DermaGlow Difference</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We believe that great skin is the foundation of confidence. Our approach combines medical expertise with an artistic eye to deliver results that look completely natural.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-gold/20 flex items-center justify-center shrink-0">
                    <Sparkles className="text-rose-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 font-serif">Tailored Treatment Plans</h4>
                    <p className="text-gray-600 text-sm">No two faces are the same. We create bespoke regimens targeting your unique concerns and goals.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-teal" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 font-serif">Board-Certified Specialists</h4>
                    <p className="text-gray-600 text-sm">All medical procedures are performed by highly trained physicians and advanced practice providers.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center shrink-0">
                    <Star className="text-charcoal" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 font-serif">State-of-the-Art Technology</h4>
                    <p className="text-gray-600 text-sm">We continually invest in the safest, most effective laser and aesthetic devices on the market.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Decorative blobs */}
              <div className="absolute top-10 -left-10 w-64 h-64 bg-teal-light/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rose-gold-light/20 rounded-full blur-3xl -z-10"></div>
              
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/hero_bg.png" 
                  alt="Clinic interior" 
                  className="rounded-3xl rounded-br-none shadow-lg w-full h-[250px] object-cover"
                />
                <img 
                  src="/images/services/treatment_facial.png" 
                  alt="Treatment" 
                  className="rounded-3xl rounded-bl-none shadow-lg w-full h-[250px] object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-teal relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready for your best skin?</h2>
          <p className="text-teal-100 text-lg mb-10 max-w-2xl mx-auto">
            Schedule a comprehensive consultation today. Let our experts analyze your skin and design a personalized path to radiance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="bg-white text-teal hover:bg-gray-50 px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl text-center"
            >
              Book an Appointment
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
