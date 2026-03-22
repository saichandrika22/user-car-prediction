import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { PageShell } from '../components/PageShell.jsx'
import { getApiUrl, sendContactMessage } from '../lib/api.js'
import { useMemo, useState } from 'react'

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      {children}
    </div>
  )
}

export default function ContactPage() {
  const apiUrl = useMemo(() => getApiUrl(), [])
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  return (
    <PageShell>
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-10"
      >
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Contact
        </h1>
        <p className="mt-3 max-w-3xl text-pretty text-sm text-slate-300 md:text-base">
          This is a demo contact page for a professional multi-page website layout. You can connect
          it to email, a database, or a form service later.
        </p>
      </motion.header>

      <div className="grid gap-5 md:grid-cols-5">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card p-6 md:col-span-3"
        >
          <div className="mb-5 text-sm font-semibold text-white">Send a message</div>

          <form
            onSubmit={async (e) => {
              e.preventDefault()
              setLoading(true)
              setError('')
              setResult('')
              try {
                const res = await sendContactMessage({ email, message })
                setResult(res?.status ? 'Message sent successfully.' : 'Message received.')
                setEmail('')
                setMessage('')
              } catch (e2) {
                setError(e2?.message || 'Something went wrong.')
              } finally {
                setLoading(false)
              }
            }}
            className="space-y-5"
          >
            <Field label="Email">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-10 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-white/20 focus:bg-white/10"
                />
              </div>
            </Field>

            <Field label="Message">
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-3 text-slate-400">
                  <MessageSquare size={16} />
                </div>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you'd like to improve…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-10 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-white/20 focus:bg-white/10"
                />
              </div>
            </Field>

            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
              >
                {error}
              </motion.div>
            ) : null}

            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
              >
                {result}
              </motion.div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(99,102,241,0.25)]"
            >
              {loading ? 'Sending…' : 'Send message'}
              <Send size={16} />
            </button>

            <div className="text-xs text-slate-400">
              Calls backend: <span className="font-medium text-slate-200">{apiUrl}/contact</span>
            </div>
          </form>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-5 md:col-span-2"
        >
          <div className="card p-6">
            <div className="text-sm font-semibold text-white">Support</div>
            <p className="mt-2 text-sm text-slate-300">
              For a real deployment, connect this page to your backend and store messages in a DB.
            </p>
          </div>
          <div className="card p-6">
            <div className="text-sm font-semibold text-white">Project info</div>
            <p className="mt-2 text-sm text-slate-300">
              This site is built as a modern multi-page UI for your ML project.
            </p>
          </div>
        </motion.aside>
      </div>
    </PageShell>
  )
}

