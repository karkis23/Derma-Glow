import Link from 'next/link'
import { forgotPassword } from './actions'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; success?: string }>
}) {
  const params = await searchParams
  const emailSent = !!params?.success

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cream">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-rose-gold-light/20 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-teal-light/10 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl shadow-xl">
        {emailSent ? (
          /* ── Success State: Check Your Email ── */
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto">
              <Mail size={36} className="text-teal" />
            </div>
            <div>
              <h2 className="text-3xl font-serif tracking-tight text-charcoal">
                Check Your Email
              </h2>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                We&apos;ve sent a password reset link to your email address. 
                Please check your inbox and click the link to set a new password.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-teal/10 border border-teal/30">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={16} className="text-teal" />
                <p className="text-sm text-teal font-medium">{params.success}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs text-gray-400">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-rose-gold hover:text-rose-gold-light transition-colors"
                >
                  Try again
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/login"
                  className="text-sm font-medium text-teal hover:text-teal-light transition-colors inline-flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* ── Default State: Email Form ── */
          <>
            <div>
              <h2 className="mt-2 text-center text-3xl font-serif tracking-tight text-charcoal">
                Reset Your Password
              </h2>
              <p className="mt-3 text-center text-sm text-gray-500">
                Enter your email and we&apos;ll send you a secure link to reset your password.
              </p>
            </div>

            <form className="mt-8 space-y-6" action={forgotPassword}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-charcoal/20 placeholder-gray-400 text-charcoal focus:outline-none focus:ring-rose-gold focus:border-rose-gold focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-teal hover:bg-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal transition-all shadow-md hover:shadow-lg"
                >
                  Send Reset Link
                </button>
              </div>

              {params?.message && (
                <div className="p-4 rounded-xl bg-red-50/80 border border-red-200">
                  <p className="text-sm text-center text-red-600 font-medium">{params.message}</p>
                </div>
              )}
            </form>

            <p className="text-center text-sm text-gray-500">
              Remember your password?{' '}
              <Link href="/login" className="font-medium text-teal hover:text-teal-light transition-colors">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
