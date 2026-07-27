import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HandCoins,
  CalendarDays,
  Images,
  Receipt,
  Users,
  GalleryHorizontalEnd,
  Megaphone,
  Info,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const CARDS = [
  { key: 'donations', label: 'Donations', desc: 'Track contributions & receipts', icon: HandCoins, to: '/donations', gradient: 'from-orange-500 to-amber-500' },
  { key: 'events', label: 'Events', desc: 'Plan the festival schedule', icon: CalendarDays, to: '/events', gradient: 'from-rose-500 to-orange-500' },
  { key: 'images', label: 'Images', desc: 'Upload festival moments', icon: Images, to: '/gallery', gradient: 'from-amber-500 to-yellow-500' },
  { key: 'expenses', label: 'Expenses', desc: 'Monitor committee spends', icon: Receipt, to: '/donations', gradient: 'from-red-500 to-rose-600' },
  { key: 'volunteers', label: 'Volunteers', desc: 'Coordinate helping hands', icon: Users, to: '/events', gradient: 'from-orange-600 to-red-500' },
  { key: 'gallery', label: 'Gallery', desc: 'Browse past celebrations', icon: GalleryHorizontalEnd, to: '/gallery', gradient: 'from-yellow-500 to-orange-500' },
  { key: 'announcements', label: 'Announcements', desc: 'Share updates with everyone', icon: Megaphone, to: '/events', gradient: 'from-amber-600 to-red-600' },
  { key: 'about', label: 'About Festival', desc: 'Story & significance', icon: Info, to: '/', gradient: 'from-red-600 to-maroon-600' },
]

// How many cards are visible at once, per breakpoint (matches the CSS below)
const VISIBLE = 4

export default function DashboardCarousel() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const timer = useRef(null)
  const paused = useRef(false)

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % CARDS.length)
    }, 3500)
    return () => clearInterval(timer.current)
  }, [])

  const next = () => setIndex((i) => (i + 1) % CARDS.length)
  const prev = () => setIndex((i) => (i - 1 + CARDS.length) % CARDS.length)

  // Build a looping visible window of cards starting at `index`
  const visibleCards = Array.from({ length: VISIBLE }, (_, i) => CARDS[(index + i) % CARDS.length])

  return (
    <div
      className="relative"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-maroon-700 dark:text-orange-200">
          Committee Dashboard
        </h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-white dark:bg-stone-800 shadow-card hover:bg-orange-100 dark:hover:bg-stone-700 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="text-saffron-600" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-white dark:bg-stone-800 shadow-card hover:bg-orange-100 dark:hover:bg-stone-700 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} className="text-saffron-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {visibleCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.button
                key={`${card.key}-${index}-${i}`}
                onClick={() => navigate(card.to)}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left rounded-3xl p-6 bg-gradient-to-br ${card.gradient} text-white shadow-card hover:shadow-glow transition-shadow relative overflow-hidden group`}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />
                <Icon size={34} className="mb-4 drop-shadow" />
                <h3 className="font-display font-bold text-lg mb-1">{card.label}</h3>
                <p className="text-sm text-white/85">{card.desc}</p>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-1.5 mt-5">
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-saffron-600' : 'w-1.5 bg-orange-200 dark:bg-stone-700'
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
