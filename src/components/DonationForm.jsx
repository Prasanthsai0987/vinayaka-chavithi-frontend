import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Save,
  MessageCircleMore,
  Eraser,
  User,
  UserCheck,
  Phone,
  MapPin,
  IndianRupee,
  StickyNote
} from 'lucide-react'
import toast from 'react-hot-toast'
import { buildReceiptMessage, openWhatsApp } from '../utils/whatsapp.js'

const EMPTY_FORM = {
  name: '',
  phone: '',
  village: '',
  volunteer_name: '',
  amount: '',
  payment_status: 'unpaid',
  donation_date: new Date().toISOString().slice(0, 10),
  notes: '',
}

export default function DonationForm({ editingDonation, onSave, onClearEdit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (editingDonation) {
      setForm({
        name: editingDonation.name,
        phone: editingDonation.phone,
        village: editingDonation.village || '',
        amount: editingDonation.amount,
        payment_status: editingDonation.payment_status,
        donation_date: editingDonation.donation_date,
        notes: editingDonation.notes || '',
        volunteer_name: editingDonation.volunteer_name || '',
      })
    }
  }, [editingDonation])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const clearForm = () => {
    setForm(EMPTY_FORM)
    onClearEdit?.()
  }

  const validate = () => {
    if (!form.name.trim()) return 'Please enter the donor name'
    if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) return 'Please enter a valid phone number'
    if (!form.amount || Number(form.amount) <= 0) return 'Please enter a valid donation amount'
    return null
  }

  const handleSave = async () => {
    const error = validate()
    if (error) return toast.error(error)
    setSaving(true)
    try {
      const saved = await onSave({ ...form, amount: Number(form.amount) })
      toast.success(editingDonation ? 'Donation updated successfully' : 'Saved successfully')
      if (!editingDonation) setForm(EMPTY_FORM)
      return saved
    } catch (e) {
      toast.error('Something went wrong while saving')
    } finally {
      setSaving(false)
    }
  }

  const handleWhatsApp = async () => {
    const error = validate()
    if (error) return toast.error(error)
    const saved = await handleSave()
    const receiptNo = saved?.receipt_no || editingDonation?.receipt_no || 'VC-NEW'
    const message = buildReceiptMessage({
      receiptNo,
      name: form.name,
      amount: form.amount,
      status: form.payment_status,
      date: form.donation_date,
    })
    openWhatsApp(form.phone, message)
    toast.success('WhatsApp opened')
  }

  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 p-6">
      <h3 className="font-display font-bold text-xl text-maroon-700 dark:text-orange-200 mb-5">
        {editingDonation ? 'Edit Donation' : 'New Donation'}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field icon={User} label="Full Name">
          <input value={form.name} onChange={update('name')} placeholder="e.g. prasanth sai" className="input" />
        </Field>

        <Field icon={Phone} label="Phone Number">
          <input value={form.phone} onChange={update('phone')} placeholder="" className="input" />
        </Field>

        <Field icon={MapPin} label="Village / Area">
          <input value={form.village} onChange={update('village')} placeholder="e.g. Gandhi Nagar" className="input" />
        </Field>

        <Field icon={UserCheck} label="Volunteer Name">
          <input value={form.volunteer_name} onChange={update('volunteer_name')} placeholder="e.g. prasant sai" className="input" />
        </Field>

        <Field icon={IndianRupee} label="Donation Amount (₹)">
          <input type="number" min="0" value={form.amount} onChange={update('amount')} placeholder="e.g. 1000" className="input" />
        </Field>

        <div>
          <label className="label mb-2 block">Payment Status</label>
          <button
            type="button"
            onClick={() =>
              setForm((f) => ({ ...f, payment_status: f.payment_status === 'paid' ? 'unpaid' : 'paid' }))
            }
            className={`relative w-24 h-10 rounded-full transition-colors flex items-center px-1 ${
              form.payment_status === 'paid' ? 'bg-green-500' : 'bg-stone-300 dark:bg-stone-700'
            }`}
          >
            <motion.div
              layout
              className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[10px] font-bold"
              animate={{ x: form.payment_status === 'paid' ? 52 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {form.payment_status === 'paid' ? '✓' : '○'}
            </motion.div>
            <span className="absolute right-3 text-xs font-semibold text-white select-none">
              {form.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
            </span>
          </button>
        </div>

        <Field icon={null} label="Donation Date">
          <input type="date" value={form.donation_date} onChange={update('donation_date')} className="input" />
        </Field>

        <div className="sm:col-span-2">
          <Field icon={StickyNote} label="Notes (optional)">
            <textarea value={form.notes} onChange={update('notes')} rows={2} placeholder="Any additional notes..." className="input resize-none" />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-orange-600 text-white font-medium shadow-md hover:shadow-glow transition-shadow disabled:opacity-60"
        >
          <Save size={18} /> Save
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition-colors"
        >
          <MessageCircleMore size={18} /> Send WhatsApp Receipt
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={clearForm}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 font-medium hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
        >
          <Eraser size={18} /> Clear Form
        </motion.button>
      </div>
    </div>
  )
}

function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="label mb-1.5 flex items-center gap-1.5">
        {Icon && <Icon size={14} className="text-saffron-500" />}
        {label}
      </label>
      {children}
    </div>
  )
}
