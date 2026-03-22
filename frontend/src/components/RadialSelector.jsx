import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const RadialSelector = ({ 
  isOpen, 
  onClose, 
  options, 
  onSelect, 
  selectedValue, 
  title 
}) => {
  const calculatePosition = (index, total) => {
    const angle = (index * 360) / total - 90
    const radius = 120
    const x = Math.cos((angle * Math.PI) / 180) * radius
    const y = Math.sin((angle * Math.PI) / 180) * radius
    return { x, y }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Radial Selector Container */}
          <div className="relative z-10">
            {/* Speedometer Background Arc */}
            <svg className="absolute inset-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none">
              <path
                d="M 40 200 A 120 120 0 1 1 240 200"
                fill="none"
                stroke="rgba(220, 38, 38, 0.1)"
                strokeWidth="2"
              />
              <path
                d="M 40 200 A 120 120 0 1 1 240 200"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Display */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute inset-0 w-32 h-32 bg-black/60 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">{title}</div>
                <div className="text-sm font-bold text-white truncate max-w-24">
                  {selectedValue || 'Select'}
                </div>
              </div>
            </motion.div>

            {/* Options */}
            {options.map((option, index) => {
              const position = calculatePosition(index, options.length)
              const isSelected = selectedValue === option
              
              return (
                <motion.button
                  key={option}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2 + index * 0.05,
                    type: "spring"
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onSelect(option)
                    onClose()
                  }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginLeft: position.x - 40,
                    marginTop: position.y - 40,
                  }}
                  className={`
                    w-20 h-20 rounded-full flex items-center justify-center
                    backdrop-blur-xl border transition-all duration-300
                    ${isSelected 
                      ? 'bg-red-600/30 border-red-500 shadow-lg shadow-red-500/50' 
                      : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-red-500/50'
                    }
                  `}
                >
                  <span className="text-xs font-medium text-white text-center px-1">
                    {option}
                  </span>
                </motion.button>
              )
            })}

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={16} className="text-white" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RadialSelector
