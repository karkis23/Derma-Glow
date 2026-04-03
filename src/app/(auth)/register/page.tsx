import Link from 'next/link'
import { register } from '../actions'

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cream">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-teal-light/20 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-rose-gold-light/10 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl shadow-xl">
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

          {searchParams?.message && (
            <div className="p-4 rounded-xl bg-red-50/80 border border-red-200">
              <p className="text-sm text-center text-red-600 font-medium">{searchParams.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
