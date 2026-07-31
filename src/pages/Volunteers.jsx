import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import VolunteerCard from '../components/VolunteerCard.jsx'
import EmptyState from '../components/EmptyState.jsx'

// Static display data — edit this list with your committee's actual volunteers.
// image can be any URL (uploaded photo link, Unsplash placeholder, etc).
const VOLUNTEERS = [
  {
    id: 1,
    name: 'Veda Prakash',
    phone: '+91 ',
    age: 24,
    village: 'Podalakur',
    role: 'Event Coordinator',
    image: '',
  },
  {
    id: 2,
    name: 'Pavan Sai',
    phone: '+91 98450 98450',
    age: 21,
    village: 'Podalakur',
    role: 'Decoration Team',
    image: '',
  },
  {
    id: 3,
    name: 'Mouneesh ',
    phone: '+91 99001 12233',
    age: 28,
    village: 'Podalakur',
    role: 'Prasadam & Catering',
    image: '',
  },
  {
    id: 4,
    name: ' ',
    phone: '+91 91234 56789',
    age: 23,
    village: 'Podalakur ',
    role: 'Registration Desk',
    image: '',
  },
  {
    id: 5,
    name: ' ',
    phone: '',
    age: 30,
    village: 'Podalakur',
    role: 'Security & Crowd Management',
    image: '',
  },
  {
    id: 6,
    name: ' ',
    phone: '+91 98123 45678',
    age: 26,
    village: 'Podalakur',
    role: 'Cultural Programs',
    image: '',
  },
]

export default function Volunteers() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-maroon-700 dark:text-orange-200">
          Volunteers
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          The dedicated hands behind every celebration.
        </p>
      </motion.div>

      {VOLUNTEERS.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No volunteers listed yet"
          message="Add volunteer details to the VOLUNTEERS list to display them here."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VOLUNTEERS.map((volunteer, i) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}