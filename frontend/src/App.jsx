import { useState } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from "./components/Intro.jsx";
import LuxuryHomePage from "./pages/LuxuryHomePage.jsx";
import PredictPage from "./pages/PredictPage.jsx";
import LuxuryContactPage from "./pages/LuxuryContactPage.jsx";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Pro-level Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <Intro onFinish={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main Application - appears after intro */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PageTransition>
              <Routes>
                <Route path="/" element={<LuxuryHomePage />} />
                <Route path="/predict" element={<PredictPage />} />
                <Route path="/contact" element={<LuxuryContactPage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
