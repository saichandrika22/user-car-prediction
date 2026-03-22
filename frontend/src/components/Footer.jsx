import { NavLink } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-white">CarPrice Predictor</div>
          <p className="text-sm text-slate-400">
            A professional ML demo site for used-car selling price estimation.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Pages
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <NavLink to="/" className="hover:text-white">
              Home
            </NavLink>
            <NavLink to="/predict" className="hover:text-white">
              Predict
            </NavLink>
            <NavLink to="/about" className="hover:text-white">
              About
            </NavLink>
            <NavLink to="/contact" className="hover:text-white">
              Contact
            </NavLink>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Notes
          </div>
          <p className="text-sm text-slate-400">
            Predictions are estimates based on the trained model and selected features.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} CarPrice Predictor</span>
          <span>
            Configure API via{' '}
            <code className="rounded bg-white/10 px-1 py-0.5">VITE_API_URL</code>
          </span>
        </div>
      </div>
    </footer>
  )
}

