import Link from 'next/link'
import { register } from '../actions'
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; success?: string }>
}) {
  const params = await searchParams
  const accountCreated = !!params?.success

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cream">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-teal-light/20 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-rose-gold-light/10 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl shadow-xl">
        {accountCreated ? (
          /* ── Success State: Verify Your Email ── */
          <div className="text-center space-y-6 py-4">
            <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto">
              <Mail size={36} className="text-teal" />
            </div>
            <div>
              <h2 className="text-3xl font-serif tracking-tight text-charcoal">
                Verify Your Email
              </h2>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Your account has been created successfully! We&apos;ve sent a verification 
                link to your email. Please click it to activate your account.
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
                Didn&apos;t receive the email? Check your spam folder.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-light transition-colors"
              >
                <ArrowLeft size={14} />
                Go to sign in
              </Link>
            </div>
          </div>
        ) : (
          /* ── Default State: Registration Form ── */
          <>
            <div>
              <h2 className="mt-2 text-center text-3xl font-serif tracking-tight text-charcoal">
                Create Patient Account
              </h2>
              <p className="mt-3 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-teal hover:text-teal-light transition-colors">
                  Sign in securely
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" action={register}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-charcoal/20 placeholder-gray-400 text-charcoal focus:outline-none focus:ring-rose-gold focus:border-rose-gold focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm"
                    placeholder="Jane Doe"
                  />
                </div>
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
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-charcoal/20 placeholder-gray-400 text-charcoal focus:outline-none focus:ring-rose-gold focus:border-rose-gold focus:z-10 sm:text-sm bg-white/50 backdrop-blur-sm"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-teal hover:bg-teal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal transition-all shadow-md hover:shadow-lg"
                >
                  Create Account
                </button>
              </div>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                By creating an account, you agree to our Terms of Service and Privacy Policy regarding health data handling.
              </p>

              {params?.message && (
                <div className="p-4 rounded-xl bg-red-50/80 border border-red-200">
                  <p className="text-sm text-center text-red-600 font-medium">{params.message}</p>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}
