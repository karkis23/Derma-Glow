'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setMessage('Password updated successfully! Redirecting...')
    setTimeout(() => {
      router.push('/portal')
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cream">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-rose-gold-light/20 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-teal-light/10 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl shadow-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-serif tracking-tight text-charcoal">
            Set New Password
          </h2>
          <p className="mt-3 text-center text-sm text-gray-500">
            Choose a strong password for your account.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-charcoal/20 placeholder-gray-400 text-charcoal focus:outline-none focus:ring-rose-gold focus:border-rose-gold focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-charcoal/20 placeholder-gray-400 text-charcoal focus:outline-none focus:ring-rose-gold focus:border-rose-gold focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-teal hover:bg-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>

          {message && (
            <div className="p-4 rounded-xl bg-teal/10 border border-teal/30">
              <p className="text-sm text-center text-teal font-medium">{message}</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50/80 border border-red-200">
              <p className="text-sm text-center text-red-600 font-medium">{error}</p>
            </div>
          )}
        </form>

        <p className="text-center text-sm text-gray-500">
          <Link href="/login" className="font-medium text-teal hover:text-teal-light transition-colors">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
