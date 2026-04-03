import { createClient } from '@/lib/supabase/server'
import { CheckCircle2, Star } from 'lucide-react'

// Using Tailwind 4 + Glassmorphism aesthetic
export default async function GalleryPage() {
  const supabase = await createClient()
  
  // Fetch real gallery photos from database
  const { data: galleryPhotos } = await supabase
    .from('gallery_photos')
    .select('*, service:services!service_id(name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('rating', { ascending: false })
    .limit(6)

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-charcoal mb-6">Patient Results</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Real results from real patients. See the transformative power of our personalized treatment plans.
        </p>
      </div>

      {/* Before/After Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {galleryPhotos?.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-12">More patient stories coming soon!</p>
        )}
        {galleryPhotos?.map((case_: any) => (
          <div key={case_.id} className="glass rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <div className="relative flex-1 h-64 bg-gray-200 rounded-2xl overflow-hidden group">
                <img src={case_.before_image_url} alt="Before" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur text-charcoal px-3 py-1 rounded-full text-xs font-bold font-sans">BEFORE</div>
              </div>
              <div className="relative flex-1 h-64 bg-gray-100 rounded-2xl overflow-hidden group">
                <img src={case_.after_image_url} alt="After" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 bg-teal text-white px-3 py-1 rounded-full text-xs font-bold font-sans shadow-lg">AFTER</div>
              </div>
            </div>
            <div className="px-2">
              <h3 className="font-serif text-2xl text-charcoal mb-1">{case_.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{case_.description}</p>
              <p className="text-rose-gold text-sm font-medium flex items-center gap-2">
                <CheckCircle2 size={16} /> Treatment: {case_.service?.name || "Custom Treatment"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="bg-cream rounded-3xl p-8 lg:p-12 border border-charcoal/5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-charcoal mb-4">Patient Stories</h2>
          <div className="flex justify-center text-rose-gold mb-4">
            <Star fill="currentColor" />
            <Star fill="currentColor" />
            <Star fill="currentColor" />
            <Star fill="currentColor" />
            <Star fill="currentColor" />
          </div>
          <p className="text-gray-500">Based on 200+ verified patient reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map(review => (
            <div key={review.id} className="glass p-8 rounded-3xl relative">
              <div className="text-4xl font-serif text-rose-gold opacity-20 absolute top-6 right-6">"</div>
              <div className="flex text-rose-gold mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 mb-8 italic leading-relaxed">"{review.content}"</p>
              <div className="mt-auto border-t border-charcoal/10 pt-4">
                <p className="font-bold text-charcoal">— {review.patient_name}</p>
                <p className="text-xs text-gray-500 mt-1">Verified Patient</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
