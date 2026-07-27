import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(target, inView, duration = 1200) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    let frame
    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const progress = Math.min((timestamp - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return value
}

export default function StatCard({ icon: Icon, label, value, prefix = '', suffix = '', accent = 'from-saffron-500 to-orange-600' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const animated = useCountUp(value, inView)
  const display = Number.isInteger(value) ? Math.round(animated) : animated.toFixed(0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-white dark:bg-stone-900 p-5 shadow-card border border-orange-100 dark:border-stone-800 flex items-center gap-4"
    >
      <div className={`shrink-0 p-3 rounded-xl bg-gradient-to-br ${accent} text-white shadow-md`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-stone-800 dark:text-white">
          {prefix}
          {display.toLocaleString('en-IN')}
          {suffix}
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400">{label}</p>
      </div>
    </motion.div>
  )
}
