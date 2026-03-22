import { motion } from 'framer-motion'
import { IndianRupee, Sparkles, ShieldCheck, Star, StarHalf } from 'lucide-react'

function formatINRCompact(value) {
  if (value == null || Number.isNaN(value)) return ''
  const v = Math.max(0, Number(value))
  const formatter = new Intl.NumberFormat('en-IN')

  if (v >= 1e7) {
    const cr = v / 1e7
    const out = cr >= 10 ? cr.toFixed(1) : cr.toFixed(2)
    return `₹${out.replace(/\.0+$/, '')}Cr`
  }
  if (v >= 1e5) {
    const l = v / 1e5
    const out = l >= 10 ? l.toFixed(1) : l.toFixed(2)
    return `₹${out.replace(/\.0+$/, '')}L`
  }
  if (v >= 1e3) {
    const k = v / 1e3
    const out = k.toFixed(1).replace(/\.0+$/, '')
    return `₹${out}K`
  }

  return `₹${formatter.format(Math.round(v))}`
}

function describeBand(value) {
  if (value == null || Number.isNaN(value)) return null
  if (value < 300000) return { label: 'Budget range', tone: 'text-emerald-300' }
  if (value < 800000) return { label: 'Average market range', tone: 'text-sky-300' }
  return { label: 'Premium range', tone: 'text-fuchsia-300' }
}

export function ResultCard({ price, confidenceLower, confidenceUpper, carScore, insights, error }) {
  const hasPrediction = price != null || error
  const hasExtra = carScore != null || (insights && insights.length > 0)
  if (!hasPrediction && !hasExtra) return null

  const band = !error && price != null ? describeBand(price) : null

  const score10 = carScore != null && !Number.isNaN(Number(carScore)) ? (Number(carScore) / 100) * 10 : null
  const rating5 = score10 != null ? Math.max(0, Math.min(5, score10 / 2)) : null

  const fullStars = rating5 != null ? Math.floor(rating5) : 0
  const hasHalfStar = rating5 != null ? rating5 - fullStars >= 0.5 : false

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5 ringed"
    >
      {error ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-200">
            <ShieldCheck size={16} className="text-rose-300" />
            Couldn’t predict right now
          </div>
          <p className="text-sm text-rose-100/80">{error}</p>
        </div>
      ) : price != null ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Sparkles size={16} className="text-fuchsia-300" />
            Estimated selling price
          </div>
          <div className="flex items-baseline gap-2">
            <IndianRupee size={18} className="text-slate-300" />
            <div className="text-3xl font-semibold tracking-tight">
              {formatINRCompact(price)}
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between gap-4 text-xs text-slate-400">
            <p>This is a model estimate.</p>
            {band ? (
              <span className={`ml-auto rounded-full bg-white/5 px-2 py-1 font-medium ${band.tone}`}>
                {band.label}
              </span>
            ) : null}
          </div>

          {confidenceLower != null && confidenceUpper != null && !error ? (
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="text-xs font-semibold text-slate-200">95% confidence range</div>
              <div className="mt-1 text-sm font-semibold tracking-tight text-white">
                {formatINRCompact(confidenceLower)} – {formatINRCompact(confidenceUpper)}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {hasExtra ? (
        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          {carScore != null ? (
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white">Car Score</div>
              <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-1 ring-1 ring-white/10">
                <div className="text-sm font-semibold text-slate-100">
                  {score10 != null ? score10.toFixed(1) : '—'}/10
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const i = idx + 1
                    const filled = i <= fullStars
                    const half = !filled && hasHalfStar && i === fullStars + 1
                    const IconComp = half ? StarHalf : Star
                    const colorClass = filled || half ? 'text-amber-300' : 'text-amber-900/20'
                    return <IconComp key={i} size={16} className={colorClass} />
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {insights && insights.length > 0 ? (
            <div>
              <div className="text-sm font-semibold text-white">AI Insights</div>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {insights.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300/80" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </motion.div>
  )
}

