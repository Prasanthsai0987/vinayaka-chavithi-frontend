import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Save } from 'lucide-react'
import toast from 'react-hot-toast'

const EMPTY = { title: '', description: '', event_date: '', event_time: '', location: '', banner_image: '' }

export default function EventFormModal({ open, event, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    setForm(
      event
        ? {
            title: event.title,
            description: event.description || '',
            event_date: event.event_date,
            event_time: event.event_time || '',
            location: event.location || '',
            banner_image: event.banner_image || '',
          }
        : EMPTY
    )
  }, [event, open])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.event_date) return toast.error('Title and date are required')
    await onSave(form)
    toast.success(event ? 'Event updated successfully' : 'Event added')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-xl text-maroon-700 dark:text-orange-200">
                {event ? 'Edit Event' : 'Add Event'}
              </h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label mb-1.5 block">Event Name</label>
                <input value={form.title} onChange={update('title')} className="input" placeholder="e.g. Ganesh Idol Pratishtapana" />
              </div>
              <div>
                <label className="label mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={update('description')} rows={3} className="input resize-none" placeholder="Brief description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label mb-1.5 block">Date</label>
                  <input type="date" value={form.event_date} onChange={update('event_date')} className="input" />
                </div>
                <div>
                  <label className="label mb-1.5 block">Time</label>
                  <input type="time" value={form.event_time} onChange={update('event_time')} className="input" />
                </div>
              </div>
              <div>
                <label className="label mb-1.5 block">Location</label>
                <input value={form.location} onChange={update('location')} className="input" placeholder="e.g. Community Ground" />
              </div>
              <div>
                <label className="label mb-1.5 block">Banner Image URL</label>
                <input value={form.banner_image} onChange={update('banner_image')} className="input" placeholder="https://..." />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-saffron-500 to-orange-600 text-white font-medium shadow-md hover:shadow-glow transition-shadow"
            >
              <Save size={18} /> {event ? 'Update Event' : 'Add Event'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
