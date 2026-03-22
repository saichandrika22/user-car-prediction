import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '../components/PageShell.jsx'

export default function NotFoundPage() {
  return (
    <PageShell>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">404</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <NavLink
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Go home
          </NavLink>
          <NavLink
            to="/predict"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(99,102,241,0.25)]"
          >
            Try prediction
          </NavLink>
        </div>
      </motion.div>
    </PageShell>
  )
}

