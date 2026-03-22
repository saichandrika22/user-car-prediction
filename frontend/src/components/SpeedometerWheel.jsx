import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const SpeedometerWheel = ({ 
  isOpen, 
  onClose, 
  options, 
  onSelect, 
  selectedValue, 
  title 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const segmentAngle = 360 / options.length
  const centerX = 160
  const centerY = 160
  const radius = 100

  // Calculate rotation angle based on selected index
  const getRotationAngle = (index) => {
    return -(index * segmentAngle) + 90 // Adjust to align with needle at top
  }

  // Get current selected option
  const currentOption = options[selectedIndex] || ''

  // Rotate to next segment (clockwise)
  const rotateNext = () => {
    if (isAnimating || options.length === 0) return
    
    setIsAnimating(true)
    const nextIndex = (selectedIndex + 1) % options.length
    setSelectedIndex(nextIndex)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 400)
  }

  // Rotate to previous segment (counter-clockwise)
  const rotatePrevious = () => {
    if (isAnimating || options.length === 0) return
    
    setIsAnimating(true)
    const prevIndex = (selectedIndex - 1 + options.length) % options.length
    setSelectedIndex(prevIndex)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 400)
  }

  // Handle selection confirmation
  const handleSelect = () => {
    if (currentOption) {
      onSelect(currentOption)
      onClose()
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || isAnimating) return
      
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        rotateNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        rotatePrevious()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleSelect()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isAnimating, options, selectedIndex])

  // Initialize selected index when component opens
  useEffect(() => {
    if (isOpen && options.length > 0) {
      if (selectedValue) {
        const index = options.indexOf(selectedValue)
        setSelectedIndex(index >= 0 ? index : 0)
      } else {
        setSelectedIndex(0)
      }
    }
  }, [isOpen, selectedValue, options])

  // Handle edge cases
  if (options.length === 0) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <div className="relative z-10 text-center p-8">
              <h3 className="text-xl font-bold text-white mb-4">No Data Available</h3>
              <p className="text-gray-300 mb-6">No models found for this brand</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (options.length === 1) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <div className="relative z-10 text-center p-8">
              <h3 className="text-xl font-bold text-white mb-4">Only One Model Available</h3>
              <p className="text-2xl text-red-400 font-bold mb-6">{options[0]}</p>
              <button
                onClick={() => {
                  onSelect(options[0])
                  onClose()
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Select This Model
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  const currentRotation = getRotationAngle(selectedIndex)

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
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Speedometer Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <p className="text-sm text-gray-400">
                Use arrow buttons or keyboard arrows to navigate
              </p>
            </motion.div>

            {/* Wheel Container */}
            <div className="relative w-80 h-80">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 bg-black/40 backdrop-blur-xl" />
              
              {/* SVG Wheel */}
              <svg
                width="320"
                height="320"
                className="absolute inset-0"
              >
                {/* Rotating Wheel Group */}
                <g
                  animate={{
                    rotate: currentRotation,
                  }}
                  transformOrigin={`${centerX} ${centerY}`}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {/* Segment backgrounds */}
                  {options.map((option, index) => {
                    const isSelected = index === selectedIndex
                    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180)
                    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180)
                    
                    const x1 = centerX + radius * Math.cos(startAngle)
                    const y1 = centerY + radius * Math.sin(startAngle)
                    const x2 = centerX + radius * Math.cos(endAngle)
                    const y2 = centerY + radius * Math.sin(endAngle)
                    
                    return (
                      <path
                        key={`segment-${index}`}
                        d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                        fill={isSelected ? 'rgba(220, 38, 38, 0.3)' : 'rgba(255, 255, 255, 0.05)'}
                        stroke={isSelected ? 'rgba(220, 38, 38, 0.8)' : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth="0.5"
                      />
                    )
                  })}
                  
                  {/* Text labels */}
                  {options.map((option, index) => {
                    const isSelected = index === selectedIndex
                    const angle = (index * segmentAngle - 90) * (Math.PI / 180)
                    const textRadius = radius + 25
                    const x = centerX + textRadius * Math.cos(angle)
                    const y = centerY + textRadius * Math.sin(angle)
                    
                    return (
                      <text
                        key={`text-${index}`}
                        x={x}
                        y={y}
                        fill={isSelected ? '#ffffff' : '#9ca3af'}
                        fontSize={isSelected ? '11' : '9'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none"
                      >
                        {option}
                      </text>
                    )
                  })}
                </g>

                {/* Center circle */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="20"
                  fill="rgba(0, 0, 0, 0.9)"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* Current Selection Display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentOption}
              className="mt-8 text-center"
            >
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                {title}
              </div>
              <div className="text-2xl font-bold text-white">
                {currentOption}
              </div>
            </motion.div>

            {/* Arrow Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex items-center gap-6"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={rotatePrevious}
                disabled={isAnimating}
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} className="text-white" />
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={rotateNext}
                disabled={isAnimating}
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} className="text-white" />
              </motion.button>
            </motion.div>

            {/* Select Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelect}
                disabled={!currentOption || isAnimating}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 border border-red-500/50 rounded-xl text-white font-semibold hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select
              </motion.button>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
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

export default SpeedometerWheel
