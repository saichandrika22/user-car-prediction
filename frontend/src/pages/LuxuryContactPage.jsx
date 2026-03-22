import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendContactMessage } from '../lib/api.js'
import { Home, Calculator } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1 },
}

const inputVariants = {
  focus: {
    scale: 1.02,
    borderColor: 'rgba(220, 38, 38, 0.5)',
    boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)',
  },
  blur: {
    scale: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'none',
  },
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 20px 60px rgba(220, 38, 38, 0.4)',
    backgroundColor: '#991B1B',
  },
  tap: {
    scale: 0.98,
  },
}

export default function LuxuryContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await sendContactMessage(form)
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [null, -80],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Luxury Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-lg border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <img 
                src="/steering.png" 
                alt="AutoVal Pro" 
                className="w-8 h-8 object-contain filter brightness-0 invert"
              />
              <span className="text-xl font-bold text-white tracking-wide">
                AutoVal Pro
              </span>
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg"
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
              <Link
                to="/predict"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg"
              >
                <Calculator size={16} />
                <span>Predict</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative pt-16 min-h-screen flex items-center justify-center px-4">
        {/* Car Background Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute left-0 top-32 w-80 h-48"
        >
          <svg viewBox="0 0 400 200" fill="none">
            <path d="M50 100 L100 80 L150 70 L200 75 L250 85 L300 100 L350 120" stroke="#DC2626" strokeWidth="2" fill="none" opacity="0.3"/>
            <path d="M80 100 L120 90 L160 85 L200 88 L240 95 L280 105 L320 115" stroke="#DC2626" strokeWidth="3" fill="none"/>
            <circle cx="120" cy="90" r="12" fill="#1F2937" opacity="0.5"/>
            <circle cx="280" cy="105" r="12" fill="#1F2937" opacity="0.5"/>
            <rect x="150" y="75" width="100" height="25" fill="#DC2626" rx="3" opacity="0.4"/>
          </svg>
        </motion.div>

        <div className="max-w-4xl w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.2 } } }}
            className="text-center mb-16"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Get in</span>
              <br />
              <span className="text-red-500">Touch</span>
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Have questions about our valuation service? We're here to help you get the most accurate assessment for your vehicle.
            </motion.p>
          </motion.div>

          {!submitted ? (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.3 }}
            >
              {/* Luxury Contact Card */}
              <div className="relative backdrop-blur-2xl bg-black/30 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
                {/* Red Accent Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-3xl"></div>
                
                <form onSubmit={handleSubmit} className="relative p-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Input */}
                    <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
                      <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        required
                        className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
                      <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        required
                        className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  {/* Message Input */}
                  <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => updateForm('message', e.target.value)}
                      required
                      rows={6}
                      className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all duration-300 text-lg resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </motion.div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-600/20 border border-red-600/50 rounded-xl p-4 text-red-300 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xl rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        Send Message
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"/>
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
              <p className="text-xl text-gray-300 mb-8">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                Back to Home
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 5L15 10L10 15M5 10H15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
