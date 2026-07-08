import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BriefcaseBusiness, CheckCircle2, ChevronRight, Lock, Shield, Sparkles, Users, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f5f3ff_100%)]">
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 shadow-lg shadow-indigo-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/35">
              <BriefcaseBusiness className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-slate-900">JobOrbit</span>
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">Career Platform</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost">
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 px-6 py-16 shadow-[0_30px_80px_-30px_rgba(99,102,241,0.45)] backdrop-blur-xl sm:px-10 lg:px-16 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.22),_transparent_35%)]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Sparkles className="h-4 w-4" />
                Production-ready career platform
              </div>
              <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Build your professional future with
                <span className="mt-2 block bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
                  JobOrbit
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0">
                Secure sign-in, fast verification, password recovery, and a polished experience designed for modern job seekers.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-indigo-700 hover:to-purple-700"
                >
                  Get started free
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50"
                >
                  Sign in
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Verified accounts
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Premium UX
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Secure flows
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">What you get</p>
                <div className="mt-5 space-y-3">
                  {[
                    { title: 'Secure onboarding', description: 'Protected sign-in and account verification' },
                    { title: 'Fast recovery', description: 'OTP-based password reset in minutes' },
                    { title: 'Professional experience', description: 'A modern interface that feels ready for launch' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Users, label: 'Trusted by professionals', value: '10k+' },
              { icon: Shield, label: 'Protected accounts', value: '100%' },
              { icon: Zap, label: 'Fast onboarding', value: '< 2 min' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="mb-3 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-slate-900">{value}</p>
                <p className="mt-1 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Built for a polished launch
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A refined experience from sign-in to recovery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              JobOrbit balances strong security with a clean, modern interface that feels ready for real users.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: 'Email Verification',
                desc: 'Secure OTP-based verification keeps accounts trustworthy from the start.',
                gradient: 'from-blue-500 to-cyan-500',
                shadow: 'shadow-blue-500/25',
              },
              {
                icon: Lock,
                title: 'Password Recovery',
                desc: 'A guided reset experience makes account access simple and secure.',
                gradient: 'from-purple-500 to-pink-500',
                shadow: 'shadow-purple-500/25',
              },
              {
                icon: Zap,
                title: 'Modern Stack',
                desc: 'React, Tailwind, and validation layers create a fast, dependable experience.',
                gradient: 'from-amber-500 to-orange-500',
                shadow: 'shadow-amber-500/25',
              },
            ].map(({ icon: Icon, title, desc, gradient, shadow }) => (
              <div key={title} className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg ${shadow}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-800">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-slate-200/80 bg-white/70 px-6 py-8 text-center shadow-sm backdrop-blur sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg font-semibold text-slate-900">Ready to explore the experience?</p>
              <p className="mt-1 text-slate-500">Create an account and see the new flow in action.</p>
            </div>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
            >
              Start now
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} JobOrbit. Built with React & Tailwind CSS.
        </div>
      </footer>
    </div>
  )
}