import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  Activity,
  ShieldCheck,
  Sparkles,
  Zap,
  Car,
  Brain,
  BarChart2,
  ArrowRight,
} from 'lucide-react'
import { PageShell } from '../components/PageShell.jsx'

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="card p-5"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon size={18} className="text-fuchsia-300" />
        </span>
        {title}
      </div>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </motion.div>
  )
}

function HowStep({ icon: Icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="card flex h-full flex-col items-start gap-4 p-6 md:items-center md:text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500/30 to-blue-500/30 ring-1 ring-white/10">
        <Icon size={24} className="text-violet-200" />
      </div>
      <div className="w-full">
        <div className="text-base font-semibold text-white">{title}</div>
        <p className="mt-2 text-sm text-slate-300">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <PageShell>
      <motion.section
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid items-center gap-8 md:grid-cols-2"
      >
        <div>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
          >
            <Sparkles size={14} className="text-fuchsia-300" />
            Professional ML demo website
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl"
          >
            Used Car Price Intelligence Platform
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl text-pretty text-sm text-slate-300 md:text-base"
          >
            A modern web interface showcasing an end-to-end used car price prediction project.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            <NavLink
              to="/predict"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(99,102,241,0.25)]"
            >
              Predict a price
            </NavLink>
            <NavLink
              to="/about"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              About the project
            </NavLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300">
            {[
              { label: 'React + Tailwind', delay: 0 },
              { label: 'FastAPI backend', delay: 0.2 },
              { label: 'ML model (pickle)', delay: 0.4 },
            ].map((b) => (
              <motion.span
                key={b.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: b.delay, ease: 'easeOut' }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                whileHover={{ y: -1 }}
              >
                {b.label}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-5">
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="card p-6"
          >
            <div className="text-sm font-semibold text-white">Quick overview</div>
            <div className="mt-4 grid gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Zap className="mt-0.5 text-indigo-300" size={18} />
                <div>
                  <div className="text-sm font-semibold text-white">Fast</div>
                  <div className="text-sm text-slate-300">Vite dev server + efficient API calls.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="mt-0.5 text-emerald-300" size={18} />
                <div>
                  <div className="text-sm font-semibold text-white">Validated</div>
                  <div className="text-sm text-slate-300">Backend validates inputs with a schema.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <Activity className="mt-0.5 text-fuchsia-300" size={18} />
                <div>
                  <div className="text-sm font-semibold text-white">Polished</div>
                  <div className="text-sm text-slate-300">Smooth transitions and a modern “product” feel.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/25 via-indigo-500/10 to-blue-500/20 px-5 py-12 md:mt-14 md:px-10">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white md:text-4xl">
          How It Works
        </h2>

        <div className="mt-10 flex flex-col items-center gap-7 md:flex-row md:items-stretch md:justify-between md:gap-8">
          <HowStep icon={Car} title="Enter Car Details" desc="Fill in year, mileage & type" />

          <div className="flex flex-col items-center justify-center md:py-6">
            <ArrowRight
              size={20}
              className="text-indigo-200 rotate-90 md:rotate-0"
              aria-hidden="true"
            />
            <div className="mt-3 hidden h-px w-16 md:block bg-gradient-to-r from-indigo-200/70 to-fuchsia-200/70" />
          </div>

          <HowStep
            icon={Brain}
            title="AI Model Analyzes Data"
            desc="Processes your car’s data instantly"
          />

          <div className="flex flex-col items-center justify-center md:py-6">
            <ArrowRight
              size={20}
              className="text-indigo-200 rotate-90 md:rotate-0"
              aria-hidden="true"
            />
            <div className="mt-3 hidden h-px w-16 md:block bg-gradient-to-r from-indigo-200/70 to-fuchsia-200/70" />
          </div>

          <HowStep
            icon={BarChart2}
            title="Get Instant Price Estimate"
            desc="Receive your price quote in seconds"
          />
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
        <Feature
          icon={Sparkles}
          title="Professional UI"
          desc="Glass cards, gradients, and consistent spacing/typography—like modern websites."
        />
        <Feature
          icon={ShieldCheck}
          title="Reliable API"
          desc="FastAPI endpoint loads your saved model and returns a clean JSON response."
        />
        <Feature
          icon={Zap}
          title="Smooth effects"
          desc="Subtle motion, hover states, and animated result presentation."
        />
      </section>
    </PageShell>
  )
}

