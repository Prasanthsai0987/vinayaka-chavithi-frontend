import { motion } from 'framer-motion'
import { Phone, Cake, MapPin } from 'lucide-react'

export default function VolunteerCard({ volunteer, index = 0 }) {
  const { name, phone, age, village, role, image } = volunteer

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 group"
    >
      <div className="relative h-48 overflow-hidden bg-orange-100 dark:bg-stone-800">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        {role && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-stone-900/90 text-xs font-semibold text-saffron-600">
            {role}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-stone-800 dark:text-white mb-2">{name}</h3>
        <div className="flex flex-col gap-1.5 text-sm text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-saffron-500" /> {phone}
          </span>
          <span className="flex items-center gap-2">
            <Cake size={14} className="text-saffron-500" /> {age} years
          </span>
          {village && (
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-saffron-500" /> {village}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}