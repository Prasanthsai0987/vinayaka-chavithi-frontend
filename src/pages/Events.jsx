import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, CalendarDays } from 'lucide-react'
import toast from 'react-hot-toast'
import EventCard from '../components/EventCard.jsx'
import EventFormModal from '../components/EventFormModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { SkeletonCard } from '../components/Skeleton.jsx'
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api/api.js'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      setEvents(await fetchEvents())
    } catch {
      toast.error('Could not load events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async (payload) => {
    if (editingEvent) {
      await updateEvent(editingEvent.id, payload)
    } else {
      await createEvent(payload)
    }
    setEditingEvent(null)
    load()
  }

  const confirmDelete = async () => {
    try {
      await deleteEvent(deleteTarget.id)
      toast.success('Deleted successfully')
      setDeleteTarget(null)
      load()
    } catch {
      toast.error('Failed to delete event')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-maroon-700 dark:text-orange-200">
            Events
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">
            Keep the whole community in sync with the festival schedule.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingEvent(null)
            setModalOpen(true)
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-orange-600 text-white font-medium shadow-md hover:shadow-glow transition-shadow self-start"
        >
          <Plus size={18} /> Add Event
        </button>
      </motion.div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No events scheduled"
          message="Add the first event so devotees know what's coming up during the festival."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              index={i}
              onEdit={(ev) => {
                setEditingEvent(ev)
                setModalOpen(true)
              }}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <EventFormModal
        open={modalOpen}
        event={editingEvent}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete event?"
        message={`"${deleteTarget?.title}" will be removed from the schedule.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
