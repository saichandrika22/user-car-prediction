import { motion } from 'framer-motion'

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const glowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

export function PremiumResult({ result }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const confidenceRange = result.confidenceUpper - result.confidenceLower
  const confidencePercentage = ((result.confidenceLower / result.price) * 100).toFixed(0)

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Luxury Glow Effect */}
      <motion.div
        variants={glowVariants}
        className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-3xl blur-xl opacity-40"
      />

      {/* Main Result Card */}
      <motion.div
        variants={itemVariants}
        className="relative backdrop-blur-2xl bg-black/40 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden"
      >
        {/* Red Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-gray-900/50 to-black/40"></div>
        
        <div className="relative p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-8"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 8L32 18L40 12L36 24L48 28L36 32L40 44L32 38L24 48L16 38L8 44L12 32L0 28L12 24L8 12L16 18L24 8Z" fill="white"/>
            </svg>
          </motion.div>

          {/* Main Price Display */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="text-sm text-gray-400 mb-3 uppercase tracking-widest">Estimated Value</div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
              className="text-6xl md:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                {formatPrice(result.price)}
              </span>
            </motion.div>
          </motion.div>

          {/* Confidence Range */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8L10 2Z" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <span className="uppercase tracking-wider">Confidence Range</span>
            </div>
            <div className="flex items-center justify-center gap-6 text-xl">
              <span className="text-red-400 font-semibold">{formatPrice(result.confidenceLower)}</span>
              <span className="text-gray-500">to</span>
              <span className="text-red-400 font-semibold">{formatPrice(result.confidenceUpper)}</span>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Range Width: {formatPrice(confidenceRange)}
            </div>
          </motion.div>

          {/* Premium Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="backdrop-blur-sm bg-black/40 rounded-xl p-6 border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z" fill="white"/>
                </svg>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Market Position</div>
              <div className="text-xl font-bold text-white">Premium</div>
            </div>
            
            <div className="backdrop-blur-sm bg-black/40 rounded-xl p-6 border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Confidence</div>
              <div className="text-xl font-bold text-white">{confidencePercentage}%</div>
            </div>
            
            <div className="backdrop-blur-sm bg-black/40 rounded-xl p-6 border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11L12 14L22 4" stroke="white" strokeWidth="2"/>
                  <path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Accuracy</div>
              <div className="text-xl font-bold text-white">Excellent</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Particles Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute -top-10 -left-10 w-32 h-32"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
