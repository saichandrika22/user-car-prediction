import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { predictPrice } from '../lib/api.js'
import SpeedometerWheel from '../components/SpeedometerWheel.jsx'
import { Home, Mail } from 'lucide-react'

const brands = [
  'Datsun', 'Hyundai', 'Honda', 'Toyota', 'Tata', 'Mahindra', 'Ford', 'BMW',
  'Audi', 'Maruti', 'Mercedes', 'Nissan', 'Renault', 'Volkswagen', 'Skoda', 'Chevrolet'
]

const brandModels = {
  'Maruti': ['800 AC', 'Wagon R LXI', 'Alto LX BSIII', 'Swift', 'Dzire', 'Baleno', 'Vitara Brezza'],
  'Hyundai': ['Verna 1.6 SX', 'Xcent 1.2 Kappa S', 'i20', 'i10', 'Elite i20', 'Creta', 'Venue'],
  'Honda': ['Amaze VX i-DTEC', 'City', 'Jazz', 'WR-V', 'BR-V', 'CR-V', 'Civic'],
  'Toyota': ['Innova', 'Fortuner', 'Camry', 'Corolla', 'Etios', 'Yaris', 'Glanza'],
  'Tata': ['Nexon', 'Harrier', 'Safari', 'Tiago', 'Tigor', 'Altroz', 'Punch'],
  'Mahindra': ['Scorpio', 'XUV500', 'XUV300', 'Thar', 'Bolero', 'Marazzo', 'XUV700'],
  'Datsun': ['RediGO T Option', 'GO', 'GO+'],
  'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire', 'Mustang'],
  'Nissan': ['Micra', 'Sunny', 'Kicks', 'Magnite'],
  'Renault': ['Kwid', 'Duster', 'Triber', 'Kiger'],
  'Volkswagen': ['Polo', 'Vento', 'Ameo', 'Tiguan', 'Passat'],
  'Skoda': ['Rapid', 'Octavia', 'Superb', 'Kodiaq', 'Kushaq'],
  'Chevrolet': ['Beat', 'Sail', 'Enjoy', 'Tavera', 'Trailblazer'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE'],
  'BMW': ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5'],
  'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7']
}

const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric']
const sellerTypes = ['Individual', 'Dealer', 'Trustmark Dealer']
const transmissions = ['Manual', 'Automatic']
const owners = ['First Owner', 'Second Owner', 'Third Owner', 'Fourth & Above Owner']

export default function PredictPage() {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    km_driven: '',
    fuel: 'Petrol',
    seller_type: 'Individual',
    transmission: 'Manual',
    owner: 'First Owner'
  })
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [activeSelector, setActiveSelector] = useState(null)
  const [noModelsMessage, setNoModelsMessage] = useState('')

  const handlePredict = async () => {
    if (!form.brand || !form.model) {
      setError('Please select both brand and model')
      return
    }

    if (!form.year || !form.km_driven) {
      setError('Please enter year and kilometers driven')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await predictPrice({
        ...form,
        year: parseInt(form.year),
        km_driven: parseInt(form.km_driven)
      })
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const getSelectorOptions = (type) => {
    switch (type) {
      case 'brand': return brands
      case 'model': {
        if (!form.brand) return []
        const models = brandModels[form.brand] || []
        if (models.length === 0) {
          setNoModelsMessage(`No data available for ${form.brand}`)
          setTimeout(() => setNoModelsMessage(''), 3000)
          return []
        }
        return models
      }
      case 'fuel': return fuelTypes
      case 'seller_type': return sellerTypes
      case 'transmission': return transmissions
      case 'owner': return owners
      default: return []
    }
  }

  const handleSelect = (type, value) => {
    setForm(prev => {
      const newForm = { ...prev, [type]: value }
      // Reset model when brand changes
      if (type === 'brand') {
        newForm.model = ''
        setNoModelsMessage('') // Clear any previous no models message
      }
      return newForm
    })
  }

  const handleModelButtonClick = () => {
    if (!form.brand) return
    
    const models = brandModels[form.brand] || []
    if (models.length === 0) {
      setNoModelsMessage(`No data available for ${form.brand}`)
      setTimeout(() => setNoModelsMessage(''), 3000)
      return
    }
    
    setActiveSelector('model')
  }

  const wheelButtons = [
    { key: 'brand', label: 'Brand', value: form.brand },
    { key: 'model', label: 'Model', value: form.model, disabled: !form.brand, placeholder: !form.brand ? 'Select Brand first' : 'Select' },
    { key: 'fuel', label: 'Fuel', value: form.fuel },
    { key: 'seller_type', label: 'Seller', value: form.seller_type },
    { key: 'transmission', label: 'Transmission', value: form.transmission },
    { key: 'owner', label: 'Owner', value: form.owner }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [null, -300],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Automotive-Themed Background - Random Rolling Tires */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Tire 1 - Rolling Right (Bottom) */}
        <motion.div
          className="absolute opacity-8"
          style={{ bottom: '8%', left: '-80px' }}
          animate={{
            x: ['0px', 'calc(100vw + 160px)'],
            rotate: [0, 720],
            y: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
            y: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" className="filter blur-sm">
            <circle cx="35" cy="35" r="30" stroke="currentColor" strokeWidth="7" className="text-gray-600" />
            <circle cx="35" cy="35" r="22" stroke="currentColor" strokeWidth="5" className="text-gray-500" />
            <circle cx="35" cy="35" r="13" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            {[...Array(9)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 40} 35 35)`}>
                <rect x="33" y="5" width="4" height="9" fill="currentColor" className="text-gray-500" />
                <rect x="33" y="56" width="4" height="9" fill="currentColor" className="text-gray-500" />
              </g>
            ))}
            <circle cx="35" cy="35" r="5" fill="currentColor" className="text-gray-400" />
          </svg>
        </motion.div>

        {/* Tire 2 - Rolling Left (Top) */}
        <motion.div
          className="absolute opacity-6"
          style={{ top: '12%', right: '-80px' }}
          animate={{
            x: ['0px', 'calc(-100vw - 160px)'],
            rotate: [0, -640],
            y: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
            delay: 3,
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }
          }}
        >
          <svg width="55" height="55" viewBox="0 0 55 55" fill="none" className="filter blur-sm">
            <circle cx="27.5" cy="27.5" r="23" stroke="currentColor" strokeWidth="5" className="text-gray-500" />
            <circle cx="27.5" cy="27.5" r="16" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            <circle cx="27.5" cy="27.5" r="9" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
            {[...Array(8)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 45} 27.5 27.5)`}>
                <rect x="25.5" y="4" width="4" height="7" fill="currentColor" className="text-gray-400" />
                <rect x="25.5" y="44" width="4" height="7" fill="currentColor" className="text-gray-400" />
              </g>
            ))}
            <circle cx="27.5" cy="27.5" r="3" fill="currentColor" className="text-gray-300" />
          </svg>
        </motion.div>

        {/* Tire 3 - Rolling Right Diagonal (Mid) */}
        <motion.div
          className="absolute opacity-7"
          style={{ top: '45%', left: '-100px' }}
          animate={{
            x: ['0px', 'calc(100vw + 200px)'],
            y: ['0px', '60px'],
            rotate: [0, 560],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'linear',
            delay: 7,
          }}
        >
          <svg width="75" height="75" viewBox="0 0 75 75" fill="none" className="filter blur-sm">
            <circle cx="37.5" cy="37.5" r="32" stroke="currentColor" strokeWidth="7" className="text-gray-600" />
            <circle cx="37.5" cy="37.5" r="24" stroke="currentColor" strokeWidth="5" className="text-gray-500" />
            <circle cx="37.5" cy="37.5" r="14" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            {[...Array(10)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 36} 37.5 37.5)`}>
                <rect x="35.5" y="5" width="4" height="10" fill="currentColor" className="text-gray-500" />
                <rect x="35.5" y="60" width="4" height="10" fill="currentColor" className="text-gray-500" />
              </g>
            ))}
            <circle cx="37.5" cy="37.5" r="5" fill="currentColor" className="text-gray-400" />
          </svg>
        </motion.div>

        {/* Tire 4 - Rolling Left Diagonal (Lower) */}
        <motion.div
          className="absolute opacity-5"
          style={{ bottom: '35%', right: '-100px' }}
          animate={{
            x: ['0px', 'calc(-100vw - 200px)'],
            y: ['0px', '-40px'],
            rotate: [0, -480],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'linear',
            delay: 12,
          }}
        >
          <svg width="65" height="65" viewBox="0 0 65 65" fill="none" className="filter blur-sm">
            <circle cx="32.5" cy="32.5" r="28" stroke="currentColor" strokeWidth="6" className="text-gray-500" />
            <circle cx="32.5" cy="32.5" r="20" stroke="currentColor" strokeWidth="4" className="text-gray-400" />
            <circle cx="32.5" cy="32.5" r="12" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
            {[...Array(8)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 45} 32.5 32.5)`}>
                <rect x="30.5" y="4" width="4" height="8" fill="currentColor" className="text-gray-400" />
                <rect x="30.5" y="53" width="4" height="8" fill="currentColor" className="text-gray-400" />
              </g>
            ))}
            <circle cx="32.5" cy="32.5" r="4" fill="currentColor" className="text-gray-300" />
          </svg>
        </motion.div>

        {/* Tire 5 - Rolling Up-Right (Upper) */}
        <motion.div
          className="absolute opacity-6"
          style={{ bottom: '-50px', left: '20%' }}
          animate={{
            x: ['0px', '200px'],
            y: ['0px', 'calc(-100vh - 100px)'],
            rotate: [0, 400],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
            delay: 5,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="filter blur-sm">
            <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="6" className="text-gray-500" />
            <circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="4" className="text-gray-400" />
            <circle cx="30" cy="30" r="10" stroke="currentColor" strokeWidth="2" className="text-gray-300" />
            {[...Array(8)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 45} 30 30)`}>
                <rect x="28" y="5" width="4" height="8" fill="currentColor" className="text-gray-400" />
                <rect x="28" y="47" width="4" height="8" fill="currentColor" className="text-gray-400" />
              </g>
            ))}
            <circle cx="30" cy="30" r="4" fill="currentColor" className="text-gray-300" />
          </svg>
        </motion.div>

        {/* Tire 6 - Rolling Down-Left (Upper Right) */}
        <motion.div
          className="absolute opacity-7"
          style={{ top: '-50px', right: '30%' }}
          animate={{
            x: ['0px', '-150px'],
            y: ['0px', 'calc(100vh + 100px)'],
            rotate: [0, -360],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: 'linear',
            delay: 9,
          }}
        >
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="filter blur-sm">
            <circle cx="34" cy="34" r="29" stroke="currentColor" strokeWidth="6" className="text-gray-600" />
            <circle cx="34" cy="34" r="21" stroke="currentColor" strokeWidth="4" className="text-gray-500" />
            <circle cx="34" cy="34" r="12" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
            {[...Array(9)].map((_, j) => (
              <g key={j} transform={`rotate(${j * 40} 34 34)`}>
                <rect x="32" y="5" width="4" height="9" fill="currentColor" className="text-gray-500" />
                <rect x="32" y="54" width="4" height="9" fill="currentColor" className="text-gray-500" />
              </g>
            ))}
            <circle cx="34" cy="34" r="4" fill="currentColor" className="text-gray-400" />
          </svg>
        </motion.div>
      </div>

      {/* Navigation Header */}
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
                to="/contact"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-lg"
              >
                <Mail size={16} />
                <span>Contact</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Car Value Predictor
            </h1>
            <p className="text-xl text-gray-300">
              Professional AI-powered valuation in seconds
            </p>
          </motion.div>

          {/* Selection Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8"
          >
            {wheelButtons.map((field, index) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.08 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  z: 50,
                  boxShadow: field.value 
                    ? '0 20px 60px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)' 
                    : '0 20px 60px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (field.disabled) return
                  if (field.key === 'model') {
                    handleModelButtonClick()
                  } else {
                    setActiveSelector(field.key)
                  }
                }}
                disabled={field.disabled}
                className={`
                  relative group cursor-pointer overflow-hidden
                  ${field.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer'
                  }
                `}
              >
                {/* Card Background with Glassmorphism */}
                <div className={`
                  relative p-6 rounded-3xl backdrop-blur-xl border-2 transition-all duration-300
                  ${field.value 
                    ? 'bg-gradient-to-br from-red-600/20 to-orange-600/20 border-red-500/50' 
                    : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                  }
                `}>
                  {/* Light Sweep Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Radial Glow Behind Card */}
                  <div className={`
                    absolute -inset-1 rounded-3xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100
                    ${field.value 
                      ? 'bg-gradient-to-r from-red-600/30 to-orange-600/30' 
                      : 'bg-white/10'
                    }
                  `} />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">
                      {field.label}
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {field.value || field.placeholder || 'Select'}
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {field.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/50"
                    />
                  )}

                  {/* Inner Shine Effect */}
                  {field.value && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Numeric Input Fields */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm({...form, year: e.target.value})}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:border-red-500/50 focus:bg-white/15 transition-all"
                placeholder="Enter Year (e.g., 2017)"
                min="1990"
                max={new Date().getFullYear()}
              />
              <div className="absolute -top-3 left-6 px-2 bg-black text-xs text-gray-400">
                Year
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                value={form.km_driven}
                onChange={(e) => setForm({...form, km_driven: e.target.value})}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:border-red-500/50 focus:bg-white/15 transition-all"
                placeholder="Enter Kilometers Driven (e.g., 46000)"
                min="0"
              />
              <div className="absolute -top-3 left-6 px-2 bg-black text-xs text-gray-400">
                Kilometers Driven
              </div>
            </div>
          </motion.div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl max-w-md mx-auto text-center"
              >
                <p className="text-red-300 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Models Message */}
          <AnimatePresence>
            {noModelsMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl max-w-md mx-auto text-center"
              >
                <p className="text-orange-300 text-sm">{noModelsMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Predict Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 60px rgba(220, 38, 38, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePredict}
              disabled={loading}
              className="relative px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">
                {loading ? 'Calculating...' : 'Get Valuation'}
              </span>
            </motion.button>
          </motion.div>

          {/* Result Display */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                className="mt-12"
              >
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 rounded-3xl blur opacity-40 animate-pulse" />
                  <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl border border-white/20 p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Estimated Value</h3>
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                      {formatPrice(result.price)}
                    </div>
                    <div className="text-gray-300">
                      <p className="text-sm mb-1">Confidence Range</p>
                      <p className="text-lg">
                        {formatPrice(result.confidenceLower)} - {formatPrice(result.confidenceUpper)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Speedometer Wheels */}
      {wheelButtons.map(field => (
        <SpeedometerWheel
          key={field.key}
          isOpen={activeSelector === field.key}
          onClose={() => setActiveSelector(null)}
          options={getSelectorOptions(field.key)}
          onSelect={(value) => handleSelect(field.key, value)}
          selectedValue={field.value}
          title={field.label}
        />
      ))}
    </div>
  )
}

