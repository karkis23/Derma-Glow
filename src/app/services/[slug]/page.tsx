import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, IndianRupee, CheckCircle2 } from 'lucide-react'

// Next.js 15 requires params to be awaited before usage in Server Components
export default async function ServiceDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the primary service data
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!service) {
    notFound()
  }

  // Fetch related gallery photos for the specific service
  const { data: galleryPhotos } = await supabase
    .from('gallery_photos')
    .select('*')
    .eq('service_id', service.id)
    .eq('is_published', true)
    .limit(2)

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back navigation */}
      <Link href="/services" className="inline-flex items-center gap-2 text-rose-gold hover:text-charcoal transition-colors mb-10 font-medium">
        <ArrowLeft size={18} /> Back to all treatments
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Visuals */}
        <div className="space-y-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[500px]">
             <img 
               src={service.image_url} 
               alt={service.name} 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"></div>
             
             {/* Info Badges overlay */}
             <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4">
               <div className="bg-white/90 backdrop-blur text-charcoal px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                 <Clock size={16} className="text-teal" /> {service.duration_minutes} Minutes
               </div>
               <div className="bg-white/90 backdrop-blur text-charcoal px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                 <IndianRupee size={16} className="text-teal" /> From ₹{service.price}
               </div>
             </div>
          </div>
          
          {/* Related Gallery */}
          {galleryPhotos && galleryPhotos.length > 0 && (
            <div className="bg-cream rounded-3xl p-8 border border-charcoal/5">
              <h3 className="font-serif text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Real Patient Results</h3>
              <div className="space-y-8">
                {galleryPhotos.map((photo) => (
                  <div key={photo.id}>
                    <p className="font-medium text-charcoal mb-3">{photo.title}</p>
                    <div className="flex gap-2 h-32 md:h-48">
                      <div className="flex-1 relative rounded-xl overflow-hidden">
                        <img src={photo.before_image_url} alt="Before" className="w-full h-full object-cover grayscale opacity-90" />
                        <div className="absolute bottom-2 left-2 bg-white/80 py-1 px-2 rounded font-bold text-[10px]">BEFORE</div>
                      </div>
                      <div className="flex-1 relative rounded-xl overflow-hidden">
                        <img src={photo.after_image_url} alt="After" className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 right-2 bg-teal text-white py-1 px-2 rounded font-bold text-[10px]">AFTER</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-2">
                   <Link href="/gallery" className="text-teal text-sm font-medium hover:underline">View full gallery &rarr;</Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Details & Booking */}
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-rose-gold/10 text-rose-gold font-medium text-sm mb-4 tracking-wide uppercase">
            {service.category || 'Medical Aesthetics'}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-6 leading-tight">
            {service.name}
          </h1>
          
          <div className="prose prose-lg prose-p:text-gray-600 prose-headings:font-serif mb-12">
            <p className="text-xl text-teal italic mb-8">{service.description}</p>
            <p className="leading-relaxed">{service.long_description}</p>
          </div>

          <div className="bg-charcoal text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-serif mb-6 border-b border-white/10 pb-4">Treatment Benefits</h3>
            <ul className="space-y-4 mb-8">
              {[
                'FDA-cleared and clinically proven protocols.',
                'Customized exclusively to your unique skin type.',
                'Performed by board-certified aesthetic specialists.',
                'Minimal downtime with immediate radiance.'
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-rose-gold shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-300 text-sm md:text-base">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              href={`/book?service=${service.id}`}
              className="block w-full bg-teal hover:bg-teal-light text-white text-center py-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Book this Treatment Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
