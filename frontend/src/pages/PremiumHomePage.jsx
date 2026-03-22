import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, TrendingUp, Zap, ArrowRight } from 'lucide-react'
import { GlassForm } from '../components/GlassForm.jsx'
import { ResultDisplay } from '../components/ResultDisplay.jsx'
import { predictPrice } from '../lib/api.js'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const slideInLeft = {
  hidden: { x: -200, opacity: 0 },
  show: { x: 0, opacity: 1 },
}

const slideInRight = {
  hidden: { x: 200, opacity: 0 },
  show: { x: 0, opacity: 1 },
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1 },
}

function defaultForm() {
  return {
    brand: '',
    year: 2020,
    present_price: 0,
    km_driven: 45000,
    fuel: 'Petrol',
    seller_type: 'Individual',
    transmission: 'Manual',
    owner: 'First Owner',
  }
}

export default function PremiumHomePage() {
  const [showLanding, setShowLanding] = useState(true)
  const [form, setForm] = useState(defaultForm())
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  async function onPredict() {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await predictPrice(form)
      setResult({
        price: res.predicted_price,
        confidenceLower: res.confidence_lower,
        confidenceUpper: res.confidence_upper,
      })
    } catch (e) {
      setError(e?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Landing Animation */}
      <AnimatePresence>
        {showLanding && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"
          >
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute"
            >
              <motion.div
                animate={{
                  x: [0, 100, 200, 300, 400, 500, 600, 700, 800],
                }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              >
                <Car size={120} className="text-blue-400" />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              >
                CarVal Pro
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-4 text-xl text-gray-300"
              >
                Know Your Car's True Value
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.5 }}
        className="fixed top-0 w-full z-40 bg-white/5 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 4 }}
              className="flex items-center gap-2"
            >
              <Car size={28} className="text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CarVal Pro
              </span>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl w-full">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.2 } } }}
              className="text-center mb-12"
            >
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Know Your Car's
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  True Value
                </span>
              </motion.h1>
              
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                Get an instant estimate in seconds
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex items-center justify-center gap-4 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-400" />
                  <span>Accurate Estimates</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Glassmorphism Prediction Form */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <GlassForm
                form={form}
                onChange={setForm}
                onSubmit={onPredict}
                loading={loading}
                error={error}
              />
            </motion.div>

            {/* Result Display */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12 max-w-2xl mx-auto"
                >
                  <ResultDisplay result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  )
}
