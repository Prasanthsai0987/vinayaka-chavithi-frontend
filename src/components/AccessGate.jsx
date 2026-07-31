import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, KeyRound, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const SESSION_FLAG = 'vc-donations-unlocked'

// Gates its children behind a committee access key. The key itself is
// checked on the backend (see /verify-access) and never appears in the
// frontend code or network response — only a true/false comes back.
// Once unlocked, access is remembered for the current browser tab session.
export default function AccessGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_FLAG) === 'true')
  const [key, setKey] = useState('')
  const [checking, setChecking] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!key.trim()) return
    setChecking(true)
    try {
      const res = await fetch(`${BASE_URL}/verify-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      if (res.ok) {
        sessionStorage.setItem(SESSION_FLAG, 'true')
        setUnlocked(true)
        toast.success('Access granted')
      } else {
        toast.error('Incorrect access key')
        setKey('')
      }
    } catch {
      toast.error('Could not reach the server to verify the key')
    } finally {
      setChecking(false)
    }
  }

  if (unlocked) return children

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 p-8 text-center"
      >
        <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-saffron-500 to-orange-600 text-white shadow-md mb-4">
          <Lock size={26} />
        </div>
        <h2 className="font-display font-bold text-xl text-maroon-700 dark:text-orange-200 mb-2">
          Restricted Area
        </h2>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
          Enter the committee access key to manage donations.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Access key"
              autoFocus
              className="input pl-9 text-center tracking-widest"
            />
          </div>
          <button
            type="submit"
            disabled={checking}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-orange-600 text-white font-medium shadow-md hover:shadow-glow transition-shadow disabled:opacity-60"
          >
            {checking ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
            {checking ? 'Verifying...' : 'Unlock'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}