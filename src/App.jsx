import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header.jsx'
import Landing from './pages/Landing.jsx'
import Donations from './pages/Donations.jsx'
import Events from './pages/Events.jsx'
import Gallery from './pages/Gallery.jsx'
import Volunteers from './pages/Volunteers.jsx'
import AboutFestival from './pages/AboutFestival.jsx'
import AccessGate from './components/AccessGate.jsx'
import SplashScreen from './components/IntroSplash.jsx'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-medium',
          style: { borderRadius: '12px' },
          success: { iconTheme: { primary: '#f97316', secondary: '#fff' } },
        }}
      />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
            <Route path="/donations" element={<PageWrapper><AccessGate><Donations /></AccessGate></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
            <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/volunteers" element={<PageWrapper><Volunteers /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutFestival /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="bg-gradient-to-r from-maroon-700 to-saffron-700 text-orange-50 text-center py-6 text-sm">
        🙏 Ganapathi Bappa Morya — Vinayaka Chavithi Committee &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
