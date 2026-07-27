import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Pencil,
  Trash2,
  MessageCircleMore,
  Printer,
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { SkeletonRow } from './Skeleton.jsx'
import EmptyState from './EmptyState.jsx'
import { HandCoins } from 'lucide-react'
import { buildReceiptMessage, openWhatsApp } from '../utils/whatsapp.js'
import toast from 'react-hot-toast'

const PAGE_SIZE = 6

export default function DonationTable({ donations, loading, onEdit, onDelete, search, setSearch }) {
  const [filter, setFilter] = useState('all') // all | paid | unpaid
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let rows = [...donations]
    if (filter !== 'all') rows = rows.filter((d) => d.payment_status === filter)
    rows.sort((a, b) => {
      let av = a[sortKey]
      let bv = b[sortKey]
      if (sortKey === 'amount') {
        av = Number(av)
        bv = Number(bv)
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return rows
  }, [donations, filter, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const handlePrint = (d) => {
    const win = window.open('', '_blank', 'width=420,height=600')
    win.document.write(`
      <html>
        <head><title>Receipt ${d.receipt_no}</title>
        <style>
          body{font-family:sans-serif;padding:24px;color:#3f2a13}
          h2{color:#c94800;margin-bottom:4px}
          .row{margin:10px 0}
          .label{font-size:12px;text-transform:uppercase;color:#9a6b3a}
          .value{font-size:16px;font-weight:600}
          .footer{margin-top:20px;font-size:13px;color:#8b1e2b}
        </style>
        </head>
        <body>
          <h2>🙏 Vinayaka Chavithi Donations</h2>
          <div class="row"><div class="label">Receipt No</div><div class="value">${d.receipt_no}</div></div>
          <div class="row"><div class="label">Name</div><div class="value">${d.name}</div></div>
          <div class="row"><div class="label">Amount</div><div class="value">₹${Number(d.amount).toLocaleString('en-IN')}</div></div>
          <div class="row"><div class="label">Status</div><div class="value">${d.payment_status === 'paid' ? 'Paid' : 'Unpaid'}</div></div>
          <div class="row"><div class="label">Date</div><div class="value">${d.donation_date}</div></div>
          <div class="footer">Thank you for supporting Vinayaka Chavithi.<br/>Ganapathi Bappa Morya 🙏</div>
        </body>
      </html>
    `)
    win.document.close()
    win.print()
  }

  const handleWhatsApp = (d) => {
    const message = buildReceiptMessage({
      receiptNo: d.receipt_no,
      name: d.name,
      amount: d.amount,
      status: d.payment_status,
      date: d.donation_date,
    })
    openWhatsApp(d.phone, message)
    toast.success('WhatsApp opened')
  }

  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 overflow-hidden">
      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between border-b border-orange-100 dark:border-stone-800">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search by name or phone..."
            className="input pl-9"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'paid', 'unpaid'].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f)
                setPage(1)
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === f
                  ? 'bg-saffron-500 text-white'
                  : 'bg-orange-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-orange-100 dark:hover:bg-stone-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-stone-500 dark:text-stone-400 bg-orange-50/60 dark:bg-stone-800/60">
              <th className="px-4 py-3 font-semibold">#</th>
              <Th label="Name" sortKey="name" active={sortKey} dir={sortDir} onClick={toggleSort} />
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Village</th>
              <Th label="Amount" sortKey="amount" active={sortKey} dir={sortDir} onClick={toggleSort} />
              <th className="px-4 py-3 font-semibold">Status</th>
              <Th label="Date" sortKey="donation_date" active={sortKey} dir={sortDir} onClick={toggleSort} />
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={8}>
                    <SkeletonRow />
                  </td>
                </tr>
              ))}

            {!loading &&
              pageRows.map((d, i) => (
                <motion.tr
                  key={d.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-orange-50 dark:border-stone-800 hover:bg-orange-50/50 dark:hover:bg-stone-800/40 transition-colors"
                >
                  <td className="px-4 py-3 text-stone-400">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-4 py-3 font-medium text-stone-800 dark:text-white">{d.name}</td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-300">{d.phone}</td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-300">{d.village || '—'}</td>
                  <td className="px-4 py-3 font-semibold text-stone-800 dark:text-white">
                    ₹{Number(d.amount).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        d.payment_status === 'paid'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {d.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-300">{d.donation_date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <IconBtn onClick={() => onEdit(d)} title="Edit"><Pencil size={15} /></IconBtn>
                      <IconBtn onClick={() => onDelete(d)} title="Delete" danger><Trash2 size={15} /></IconBtn>
                      <IconBtn onClick={() => handleWhatsApp(d)} title="Send WhatsApp" success><MessageCircleMore size={15} /></IconBtn>
                      <IconBtn onClick={() => handlePrint(d)} title="Print Receipt"><Printer size={15} /></IconBtn>
                    </div>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>

        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={HandCoins}
            title="No donations yet"
            message="Donations you add will show up here. Use the form above to record the first one."
          />
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-orange-100 dark:border-stone-800">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-lg bg-orange-50 dark:bg-stone-800 disabled:opacity-40 hover:bg-orange-100 dark:hover:bg-stone-700"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-2 text-sm font-medium text-stone-600 dark:text-stone-300">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-lg bg-orange-50 dark:bg-stone-800 disabled:opacity-40 hover:bg-orange-100 dark:hover:bg-stone-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Th({ label, sortKey, active, dir, onClick }) {
  return (
    <th
      className="px-4 py-3 font-semibold cursor-pointer select-none"
      onClick={() => onClick(sortKey)}
    >
      <span className="flex items-center gap-1">
        {label}
        <ArrowUpDown size={12} className={active === sortKey ? 'text-saffron-600' : 'text-stone-300'} />
      </span>
    </th>
  )
}

function IconBtn({ children, onClick, title, danger, success }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-colors ${
        danger
          ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400'
          : success
          ? 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400'
          : 'bg-orange-50 text-saffron-600 hover:bg-orange-100 dark:bg-stone-800 dark:text-orange-300'
      }`}
    >
      {children}
    </button>
  )
}
