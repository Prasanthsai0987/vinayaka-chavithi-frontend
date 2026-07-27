// Central API client.
// Talks to the FastAPI backend at VITE_API_URL. If the backend is unreachable
// (e.g. while previewing the frontend on its own) it transparently falls back
// to an in-memory mock store so every screen still works end-to-end.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ---------------------------------------------------------------------------
// Mock store (used only as a fallback when the real API can't be reached)
// ---------------------------------------------------------------------------
const todayISO = () => new Date().toISOString().slice(0, 10)

let mockDonations = [
  { id: 1, receipt_no: 'VC00001', name: 'Ramesh Kumar', phone: '919876543210', village: 'Gandhi Nagar', amount: 5000, payment_status: 'paid', donation_date: '2026-07-10', notes: '' },
  { id: 2, receipt_no: 'VC00002', name: 'Lakshmi Devi', phone: '919845098450', village: 'Ashok Nagar', amount: 2500, payment_status: 'paid', donation_date: '2026-07-12', notes: 'Sweets sponsor' },
  { id: 3, receipt_no: 'VC00003', name: 'Suresh Reddy', phone: '919900112233', village: 'RTC Colony', amount: 1000, payment_status: 'unpaid', donation_date: '2026-07-15', notes: '' },
  { id: 4, receipt_no: 'VC00004', name: 'Anitha Rao', phone: '919123456789', village: 'Tirupati Main Road', amount: 7500, payment_status: 'paid', donation_date: '2026-07-18', notes: '' },
  { id: 5, receipt_no: 'VC00005', name: 'Venkatesh Naidu', phone: '919988776655', village: 'Balaji Colony', amount: 3000, payment_status: 'unpaid', donation_date: '2026-07-20', notes: 'Will pay after salary' },
]

let mockEvents = [
  { id: 1, title: 'Ganesh Idol Pratishtapana', description: 'Grand installation of the Ganesh idol with vedic rituals and pooja.', event_date: '2026-09-14', event_time: '07:00:00', location: 'Community Ground, Main Street', banner_image: '' },
  { id: 2, title: 'Cultural Night & Bhajan Sandhya', description: 'An evening of devotional music, dance performances and community bonding.', event_date: '2026-09-16', event_time: '18:30:00', location: 'Committee Hall', banner_image: '' },
  { id: 3, title: 'Maha Prasadam & Anna Danam', description: 'Community feast for all devotees and volunteers.', event_date: '2026-09-18', event_time: '12:00:00', location: 'Community Ground, Main Street', banner_image: '' },
  { id: 4, title: 'Ganesh Nimajjanam (Visarjan)', description: 'Grand procession and immersion of the Ganesh idol.', event_date: '2026-09-23', event_time: '16:00:00', location: 'Local Lake / Water Tank', banner_image: '' },
]

let mockImages = [
  { id: 1, image_url: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fac59?w=800&q=80', caption: 'Ganesh idol decoration', uploaded_date: new Date().toISOString() },
  { id: 2, image_url: 'https://images.unsplash.com/photo-1631961244734-4ea36f6b2c58?w=800&q=80', caption: 'Festival lights', uploaded_date: new Date().toISOString() },
  { id: 3, image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80', caption: 'Community pooja', uploaded_date: new Date().toISOString() },
]

let usingMock = false
let mockChecked = false

async function checkBackend() {
  if (mockChecked) return usingMock
  mockChecked = true
  try {
    const res = await fetch(`${BASE_URL}/`, { method: 'GET', signal: AbortSignal.timeout(2000) })
    usingMock = !res.ok
  } catch {
    usingMock = true
  }
  return usingMock
}

function delay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms))
}

function nextReceiptNo() {
  const n = mockDonations.length + 1
  return `VC${String(n).padStart(5, '0')}`
}

// ---------------------------------------------------------------------------
// Donations
// ---------------------------------------------------------------------------
export async function fetchDonations(search = '') {
  if (await checkBackend()) {
    await delay()
    const term = search.toLowerCase()
    return mockDonations
      .filter((d) => !term || d.name.toLowerCase().includes(term) || d.phone.includes(term))
      .sort((a, b) => b.id - a.id)
  }
  const url = new URL(`${BASE_URL}/donations`)
  if (search) url.searchParams.set('search', search)
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch donations')
  return res.json()
}

export async function createDonation(payload) {
  if (await checkBackend()) {
    await delay()
    const donation = { id: Date.now(), receipt_no: nextReceiptNo(), ...payload }
    mockDonations = [donation, ...mockDonations]
    return donation
  }
  const res = await fetch(`${BASE_URL}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to save donation')
  return res.json()
}

export async function updateDonation(id, payload) {
  if (await checkBackend()) {
    await delay()
    mockDonations = mockDonations.map((d) => (d.id === id ? { ...d, ...payload } : d))
    return mockDonations.find((d) => d.id === id)
  }
  const res = await fetch(`${BASE_URL}/donations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update donation')
  return res.json()
}

export async function deleteDonation(id) {
  if (await checkBackend()) {
    await delay()
    mockDonations = mockDonations.filter((d) => d.id !== id)
    return { message: 'Deleted successfully' }
  }
  const res = await fetch(`${BASE_URL}/donations/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete donation')
  return res.json()
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
export async function fetchEvents() {
  if (await checkBackend()) {
    await delay()
    return [...mockEvents].sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
  }
  const res = await fetch(`${BASE_URL}/events`)
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

export async function createEvent(payload) {
  if (await checkBackend()) {
    await delay()
    const event = { id: Date.now(), ...payload }
    mockEvents = [...mockEvents, event]
    return event
  }
  const res = await fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to save event')
  return res.json()
}

export async function updateEvent(id, payload) {
  if (await checkBackend()) {
    await delay()
    mockEvents = mockEvents.map((e) => (e.id === id ? { ...e, ...payload } : e))
    return mockEvents.find((e) => e.id === id)
  }
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update event')
  return res.json()
}

export async function deleteEvent(id) {
  if (await checkBackend()) {
    await delay()
    mockEvents = mockEvents.filter((e) => e.id !== id)
    return { message: 'Deleted successfully' }
  }
  const res = await fetch(`${BASE_URL}/events/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete event')
  return res.json()
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------
export async function fetchImages() {
  if (await checkBackend()) {
    await delay()
    return [...mockImages].sort((a, b) => b.id - a.id)
  }
  const res = await fetch(`${BASE_URL}/images`)
  if (!res.ok) throw new Error('Failed to fetch images')
  return res.json()
}

export async function uploadImage(file, caption = '') {
  if (await checkBackend()) {
    await delay()
    const image = { id: Date.now(), image_url: URL.createObjectURL(file), caption, uploaded_date: new Date().toISOString() }
    mockImages = [image, ...mockImages]
    return image
  }
  const formData = new FormData()
  formData.append('file', file)
  if (caption) formData.append('caption', caption)
  const res = await fetch(`${BASE_URL}/images`, { method: 'POST', body: formData })
  if (!res.ok) throw new Error('Failed to upload image')
  return res.json()
}

export async function deleteImage(id) {
  if (await checkBackend()) {
    await delay()
    mockImages = mockImages.filter((i) => i.id !== id)
    return { message: 'Deleted successfully' }
  }
  const res = await fetch(`${BASE_URL}/images/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete image')
  return res.json()
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export async function fetchStats() {
  if (await checkBackend()) {
    await delay()
    const total_donations = mockDonations.length
    const total_amount = mockDonations.reduce((s, d) => s + Number(d.amount), 0)
    const paid_count = mockDonations.filter((d) => d.payment_status === 'paid').length
    const unpaid_count = mockDonations.filter((d) => d.payment_status === 'unpaid').length
    const upcoming_events = mockEvents.filter((e) => e.event_date >= todayISO()).length
    const total_images = mockImages.length
    const byMonth = {}
    mockDonations.forEach((d) => {
      const m = d.donation_date.slice(0, 7)
      byMonth[m] = (byMonth[m] || 0) + Number(d.amount)
    })
    const monthly_donations = Object.entries(byMonth)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([month, total]) => ({ month, total }))
    return { total_donations, total_amount, paid_count, unpaid_count, upcoming_events, total_images, monthly_donations }
  }
  const res = await fetch(`${BASE_URL}/stats`)
  if (!res.ok) throw new Error('Failed to fetch stats')
  return res.json()
}

export function isUsingMockData() {
  return usingMock
}
