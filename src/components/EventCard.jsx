import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin, Pencil, Trash2 } from 'lucide-react'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600431521340-491eca880813?w=900&q=80'

export default function EventCard({ event, onEdit, onDelete, index = 0 }) {
  const dateLabel = new Date(event.event_date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  const timeLabel = event.event_time
    ? new Date(`2000-01-01T${event.event_time}`).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 group"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.banner_image || FALLBACK_IMAGE}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-stone-900/90 rounded-xl px-3 py-1.5 text-center shadow">
          <p className="text-[11px] font-semibold text-saffron-600 uppercase leading-none">
            {new Date(event.event_date).toLocaleDateString('en-IN', { month: 'short' })}
          </p>
          <p className="text-lg font-display font-bold text-maroon-700 dark:text-orange-300 leading-none mt-0.5">
            {new Date(event.event_date).getDate()}
          </p>
        </div>
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button onClick={() => onEdit(event)} className="p-2 rounded-lg bg-white/90 text-saffron-600 hover:bg-white">
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(event)} className="p-2 rounded-lg bg-white/90 text-red-600 hover:bg-white">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-stone-800 dark:text-white mb-2">{event.title}</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1"><CalendarDays size={13} className="text-saffron-500" /> {dateLabel}</span>
          {timeLabel && <span className="flex items-center gap-1"><Clock size={13} className="text-saffron-500" /> {timeLabel}</span>}
          {event.location && <span className="flex items-center gap-1"><MapPin size={13} className="text-saffron-500" /> {event.location}</span>}
        </div>
      </div>
    </motion.div>
  )
}
