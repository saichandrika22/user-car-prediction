import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Target, Sparkles } from 'lucide-react'

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
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
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
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}

export function ResultDisplay({ result }) {
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
      {/* Glow Effect */}
      <motion.div
        variants={glowVariants}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30"
      />

      {/* Main Result Card */}
      <motion.div
        variants={itemVariants}
        className="relative backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        
        <div className="relative p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6"
          >
            <TrendingUp size={40} className="text-white" />
          </motion.div>

          {/* Main Price Display */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <div className="text-sm text-gray-300 mb-2 uppercase tracking-wider">Estimated Value</div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
              className="text-5xl md:text-6xl font-bold"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {formatPrice(result.price)}
              </span>
            </motion.div>
          </motion.div>

          {/* Confidence Range */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-3">
              <Target size={16} />
              <span>Confidence Range</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className="text-blue-300">{formatPrice(result.confidenceLower)}</span>
              <span className="text-gray-400">to</span>
              <span className="text-purple-300">{formatPrice(result.confidenceUpper)}</span>
            </div>
            <div className="mt-3 text-sm text-gray-400">
              Range: {formatPrice(confidenceRange)}
            </div>
          </motion.div>

          {/* Additional Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <DollarSign size={20} className="text-green-400 mx-auto mb-2" />
              <div className="text-xs text-gray-400">Market Value</div>
              <div className="text-lg font-semibold text-white">Excellent</div>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <Sparkles size={20} className="text-yellow-400 mx-auto mb-2" />
              <div className="text-xs text-gray-400">Confidence</div>
              <div className="text-lg font-semibold text-white">{confidencePercentage}%</div>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
              <TrendingUp size={20} className="text-blue-400 mx-auto mb-2" />
              <div className="text-xs text-gray-400">Accuracy</div>
              <div className="text-lg font-semibold text-white">High</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Particles Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute -top-10 -left-10 w-20 h-20"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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
