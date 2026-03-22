import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const linkBase =
  'rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          linkBase,
          isActive
            ? 'bg-white/10 text-white'
            : 'text-slate-200 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}

export function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <NavLink to="/" className="flex items-center gap-2 text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Sparkles size={18} className="text-fuchsia-300" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">CarPrice</div>
            <div className="text-xs text-slate-400">Predictor</div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/predict">Predict</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </nav>

        <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }} className="md:block">
          <NavLink
            to="/predict"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(99,102,241,0.25)]"
          >
            Try demo
            <span aria-hidden="true">→</span>
          </NavLink>
        </motion.div>
      </div>
    </div>
  )
}

