import { motion } from 'framer-motion'
import { BookOpen, Layers, SlidersHorizontal } from 'lucide-react'
import { PageShell } from '../components/PageShell.jsx'

function Card({ icon: Icon, title, children }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon size={18} className="text-fuchsia-300" />
        </span>
        {title}
      </div>
      <div className="mt-3 text-sm text-slate-300">{children}</div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <PageShell>
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-10"
      >
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
          About this project
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-sm text-slate-300 md:text-base">
          This website demonstrates an end-to-end machine learning workflow: a trained model is
          served via a backend API and consumed by a modern, professional frontend.
        </p>
      </motion.header>

      <section className="grid gap-5 md:grid-cols-3">
        <Card icon={BookOpen} title="Goal">
          Provide a simple, polished interface for estimating used-car selling price based on key
          attributes like year, kilometers driven, and categorical features.
        </Card>
        <Card icon={Layers} title="Architecture">
          <ul className="space-y-2">
            <li>
              <span className="font-medium text-slate-100">Frontend:</span> React (Vite) + Tailwind +
              animations.
            </li>
            <li>
              <span className="font-medium text-slate-100">Backend:</span> FastAPI endpoint that
              loads the model and predicts.
            </li>
            <li>
              <span className="font-medium text-slate-100">Model:</span> pickled scikit-learn
              estimator saved in <code className="rounded bg-white/10 px-1 py-0.5">model/</code>.
            </li>
          </ul>
        </Card>
        <Card icon={SlidersHorizontal} title="Inputs">
          The predictor uses a few core inputs (year, km driven, fuel, seller type, transmission,
          owner) and aligns them to the model’s training columns using one-hot encoding.
        </Card>
      </section>

      <section className="mt-10 card p-6">
        <div className="text-sm font-semibold text-white">What to improve next (optional)</div>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400/80" />
            Add more features (e.g., brand, model, engine, seats) if available in your dataset.
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-400/80" />
            Persist prediction history and show analytics.
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
            Deploy with Docker (one command to run frontend + backend).
          </li>
        </ul>
      </section>
    </PageShell>
  )
}

