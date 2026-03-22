import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchBrands, fetchBrandAveragePrice } from '../lib/api.js'

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

export function PremiumForm({ form, onChange, onSubmit, loading, error }) {
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
        setBrands(brandsData.slice(0, 15)) // Top 15 brands
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
      {/* Luxury Glass Card */}
      <div className="relative backdrop-blur-2xl bg-black/30 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
        {/* Red Accent Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-3xl"></div>
        
        <form onSubmit={handleSubmit} className="relative p-10 space-y-8">
          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl mb-6">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M5 20 L15 15 L25 13 L35 18 L35 25 L25 27 L15 27 L5 25 Z" fill="white"/>
                <circle cx="12" cy="24" r="3" fill="black"/>
                <circle cx="28" cy="24" r="3" fill="black"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Vehicle Details</h2>
            <p className="text-gray-400 text-lg">Enter your car information for precise valuation</p>
          </motion.div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand Selection */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Brand
              </label>
              <select
                value={form.brand || ''}
                onChange={(e) => updateForm('brand', e.target.value)}
                className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
              >
                <option value="" className="bg-gray-900">Select luxury brand</option>
                {loadingBrands ? (
                  <option value="" className="bg-gray-900">Loading brands...</option>
                ) : (
                  brands.map((brand) => (
                    <option key={brand.brand} value={brand.brand} className="bg-gray-900">
                      {brand.brand}
                    </option>
                  ))
                )}
              </select>
            </motion.div>

            {/* Year Input */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Year
              </label>
              <input
                type="number"
                min="1995"
                max="2026"
                value={form.year}
                onChange={(e) => updateForm('year', parseInt(e.target.value))}
                className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
                placeholder="2020"
              />
            </motion.div>

            {/* Kilometers Driven */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Kilometers
              </label>
              <input
                type="number"
                min="0"
                value={form.km_driven}
                onChange={(e) => updateForm('km_driven', parseInt(e.target.value))}
                className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
                placeholder="45000"
              />
            </motion.div>

            {/* Fuel Type */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Fuel Type
              </label>
              <select
                value={form.fuel}
                onChange={(e) => updateForm('fuel', e.target.value)}
                className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
              >
                <option value="Petrol" className="bg-gray-900">Petrol</option>
                <option value="Diesel" className="bg-gray-900">Diesel</option>
                <option value="CNG" className="bg-gray-900">CNG</option>
                <option value="LPG" className="bg-gray-900">LPG</option>
              </select>
            </motion.div>

            {/* Seller Type */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Seller Type
              </label>
              <select
                value={form.seller_type}
                onChange={(e) => updateForm('seller_type', e.target.value)}
                className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
              >
                <option value="Dealer" className="bg-gray-900">Dealer</option>
                <option value="Individual" className="bg-gray-900">Individual</option>
                <option value="Trustmark Dealer" className="bg-gray-900">Trustmark Dealer</option>
              </select>
            </motion.div>

            {/* Transmission */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Transmission
              </label>
              <select
                value={form.transmission}
                onChange={(e) => updateForm('transmission', e.target.value)}
                className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
              >
                <option value="Manual" className="bg-gray-900">Manual</option>
                <option value="Automatic" className="bg-gray-900">Automatic</option>
              </select>
            </motion.div>

            {/* Owner */}
            <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur" className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                Ownership History
              </label>
              <select
                value={form.owner}
                onChange={(e) => updateForm('owner', e.target.value)}
                className="w-full px-6 py-4 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-600 transition-all duration-300 text-lg"
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
                className="backdrop-blur-sm bg-gradient-to-r from-red-600/10 to-gray-900/50 rounded-xl p-6 border border-red-600/20"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3 12L9 6L15 12L21 6" stroke="white" strokeWidth="2"/>
                      <path d="M3 18L9 12L15 18L21 12" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-bold text-white mb-2">
                      {brandAveragePrice.brand} Market Analysis
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Average: </span>
                        <span className="text-white font-semibold">{formatPrice(brandAveragePrice.average_price)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Range: </span>
                        <span className="text-red-400 font-semibold">{formatPrice(brandAveragePrice.min_price)} - {formatPrice(brandAveragePrice.max_price)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Sample: </span>
                        <span className="text-white font-semibold">{brandAveragePrice.sample_size} vehicles</span>
                      </div>
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
                Calculating Value...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                Check Price
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
