'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Briefcase,
  Home,
  Wrench,
  Loader2,
  CheckCircle,
  Shield,
  Users,
  Zap,
} from 'lucide-react'
import { signUpWithEmail } from '@/lib/auth/actions'
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal'

const benefits = [
  { icon: Shield, text: 'Verified pros only', color: 'text-emerald-500' },
  { icon: Users, text: 'Join 2,500+ users', color: 'text-blue-500' },
  { icon: Zap, text: 'Instant matching', color: 'text-violet-500' },
]

export default function SignUpPage() {
  const router = useRouter()
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const [hoName, setHoName] = useState('')
  const [hoEmail, setHoEmail] = useState('')
  const [hoPassword, setHoPassword] = useState('')
  const [hoConfirm, setHoConfirm] = useState('')

  const [proName, setProName] = useState('')
  const [proBusiness, setProBusiness] = useState('')
  const [proEmail, setProEmail] = useState('')
  const [proPassword, setProPassword] = useState('')
  const [proConfirm, setProConfirm] = useState('')

  const handleHomeownerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (hoPassword.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (hoPassword !== hoConfirm) { setError('Passwords do not match.'); return }
    setLoading(true)
    const result = await signUpWithEmail({ email: hoEmail, password: hoPassword, fullName: hoName, role: 'client' })
    if (result.error) { setError(result.error); setLoading(false); return }
    if (result.confirmed) { router.push('/dashboard'); router.refresh() } else { setEmailSent(true); setLoading(false) }
  }

  const handleProSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (proPassword.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (proPassword !== proConfirm) { setError('Passwords do not match.'); return }
    setLoading(true)
    const result = await signUpWithEmail({ email: proEmail, password: proPassword, fullName: proName, role: 'pro', companyName: proBusiness || undefined })
    if (result.error) { setError(result.error); setLoading(false); return }
    if (result.confirmed) { router.push('/join'); router.refresh() } else { setEmailSent(true); setLoading(false) }
  }

  if (emailSent) {
    return (
      <div className="min-h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="relative flex items-center justify-center min-h-[80vh] py-12">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/25">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Check your email</h1>
                <p className="text-gray-600 mb-8 text-lg">
                  We sent a confirmation link to your email. Click it to activate your account and get started.
                </p>
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/login">Back to Sign In</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-primary-50/20 to-secondary-50/30" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-reno-green-light/30 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary-100/20 blur-3xl" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9zdmc+')] opacity-60" />

      <div className="relative container mx-auto px-4 flex items-center justify-center min-h-[80vh] py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <ScrollReveal>
            <div className="flex flex-col items-center mb-8">
              <Link href="/" className="group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-reno-green via-reno-green-dark to-secondary-600 flex items-center justify-center mb-4 shadow-xl shadow-reno-green/25 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-reno-green/35 group-hover:scale-105">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </Link>
              <h1 className="text-2xl font-extrabold text-gray-900">
                Join Reno<span className="bg-gradient-to-r from-reno-green-dark to-reno-green bg-clip-text text-transparent">Next</span>
              </h1>
            </div>
          </ScrollReveal>

          {/* Card */}
          <ScrollReveal delay={0.1}>
            <Card className="rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200/60 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-reno-green via-secondary-500 to-reno-green" />
              <CardHeader className="text-center pt-8 pb-2">
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>
                  Join thousands of homeowners and pros
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                {error && (
                  <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 animate-in fade-in slide-in-from-top-1 duration-300">
                    {error}
                  </div>
                )}

                <Tabs defaultValue="homeowner" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl h-12 bg-gray-100/80 p-1">
                    <TabsTrigger value="homeowner" className="flex items-center gap-2 rounded-lg data-[state=active]:shadow-md transition-all">
                      <Home className="w-4 h-4" />
                      Homeowner
                    </TabsTrigger>
                    <TabsTrigger value="professional" className="flex items-center gap-2 rounded-lg data-[state=active]:shadow-md transition-all">
                      <Wrench className="w-4 h-4" />
                      Professional
                    </TabsTrigger>
                  </TabsList>

                  {/* Homeowner Form */}
                  <TabsContent value="homeowner">
                    <form onSubmit={handleHomeownerSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="homeowner-name">Full Name</Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="homeowner-name" type="text" placeholder="John Doe" className="pl-10 h-11 rounded-xl" value={hoName} onChange={(e) => setHoName(e.target.value)} required disabled={loading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="homeowner-email">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="homeowner-email" type="email" placeholder="you@example.com" className="pl-10 h-11 rounded-xl" value={hoEmail} onChange={(e) => setHoEmail(e.target.value)} required disabled={loading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="homeowner-password">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="homeowner-password" type="password" placeholder="Min. 8 characters" className="pl-10 h-11 rounded-xl" value={hoPassword} onChange={(e) => setHoPassword(e.target.value)} required minLength={8} disabled={loading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="homeowner-confirm">Confirm Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="homeowner-confirm" type="password" placeholder="Re-enter password" className="pl-10 h-11 rounded-xl" value={hoConfirm} onChange={(e) => setHoConfirm(e.target.value)} required disabled={loading} />
                        </div>
                      </div>
                      <div className="flex items-start gap-2 pt-2">
                        <input type="checkbox" id="homeowner-terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-reno-green-dark rounded" required />
                        <label htmlFor="homeowner-terms" className="text-sm text-gray-600">
                          I agree to the <Link href="/terms" className="text-reno-green-dark hover:underline font-medium">Terms</Link> and <Link href="/privacy" className="text-reno-green-dark hover:underline font-medium">Privacy Policy</Link>
                        </label>
                      </div>
                      <Button type="submit" className="w-full h-11 rounded-xl bg-gradient-to-r from-reno-green-dark to-secondary-600 hover:from-reno-green-dark hover:to-secondary-700 shadow-lg shadow-reno-green-dark/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50" disabled={!agreed || loading}>
                        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating account...</> : <>Create Account<ArrowRight className="w-4 h-4 ml-2" /></>}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Professional Form */}
                  <TabsContent value="professional">
                    <form onSubmit={handleProSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pro-name">Full Name</Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="pro-name" type="text" placeholder="John Doe" className="pl-10 h-11 rounded-xl" value={proName} onChange={(e) => setProName(e.target.value)} required disabled={loading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pro-business">Business Name (Optional)</Label>
                        <div className="relative group">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="pro-business" type="text" placeholder="Your Company LLC" className="pl-10 h-11 rounded-xl" value={proBusiness} onChange={(e) => setProBusiness(e.target.value)} disabled={loading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pro-email">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="pro-email" type="email" placeholder="you@example.com" className="pl-10 h-11 rounded-xl" value={proEmail} onChange={(e) => setProEmail(e.target.value)} required disabled={loading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pro-password">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="pro-password" type="password" placeholder="Min. 8 characters" className="pl-10 h-11 rounded-xl" value={proPassword} onChange={(e) => setProPassword(e.target.value)} required minLength={8} disabled={loading} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pro-confirm">Confirm Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
                          <Input id="pro-confirm" type="password" placeholder="Re-enter password" className="pl-10 h-11 rounded-xl" value={proConfirm} onChange={(e) => setProConfirm(e.target.value)} required disabled={loading} />
                        </div>
                      </div>
                      <div className="flex items-start gap-2 pt-2">
                        <input type="checkbox" id="pro-terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 accent-reno-green-dark rounded" required />
                        <label htmlFor="pro-terms" className="text-sm text-gray-600">
                          I agree to the <Link href="/terms" className="text-reno-green-dark hover:underline font-medium">Terms</Link> and <Link href="/privacy" className="text-reno-green-dark hover:underline font-medium">Privacy Policy</Link>
                        </label>
                      </div>
                      <Button type="submit" className="w-full h-11 rounded-xl bg-gradient-to-r from-reno-green-dark to-secondary-600 hover:from-reno-green-dark hover:to-secondary-700 shadow-lg shadow-reno-green-dark/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50" disabled={!agreed || loading}>
                        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating account...</> : <>Create Account<ArrowRight className="w-4 h-4 ml-2" /></>}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="text-center mt-6 text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-reno-green-dark hover:underline font-semibold">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Benefits */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-6 mt-8">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <b.icon className={`h-3.5 w-3.5 ${b.color}`} />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
