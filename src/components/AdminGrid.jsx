import { motion } from 'framer-motion'
import { Mail, UserCircle2, Instagram } from 'lucide-react'

// Update these details for your committee — shown on the homepage so
// visitors know who to contact and who manages the platform.
const ADMIN_INFO = [
  {
    icon: Mail,
    label: 'Admin Email',
    value: 'prasanthsai0987@gmail.com',
    href: 'mailto:prasanthsai0987@gmail.com',
    accent: 'from-saffron-500 to-orange-600',
  },
  {
    icon: UserCircle2,
    label: 'Created By',
    value: 'Prasanth Sai',
    href: null,
    accent: 'from-red-500 to-rose-600',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@vinayaka_chavithi_committee',
    href: '',
    accent: 'from-amber-500 to-yellow-500',
  },
]

export default function AdminGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-maroon-700 dark:text-orange-200 mb-6">
        Admin & Contact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {ADMIN_INFO.map((item, i) => {
          const Icon = item.icon
          const CardTag = item.href ? 'a' : 'div'
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <CardTag
                {...(item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex items-center gap-4 rounded-2xl bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 p-5 hover:shadow-glow transition-shadow"
              >
                <div className={`shrink-0 p-3 rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="label mb-0.5">{item.label}</p>
                  <p className="font-semibold text-stone-800 dark:text-white truncate">{item.value}</p>
                </div>
              </CardTag>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
