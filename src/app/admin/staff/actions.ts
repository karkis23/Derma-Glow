'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createStaffMember(formData: FormData) {
  // 1. Verify caller is an 'admin'
  const ssrClient = await createClient()
  const { data: { user } } = await ssrClient.auth.getUser()
  
  if (!user) redirect('/login')
  
  const { data: profile } = await ssrClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  if (profile?.role !== 'admin') {
    redirect('/admin/staff?error=Unauthorized')
  }

  // 2. Validate environment
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    redirect('/admin/staff?error=ServiceKeyMissing')
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = formData.get('role') as string
  const phone = formData.get('phone') as string

  if (!email || !password || !fullName || !role) {
     redirect('/admin/staff?error=MissingFields')
  }

  try {
    const adminAuthClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { data: newAuthUser, error: createError } = await adminAuthClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: role }
    })

    if (createError) throw createError
    if (!newAuthUser.user) throw new Error('User creation failed silently')

    const { error: profileUpdateError } = await adminAuthClient
      .from('profiles')
      .update({ full_name: fullName, role: role, phone: phone || null })
      .eq('id', newAuthUser.user.id)

    if (profileUpdateError) {
       await adminAuthClient.from('profiles').insert({
         id: newAuthUser.user.id, full_name: fullName, role: role, phone: phone || null
       })
    }

  } catch (error: any) {
    console.error('Staff creation payload error:', error)
    redirect(`/admin/staff?error=${encodeURIComponent(error.message || 'CreationFailed')}`)
  }
  
  revalidatePath('/admin/staff')
  redirect('/admin/staff?success=true')
}
