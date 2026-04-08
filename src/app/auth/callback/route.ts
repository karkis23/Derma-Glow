import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/portal'
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle error redirects from Supabase (e.g. expired token)
  if (error || errorDescription) {
    const message = errorDescription?.includes('expired')
      ? 'Your reset link has expired. Please request a new one.'
      : errorDescription || 'Authentication failed. Please try again.'
    return NextResponse.redirect(
      new URL(`/forgot-password?message=${encodeURIComponent(message)}`, requestUrl.origin)
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    }

    // If code exchange failed (e.g. expired code)
    return NextResponse.redirect(
      new URL('/forgot-password?message=Your reset link has expired. Please request a new one.', requestUrl.origin)
    )
  }

  // If there's no code, redirect to login
  return NextResponse.redirect(
    new URL('/login?message=Could not verify your identity. Please try again.', requestUrl.origin)
  )
}
