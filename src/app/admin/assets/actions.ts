'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upsertService(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const long_description = formData.get('long_description') as string
  const price = parseFloat(formData.get('price') as string)
  const duration_minutes = parseInt(formData.get('duration_minutes') as string)
  const category = formData.get('category') as string
  const image_url = formData.get('image_url') as string
  const is_active = formData.get('is_active') === 'on'

  // Generate slug from name
  const slug = name.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const serviceData = {
    name,
    slug,
    description,
    long_description,
    price,
    duration_minutes,
    category,
    image_url,
    is_active,
    updated_at: new Date().toISOString(),
  }

  let error
  if (id) {
    // Update existing service
    const { error: updateError } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', id)
    error = updateError
  } else {
    // Create new service
    const { error: insertError } = await supabase
      .from('services')
      .insert([serviceData])
    error = insertError
  }

  if (error) {
    console.error('Error upserting service:', error.message)
    return { error: error.message }
  }

  revalidatePath('/admin/assets')
  revalidatePath('/services')
  return { success: true }
}

export async function toggleServiceStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('services')
    .update({ is_active: !currentStatus })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/assets')
  revalidatePath('/services')
  return { success: true }
}

export async function upsertGalleryPhoto(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const before_image_url = formData.get('before_image_url') as string
  const after_image_url = formData.get('after_image_url') as string
  const service_id = formData.get('service_id') as string
  const is_published = formData.get('is_published') === 'on'
  const consent_given = formData.get('consent_given') === 'on'

  const photoData = {
    title,
    description,
    before_image_url,
    after_image_url,
    service_id: service_id || null,
    is_published,
    consent_given,
  }

  let error
  if (id) {
    const { error: updateError } = await supabase
      .from('gallery_photos')
      .update(photoData)
      .eq('id', id)
    error = updateError
  } else {
    const { error: insertError } = await supabase
      .from('gallery_photos')
      .insert([photoData])
    error = insertError
  }

  if (error) {
    console.error('Error upserting gallery photo:', error.message)
    return { error: error.message }
  }

  revalidatePath('/admin/assets')
  revalidatePath('/gallery')
  return { success: true }
}

export async function deleteGalleryPhoto(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('gallery_photos')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/assets')
  revalidatePath('/gallery')
  return { success: true }
}

