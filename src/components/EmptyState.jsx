import { motion } from 'framer-motion'

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="p-4 rounded-full bg-orange-100 dark:bg-stone-800 text-saffron-600 dark:text-orange-300 mb-4">
        <Icon size={32} />
      </div>
      <h3 className="font-display font-bold text-lg text-stone-800 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mb-4">{message}</p>
      {action}
    </motion.div>
  )
}
