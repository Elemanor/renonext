'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, Briefcase, Loader2, Shield, Zap, CheckCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithEmail } from '@/lib/auth/actions'
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal'

const trustSignals = [
  { icon: Shield, text: 'Bank-grade encryption' },
  { icon: Zap, text: 'Instant access' },
  { icon: CheckCircle, text: '2,500+ verified users' },
]

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signInWithEmail(email, password)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <Card className="rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 backdrop-blur-sm overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-reno-green via-secondary-500 to-reno-green" />
      <CardHeader className="space-y-1 pt-8 pb-4">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-base text-center">
          Sign in to your RenoNext account
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 animate-in fade-in slide-in-from-top-1 duration-300">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10 h-11 rounded-xl border-gray-200 transition-all focus:border-reno-green focus:ring-reno-green/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10 h-11 rounded-xl border-gray-200 transition-all focus:border-reno-green focus:ring-reno-green/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/auth/reset-password"
              className="text-sm text-reno-green-dark hover:text-reno-green-dark transition-colors font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-reno-green-dark to-reno-green hover:from-reno-green-dark hover:to-reno-green-dark text-white shadow-lg shadow-reno-green-dark/25 hover:shadow-xl hover:shadow-reno-green-dark/30 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-reno-green-dark hover:text-reno-green-dark font-semibold transition-colors"
          >
            Sign up free
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-reno-green-light/40 blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-secondary-100/30 blur-3xl translate-y-1/2 -translate-x-1/4" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9zdmc+')] opacity-60" />

      <div className="relative container mx-auto px-4 flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <ScrollReveal>
            <div className="flex items-center justify-center mb-8">
              <Link href="/" className="group flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-reno-green via-reno-green-dark to-secondary-600 flex items-center justify-center shadow-lg shadow-reno-green/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-reno-green/35 group-hover:scale-105">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-gray-900">
                  Reno<span className="bg-gradient-to-r from-reno-green-dark to-reno-green bg-clip-text text-transparent">Next</span>
                </span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Card */}
          <ScrollReveal delay={0.1}>
            <Suspense fallback={
              <Card className="rounded-2xl shadow-xl">
                <CardContent className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-reno-green-dark" />
                </CardContent>
              </Card>
            }>
              <LoginForm />
            </Suspense>
          </ScrollReveal>

          {/* Trust signals */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-6 mt-8">
              {trustSignals.map((signal) => (
                <div key={signal.text} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <signal.icon className="h-3.5 w-3.5" />
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
