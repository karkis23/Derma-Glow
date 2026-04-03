import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Clock, Tag, ArrowRight } from 'lucide-react'

// Define the service type since we don't have full database types mapped yet
interface Service {
  id: string
  name: string
  slug: string
  description: string
  price: number
  duration_minutes: number
  category: string
  image_url: string
}

export default async function ServicesPage() {
  const supabase = await createClient()
  
  // Fetch active services
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error fetching services:', error)
  }

  // Group by category
  const categories = Array.from(new Set(services?.map(s => s.category) || []))

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-charcoal mb-6">Our Treatments</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore our comprehensive range of medical and aesthetic dermatology services. 
          Every treatment is customized to your unique skin profile.
        </p>
      </div>

      {!services?.length ? (
        <div className="text-center py-12 glass rounded-3xl">
          <p className="text-gray-500">No services available at this time. Please check back later.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {categories.map(category => (
            <div key={category}>
              <h2 className="text-3xl font-serif text-rose-gold mb-8 pb-4 border-b border-charcoal/10 flex items-center gap-3">
                <Tag className="text-teal" size={24} />
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.filter(s => s.category === category).map((service: Service) => (
                  <div key={service.id} className="group glass rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={service.image_url || 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80'} 
                        alt={service.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal flex items-center gap-1 shadow-sm">
                        <Clock size={12} /> {service.duration_minutes} Min
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-serif mb-3 text-charcoal">{service.name}</h3>
                      <p className="text-gray-600 mb-6 text-sm flex-grow">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/10">
                        <span className="font-bold text-lg text-charcoal">
                          From ${service.price}
                        </span>
                        <Link 
                          href={`/services/${service.slug}`}
                          className="text-teal hover:text-teal-light font-medium flex items-center gap-1"
                        >
                          Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Banner */}
      <div className="mt-24 p-1 rounded-3xl bg-gradient-to-r from-rose-gold via-teal to-rose-gold relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-all duration-700"></div>
        <div className="bg-charcoal px-8 py-16 rounded-[22px] text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Not sure which treatment is right for you?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a comprehensive skin consultation. Our experts will analyze your skin and design a personalized treatment path.
          </p>
          <Link 
            href="/book" 
            className="inline-block bg-white text-teal hover:bg-rose-gold hover:text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}
