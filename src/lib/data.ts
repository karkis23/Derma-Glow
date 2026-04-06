import { unstable_cache } from 'next/cache'
import { createClient, createPublicClient } from '@/lib/supabase/server'

/**
 * Fetch all active services with caching (Public data, no cookies)
 */
export const getCachedServices = unstable_cache(
  async () => {
    const supabase = createPublicClient()
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('name')
    
    if (error) return []
    return services
  },
  ['services'],
  {
    tags: ['services'],
    revalidate: 3600
  }
)

/**
 * Fetch public gallery photos with caching (Public data, no cookies)
 */
export const getCachedGalleryPhotos = unstable_cache(
  async () => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*, service:services(name)')
      .eq('is_published', true)
      .eq('consent_given', true)
      .order('created_at', { ascending: false })
    
    if (error) return []
    return data
  },
  ['gallery'],
  {
    tags: ['gallery'],
    revalidate: 3600
  }
)

/**
 * Fetch published testimonials with caching (Public data, no cookies)
 */
export const getCachedTestimonials = unstable_cache(
  async () => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('rating', { ascending: false })
      .limit(6)

    if (error) return []
    return data
  },
  ['testimonials'],
  {
    tags: ['testimonials'],
    revalidate: 3600
  }
)

/**
 * Fetch a single service by slug with caching (Public data, no cookies)
 */
export const getCachedServiceBySlug = unstable_cache(
  async (slug: string) => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data
  },
  ['service-detail'],
  {
    tags: ['services'],
    revalidate: 3600
  }
)

/**
 * Fetch gallery photos for a specific service (Public data, no cookies)
 */
export const getCachedGalleryByService = unstable_cache(
  async (serviceId: string) => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('service_id', serviceId)
      .eq('is_published', true)
      .limit(2)

    if (error) return []
    return data
  },
  ['gallery-by-service'],
  {
    tags: ['gallery'],
    revalidate: 3600
  }
)
