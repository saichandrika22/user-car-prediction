import { motion } from 'framer-motion'
import { Car, Gauge, Calendar, Fuel, User2, ArrowRightLeft, Coins } from 'lucide-react'

const fuels = ['Petrol', 'Diesel', 'CNG', 'LPG']
const sellerTypes = ['Dealer', 'Individual', 'Trustmark Dealer']
const transmissions = ['Manual', 'Automatic']
const owners = [
  'First Owner',
  'Second Owner',
  'Third Owner',
  'Fourth & Above Owner',
  'Test Drive Car',
]

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-200">
      {children}
    </label>
  )
}

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
        <Icon size={16} />
      </div>
      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-10 py-3 text-slate-100 placeholder:text-slate-500 outline-none ring-0 transition focus:border-white/20 focus:bg-white/10"
      />
    </div>
  )
}

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
        <Icon size={16} />
      </div>
      <select
        {...props}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-10 py-3 text-slate-100 outline-none transition focus:border-white/20 focus:bg-white/10"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.4 7.6a1 1 0 0 1 1.4 0L10 10.8l3.2-3.2a1 1 0 1 1 1.4 1.4l-3.9 3.9a1 1 0 0 1-1.4 0L5.4 9A1 1 0 0 1 5.4 7.6Z" />
        </svg>
      </div>
    </div>
  )
}

export function CarForm({ value, onChange, onSubmit, loading }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      className="space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            icon={Calendar}
            type="number"
            min={1995}
            max={2026}
            value={value.year}
            onChange={(e) => onChange({ ...value, year: Number(e.target.value) })}
            placeholder="e.g. 2016"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="present_price">Present Price</Label>
          <Input
            id="present_price"
            icon={Coins}
            type="number"
            min={0}
            value={value.present_price ?? 0}
            onChange={(e) => onChange({ ...value, present_price: Number(e.target.value) })}
            placeholder="e.g. 30000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="km_driven">Kms driven</Label>
          <Input
            id="km_driven"
            icon={Gauge}
            type="number"
            min={0}
            value={value.km_driven}
            onChange={(e) => onChange({ ...value, km_driven: Number(e.target.value) })}
            placeholder="e.g. 45000"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fuel">Fuel type</Label>
          <Select
            id="fuel"
            icon={Fuel}
            value={value.fuel}
            onChange={(e) => onChange({ ...value, fuel: e.target.value })}
          >
            {fuels.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="seller_type">Seller type</Label>
          <Select
            id="seller_type"
            icon={User2}
            value={value.seller_type}
            onChange={(e) => onChange({ ...value, seller_type: e.target.value })}
          >
            {sellerTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            id="transmission"
            icon={ArrowRightLeft}
            value={value.transmission}
            onChange={(e) => onChange({ ...value, transmission: e.target.value })}
          >
            {transmissions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner">Owner</Label>
          <Select
            id="owner"
            icon={Car}
            value={value.owner}
            onChange={(e) => onChange({ ...value, owner: e.target.value })}
          >
            {owners.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-[0_12px_40px_rgba(99,102,241,0.25)] transition disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Predicting…' : '🚀 Predict Price'}
        <span className="transition group-hover:translate-x-0.5" aria-hidden="true">
          →
        </span>
      </motion.button>
    </form>
  )
}

