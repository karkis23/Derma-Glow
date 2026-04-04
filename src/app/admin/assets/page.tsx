import { createClient } from '@/lib/supabase/server'
import AssetManagerUI from './AssetManagerUI'

export const dynamic = 'force-dynamic'

export default async function AssetManagerPage() {
  const supabase = await createClient()

  // Fetch current services for management
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  // Fetch gallery photos
  const { data: galleryPhotos } = await supabase
    .from('gallery_photos')
    .select('*, services(name)')
    .order('created_at', { ascending: false })

  return (
    <AssetManagerUI 
      initialServices={services || []} 
      initialGallery={galleryPhotos || []} 
    />
  )
}
