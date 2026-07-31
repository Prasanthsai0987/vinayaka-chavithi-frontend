import { motion } from 'framer-motion'
import {
  Sparkles,
  UtensilsCrossed,
  Gamepad2,
  Users,
  Music,
  MessageSquareQuote,
  Truck,
  HeartHandshake,
  Waves,
  Heart,
} from 'lucide-react'

const WHY_POINTS = [
  {
    icon: Sparkles,
    title: 'Remover of Obstacles',
    text: 'We welcome Lord Ganesha into our homes and town so that every new beginning — a family, a business, a season — starts with his blessing and clears the path ahead.',
  },
  {
    icon: HeartHandshake,
    title: 'Community Togetherness',
    text: 'For nine or more days, neighbours become family. The festival brings every generation together to plan, cook, celebrate and clean up as one community.',
  },
  {
    icon: Heart,
    title: 'Gratitude & Devotion',
    text: 'It is our way of giving thanks — through pooja, food offered to all, and simple acts of service — for the health, harvest and happiness of the year gone by.',
  },
]

const SCHEDULE = [
  {
    day: 'Day 1',
    title: 'Pooja & Games',
    accent: 'from-orange-500 to-amber-500',
    items: [
      { icon: Sparkles, text: 'Ganesh idol pooja and vedic rituals to welcome Lord Ganesha' },
      { icon: UtensilsCrossed, text: 'Annadanam — community food offering, open to all' },
      { icon: Gamepad2, text: 'Games for kids and adults to kick off the celebrations' },
    ],
  },
  {
    day: 'Day 2',
    title: 'Families Together',
    accent: 'from-rose-500 to-orange-500',
    items: [
      { icon: UtensilsCrossed, text: 'Annadanam continues — every family eats together' },
      { icon: Users, text: 'Family get-together party bringing the whole community closer' },
      { icon: Music, text: 'Songs and dance performances by our own committee members' },
      { icon: Gamepad2, text: 'Traditional games (vootielu) for everyone to enjoy' },
      { icon: MessageSquareQuote, text: 'Devotional slogans and chanting for Ganapathi Bappa' },
    ],
  },
  {
    day: 'Day 3',
    title: 'Procession & Nimajjanam',
    accent: 'from-red-600 to-maroon-600',
    items: [
      { icon: UtensilsCrossed, text: 'Annadanam — final day of community feast' },
      { icon: Truck, text: 'Decorating the tractor for the grand procession (ooregimpu) through town' },
      { icon: HeartHandshake, text: 'Committee and elders give blessings to everyone gathered' },
      { icon: Waves, text: 'Nimajjanam — the Ganesh idol is immersed with devotion, marking a joyful farewell' },
    ],
  },
]

export default function AboutFestival() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center max-w-2xl mx-auto"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-stone-800 text-saffron-600 dark:text-orange-300 text-xs font-semibold tracking-wide mb-4">
          🕉️ Ganapathi Bappa Morya
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-maroon-700 dark:text-orange-200 mb-3">
          About the Festival
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          Why we celebrate Vinayaka Chavithi, and how our committee brings the town together for three joyful days.
        </p>
      </motion.div>

      {/* Why we celebrate */}
      <section className="mb-14">
        <h2 className="text-2xl font-display font-bold text-maroon-700 dark:text-orange-200 mb-6">
          Why We Celebrate
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {WHY_POINTS.map((point, i) => {
            const Icon = point.icon
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 p-6"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-saffron-500 to-orange-600 text-white shadow-md mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-stone-800 dark:text-white mb-2">{point.title}</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{point.text}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 3-day schedule */}
      <section>
        <h2 className="text-2xl font-display font-bold text-maroon-700 dark:text-orange-200 mb-6">
          Our Three Days of Celebration
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {SCHEDULE.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800"
            >
              <div className={`px-6 py-5 bg-gradient-to-br ${day.accent} text-white`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/80">{day.day}</p>
                <h3 className="text-xl font-display font-bold">{day.title}</h3>
              </div>
              <ul className="p-6 space-y-4">
                {day.items.map((item, j) => {
                  const Icon = item.icon
                  return (
                    <li key={j} className="flex items-start gap-3">
                      <span className="shrink-0 p-1.5 rounded-lg bg-orange-100 dark:bg-stone-800 text-saffron-600 dark:text-orange-300 mt-0.5">
                        <Icon size={15} />
                      </span>
                      <span className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{item.text}</span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}