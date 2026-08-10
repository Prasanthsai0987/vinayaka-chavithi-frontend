import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { HandCoins, TrendingUp, Users, UserX, CalendarDays, Images } from 'lucide-react'
import DashboardCarousel from '../components/DashboardCarousel.jsx'
import StatCard from '../components/StatCard.jsx'
import AdminGrid from '../components/AdminGrid.jsx'
import { fetchStats } from '../api/api.js'
import vinayaka from "../images/vinayaka.jpg";

export default function Landing() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchStats().then(setStats).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-saffron-500 via-orange-500 to-maroon-600 text-white">
        <div className="absolute inset-0 kolam-pattern opacity-20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-red-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-semibold tracking-wide mb-5">
              🕉️ Ganapathi Bappa Morya
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold leading-tight mb-5">
              VINAYAKA YOUTH
              <br />
              <span className="text-gold-400">VASAVI NAGAR PODALAKUR</span>
            </h1>
            <p className="text-orange-50/90 text-base sm:text-lg max-w-xl mb-8">
              One place for the committee to manage donations, plan events, share the gallery and keep every
              devotee informed — with the warmth of tradition and the ease of modern tools.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/donations"
                className="px-6 py-3 rounded-xl bg-white text-maroon-700 font-semibold shadow-lg hover:shadow-glow transition-shadow"
              >
                Manage Donations
              </Link>

              <Link
                to="/events"
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 font-semibold hover:bg-white/20 transition-colors"
              >
                View Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="glass rounded-3xl p-5 sm:p-8 shadow-card">
          <DashboardCarousel />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-maroon-700 dark:text-orange-200 mb-6">
          At a Glance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard icon={HandCoins} label="Total Donations" value={stats?.total_donations ?? 0} accent="from-saffron-500 to-orange-600" />
          <StatCard icon={TrendingUp} label="Total Amount Collected" value={stats?.total_amount ?? 0} prefix="₹" accent="from-gold-500 to-amber-600" />
          <StatCard icon={Users} label="Paid Members" value={stats?.paid_count ?? 0} accent="from-green-500 to-emerald-600" />
          <StatCard icon={UserX} label="Pending Members" value={stats?.unpaid_count ?? 0} accent="from-red-500 to-rose-600" />
          <StatCard icon={CalendarDays} label="Upcoming Events" value={stats?.upcoming_events ?? 0} accent="from-rose-500 to-orange-500" />
          <StatCard icon={Images} label="Total Images" value={stats?.total_images ?? 0} accent="from-amber-500 to-yellow-500" />
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-white dark:bg-stone-900 shadow-card border border-orange-100 dark:border-stone-800 p-8 sm:p-10 grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-maroon-700 dark:text-orange-200 mb-4">
              About the Festival
            </h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Vinayaka Chavithi celebrates the birth of Lord Ganesha, the remover of obstacles. Communities come
              together to install the idol, offer prayers, share prasadam, and immerse the idol with devotion at
              the end of the celebration. This platform helps the committee coordinate every part of that
              journey — transparently and joyfully.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img
              src={vinayaka}
              alt="Ganesh idol decorated for Vinayaka Chavithi"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      <AdminGrid />
    </div>
  )
}
