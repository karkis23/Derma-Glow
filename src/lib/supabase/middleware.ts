import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Handle auth callback codes that land on ANY page (e.g. when Supabase
  // falls back to the Site URL instead of the redirect URL)
  const { pathname, searchParams } = request.nextUrl
  const code = searchParams.get('code')

  if (code && pathname !== '/auth/callback') {
    // A Supabase auth code landed on a non-callback page — redirect to the callback handler
    const url = request.nextUrl.clone()
    url.pathname = '/auth/callback'
    // Preserve the code and next params
    return NextResponse.redirect(url)
  }

  // Handle auth errors that land on the root URL (expired/invalid links)
  const authError = searchParams.get('error_description') || searchParams.get('error')
  if (authError && (pathname === '/' || pathname === '')) {
    const url = request.nextUrl.clone()
    url.pathname = '/forgot-password'
    url.search = '' // Clear all params
    url.searchParams.set('message', authError.includes('expired')
      ? 'Your reset link has expired. Please request a new one.'
      : 'Something went wrong. Please try again.')
    return NextResponse.redirect(url)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    (pathname.startsWith('/portal') || pathname.startsWith('/admin'))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Ensure we return the response with potentially updated cookies even on redirect
    const redirectResponse = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    return redirectResponse
  }

  if (user && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone()
    url.pathname = '/portal'
    const redirectResponse = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    return redirectResponse
  }

  return supabaseResponse
}


