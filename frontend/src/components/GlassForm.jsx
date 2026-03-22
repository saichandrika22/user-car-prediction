import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car as CarIcon, Calendar, Gauge, Fuel, Users, Settings, TrendingUp } from 'lucide-react'
import { fetchBrands, fetchBrandAveragePrice } from '../lib/api.js'

const inputVariants = {
  focus: {
    scale: 1.02,
    borderColor: 'rgba(147, 51, 234, 0.5)',
    boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)',
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
    boxShadow: '0 10px 40px rgba(147, 51, 234, 0.4)',
  },
  tap: {
    scale: 0.98,
  },
}

export function GlassForm({ form, onChange, onSubmit, loading, error }) {
  const [brands, setBrands] = useState([])
  const [loadingBrands, setLoadingBrands] = useState(false)
  const [brandAveragePrice, setBrandAveragePrice] = useState(null)
  const [loadingBrandPrice, setLoadingBrandPrice] = useState(false)

  // Fetch brands on component mount
  useEffect(() => {
    const loadBrands = async () => {
      setLoadingBrands(true)
      try {
        const brandsData = await fetchBrands()
        setBrands(brandsData.slice(0, 20)) // Top 20 brands
      } catch (err) {
        console.error('Failed to fetch brands:', err)
      } finally {
        setLoadingBrands(false)
      }
    }
    loadBrands()
  }, [])

  // Fetch average price when brand changes
  useEffect(() => {
    if (form.brand) {
      const loadBrandPrice = async () => {
        setLoadingBrandPrice(true)
        try {
          const priceData = await fetchBrandAveragePrice(form.brand)
          setBrandAveragePrice(priceData)
        } catch (err) {
          console.error('Failed to fetch brand price:', err)
          setBrandAveragePrice(null)
        } finally {
          setLoadingBrandPrice(false)
        }
      }
      loadBrandPrice()
    } else {
      setBrandAveragePrice(null)
    }
  }, [form.brand])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  const updateForm = (field, value) => {
    onChange({ ...form, [field]: value })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-sm"></div>
        
        <form onSubmit={handleSubmit} className="relative p-8 space-y-6">
          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
              <CarIcon size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Enter Car Details</h2>
            <p className="text-gray-300">Fill in the information to get your estimate</p>
          </motion.div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand Selection */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <CarIcon size={16} className="inline mr-2" />
                Car Brand
              </label>
              <select
                value={form.brand || ''}
                onChange={(e) => updateForm('brand', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
              >
                <option value="" className="bg-gray-900">Select a brand</option>
                {loadingBrands ? (
                  <option value="" className="bg-gray-900">Loading brands...</option>
                ) : (
                  brands.map((brand) => (
                    <option key={brand.brand} value={brand.brand} className="bg-gray-900">
                      {brand.brand} ({brand.models_count} models)
                    </option>
                  ))
                )}
              </select>
            </motion.div>

            {/* Year Input */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Year
              </label>
              <input
                type="number"
                min="1995"
                max="2026"
                value={form.year}
                onChange={(e) => updateForm('year', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                placeholder="2020"
              />
            </motion.div>

            {/* Kilometers Driven */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Gauge size={16} className="inline mr-2" />
                Kilometers Driven
              </label>
              <input
                type="number"
                min="0"
                value={form.km_driven}
                onChange={(e) => updateForm('km_driven', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                placeholder="45000"
              />
            </motion.div>

            {/* Fuel Type */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Fuel size={16} className="inline mr-2" />
                Fuel Type
              </label>
              <select
                value={form.fuel}
                onChange={(e) => updateForm('fuel', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
              >
                <option value="Petrol" className="bg-gray-900">Petrol</option>
                <option value="Diesel" className="bg-gray-900">Diesel</option>
                <option value="CNG" className="bg-gray-900">CNG</option>
                <option value="LPG" className="bg-gray-900">LPG</option>
              </select>
            </motion.div>

            {/* Seller Type */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Users size={16} className="inline mr-2" />
                Seller Type
              </label>
              <select
                value={form.seller_type}
                onChange={(e) => updateForm('seller_type', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
              >
                <option value="Dealer" className="bg-gray-900">Dealer</option>
                <option value="Individual" className="bg-gray-900">Individual</option>
                <option value="Trustmark Dealer" className="bg-gray-900">Trustmark Dealer</option>
              </select>
            </motion.div>

            {/* Transmission */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Settings size={16} className="inline mr-2" />
                Transmission
              </label>
              <select
                value={form.transmission}
                onChange={(e) => updateForm('transmission', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
              >
                <option value="Manual" className="bg-gray-900">Manual</option>
                <option value="Automatic" className="bg-gray-900">Automatic</option>
              </select>
            </motion.div>

            {/* Owner */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Users size={16} className="inline mr-2" />
                Owner
              </label>
              <select
                value={form.owner}
                onChange={(e) => updateForm('owner', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 transition-all duration-300"
              >
                <option value="First Owner" className="bg-gray-900">First Owner</option>
                <option value="Second Owner" className="bg-gray-900">Second Owner</option>
                <option value="Third Owner" className="bg-gray-900">Third Owner</option>
                <option value="Fourth & Above Owner" className="bg-gray-900">Fourth & Above Owner</option>
                <option value="Test Drive Car" className="bg-gray-900">Test Drive Car</option>
              </select>
            </motion.div>
          </div>

          {/* Average Price Display */}
          <AnimatePresence>
            {brandAveragePrice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white mb-1">
                      {brandAveragePrice.brand} Average Price
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span>Average: <span className="text-white font-medium">{formatPrice(brandAveragePrice.average_price)}</span></span>
                      <span>Range: <span className="text-blue-300">{formatPrice(brandAveragePrice.min_price)}</span> - <span className="text-purple-300">{formatPrice(brandAveragePrice.max_price)}</span></span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Based on {brandAveragePrice.sample_size} cars in dataset
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 text-sm"
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
            className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Calculating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Check Price
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
