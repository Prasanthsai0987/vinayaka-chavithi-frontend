import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, User, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Donations', to: '/donations' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
]

function ModakLogo() {
  // Signature mark: a stylised modak (Ganesh's favourite sweet) rendered in
  // pure SVG so it never needs an external asset.
  return (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6C15 6 8 14 8 24c0 10.5 8.5 18 16 18s16-7.5 16-18C40 14 33 6 24 6Z"
        fill="url(#modak-body)"
      />
      <path d="M24 4c-3 3-3 6 0 8 3-2 3-5 0-8Z" fill="#3f6212" />
      <path d="M14 16c3-6 7-9 10-10 3 1 7 4 10 10-3-2-6.5-3-10-3s-7 1-10 3Z" fill="#fde68a" />
      <defs>
        <linearGradient id="modak-body" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff8ed" />
          <stop offset="1" stopColor="#ffd28a" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { dark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-gradient-to-r from-saffron-600 via-saffron-500 to-maroon-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.5 }}>
                <ModakLogo />
              </motion.div>
              <div className="leading-tight">
                <p className="font-display font-bold text-lg sm:text-xl tracking-wide">
                  Vinayaka Chavithi
                </p>
                <p className="text-[11px] sm:text-xs text-orange-100/90 -mt-0.5">
                  Committee Management
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 rounded-full text-sm font-medium text-orange-50 hover:bg-white/15 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs text-orange-100/90 border-r border-white/25 pr-3">{today}</span>
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {/* <button
                onClick={() => navigate('/')}
                aria-label="Profile"
                className="p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
              >
                <User size={18} />
              </button> */}
            </div>

            <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-saffron-600/95 backdrop-blur text-white shadow-lg"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/15"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 pt-2 pb-1 text-sm text-orange-100">
              <span>{today}</span>
              <button onClick={toggleTheme} className="p-2 rounded-full bg-white/15">
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
