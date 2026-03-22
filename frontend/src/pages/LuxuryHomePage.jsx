import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function LuxuryHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, -100],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-8"
            >
              <Link to="/" className="text-white hover:text-red-500 transition-colors">Home</Link>
              <Link to="/predict" className="text-white hover:text-red-500 transition-colors">Predict</Link>
              <Link to="/contact" className="text-gray-300 hover:text-red-500 transition-colors">Contact</Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content - Poster Style Layout */}
      <main className="relative pt-16">
        {/* Hero Section - Split Screen Layout */}
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* LEFT SIDE - Text Content */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.2 } } }}
              className="flex-1 text-center lg:text-left lg:pr-8"
            >
              <motion.h1
                variants={fadeUp}
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              >
                <span className="text-white">Know Your</span>
                <br />
                <span className="text-red-500">Car's Value</span>
              </motion.h1>
              
              <motion.p
                variants={fadeUp}
                className="text-2xl md:text-3xl text-red-400 font-semibold mb-6"
              >
                Instant Professional Valuation
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
              >
                Get accurate, instant estimates for your used car with our advanced AI-powered valuation system. Professional results in seconds.
              </motion.p>

              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/predict"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-red-600/50"
                >
                  Check Price
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE - Car Image with Circular Design */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="flex-1 relative flex items-center justify-center lg:justify-end"
            >
              {/* Circular Ring Design */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] border-8 border-red-600/30 rounded-full"
              />
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 border-4 border-red-500/50 rounded-full"
              />

              {/* Car Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="relative z-10 w-64 md:w-80 lg:w-96"
              >
                <img
                  src="/homecar.png"
                  alt="Luxury Car"
                  className="w-full h-auto object-contain filter drop-shadow-2xl"
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    e.target.src = '/car.svg'; // Fallback to SVG
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
