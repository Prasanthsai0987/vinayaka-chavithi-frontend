import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts'
import DonationForm from '../components/DonationForm.jsx'
import DonationTable from '../components/DonationTable.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import {
  fetchDonations, createDonation, updateDonation, deleteDonation, fetchStats,
} from '../api/api.js'

const PIE_COLORS = ['#22c55e', '#ef4444']

export default function Donations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editingDonation, setEditingDonation] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [stats, setStats] = useState(null)


  const load = async () => {
    setLoading(true)
    try {
      const data = await fetchDonations(search)

      setDonations(data)
    } catch {
      toast.error('Could not load donations')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = () => fetchStats().then(setStats).catch(() => {})

  useEffect(() => {
    const t = setTimeout(load, 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    loadStats()
  }, [donations])

  const handleSave = async (payload) => {
    let saved
    if (editingDonation) {
      saved = await updateDonation(editingDonation.id, payload)
      setEditingDonation(null)
    } else {
      saved = await createDonation(payload)
    }
    await load()
    return saved
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteDonation(deleteTarget.id)
      toast.success('Deleted successfully')
      setDeleteTarget(null)
      load()
    } catch {
      toast.error('Failed to delete')
    }
  }

  const pieData = stats
    ? [
        { name: 'Paid', value: stats.paid_count },
        { name: 'Unpaid', value: stats.unpaid_count },
      ]
    : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-maroon-700 dark:text-orange-200">
          Donations
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Record contributions, send receipts and track collection progress.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <DonationForm
            editingDonation={editingDonation}
            onSave={handleSave}
            onClearEdit={() => setEditingDonation(null)}
          />
        </div>

        
      </div>

     

      <DonationTable
        donations={donations}
        loading={loading}
        search={search}
        setSearch={setSearch}
        onEdit={setEditingDonation}
        onDelete={setDeleteTarget}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete donation?"
        message={`This will permanently remove ${deleteTarget?.name}'s donation record.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
