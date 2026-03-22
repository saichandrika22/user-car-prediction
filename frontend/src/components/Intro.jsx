import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShow(false);
        onFinish();
      }, 600); // Fade out duration
    }, 2600);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black flex items-center overflow-hidden z-50"
      >
        {/* Particle Trail Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${40 + Math.random() * 20}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0], 
                scale: [0, 1, 0],
                x: [0, -100],
              }}
              transition={{
                duration: 1.5,
                delay: 0.5 + i * 0.1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* ROAD LINE */}
        <div className="absolute bottom-16 w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent">
          {/* Road dash marks */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.3) 50px, rgba(255,255,255,0.3) 100px)",
            }}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Ground shadow */}
        <div className="absolute bottom-12 w-full h-8 bg-gradient-to-t from-black/50 to-transparent blur-sm"></div>

        {/* CAR CONTAINER */}
        <motion.div
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{
            duration: 2.2,
            ease: [0.25, 0.1, 0.25, 1], // smooth professional easing
          }}
          className="absolute bottom-14"
        >
          {/* Car Shadow */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/40 rounded-full blur-md"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />

          {/* CAR IMAGE with tilt and blur effects */}
          <motion.div
            initial={{ scale: 0.9, rotate: 0 }}
            animate={{ 
              scale: 1, 
              rotate: [0, 1.5, -1, 0.5, 0],
            }}
            transition={{
              scale: { duration: 0.3 },
              rotate: { duration: 2.2, ease: "easeInOut" }
            }}
            className="relative"
          >
            {/* Motion blur overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 blur-[1px]"
              animate={{ opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            
            {/* Car SVG */}
            <img 
              src="/car.svg" 
              alt="Luxury Car"
              className="w-28 h-auto drop-shadow-[0_10px_30px_rgba(220,38,38,0.6)]"
            />
          </motion.div>
        </motion.div>

        {/* HEADLIGHT GLOW */}
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "120%", opacity: [0, 0.8, 0.6] }}
          transition={{ duration: 2.2 }}
          className="absolute bottom-14 left-0"
        >
          <div className="w-48 h-12 bg-gradient-to-r from-yellow-200/60 via-yellow-100/40 to-transparent blur-2xl rounded-full transform -translate-x-20 translate-y-2"></div>
        </motion.div>

        {/* TAILLIGHT GLOW (red) */}
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "120%", opacity: [0, 0.4, 0.3] }}
          transition={{ duration: 2.2 }}
          className="absolute bottom-14 left-0"
        >
          <div className="w-20 h-8 bg-gradient-to-l from-red-500/50 via-red-400/30 to-transparent blur-xl rounded-full transform -translate-x-24 translate-y-2"></div>
        </motion.div>

        {/* Speed lines effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`speed-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                top: `${20 + i * 8}%`,
                left: "-100%",
                width: "200px",
              }}
              animate={{ x: ["0vw", "120vw"] }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Ground reflection */}
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "120%", opacity: 0.15 }}
          transition={{ duration: 2.2 }}
          className="absolute bottom-0 left-0 w-32 h-20 bg-gradient-to-t from-red-600/30 to-transparent blur-xl transform scale-y-50"
        />

        {/* Brand name that appears as car passes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-wider"
            style={{
              textShadow: "0 0 40px rgba(220, 38, 38, 0.8)",
            }}
          >
            <span className="text-red-500">Auto</span>Val Pro
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
            className="text-center text-gray-400 mt-2 text-lg tracking-widest uppercase"
          >
            Premium Valuation
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
