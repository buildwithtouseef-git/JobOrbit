import { Link } from "react-router-dom";
import { BriefcaseBusiness, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import useAuth from "../context/useAuth";
import { ROUTES } from "../../../shared/constants/routes";

const features = [
  {
    title: "Smart applications",
    description: "Keep every opportunity organized in one polished workspace.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Trusted security",
    description: "Protected sessions, secure password resets, and verified accounts.",
    icon: ShieldCheck,
  },
  {
    title: "Career momentum",
    description: "Stay ahead with a modern experience that helps you act faster.",
    icon: TrendingUp,
  },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-sm text-violet-200">
            <Sparkles size={16} />
            AI-powered hiring experience
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Launch your next chapter with JobOrbit.
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Discover roles, manage applications, and build momentum from one beautifully designed platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD} className="rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400">
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link to={ROUTES.REGISTER} className="rounded-full bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400">
                  Create account
                </Link>
                <Link to={ROUTES.LOGIN} className="rounded-full border border-white/20 px-6 py-3 font-semibold text-slate-100 transition hover:bg-white/10">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
          <div className="rounded-2xl bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-200">Why teams choose us</p>
            <div className="mt-4 space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="rounded-xl bg-violet-500/20 p-2 text-violet-200">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 JobOrbit. Everything you need to move forward.</p>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-white">About</a>
            <a href="/companies" className="hover:text-white">Companies</a>
            <a href="/jobs" className="hover:text-white">Jobs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
