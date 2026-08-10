// Central API client.
// Talks to the FastAPI backend at VITE_API_URL.

const BASE_URL = import.meta.env.VITE_API_URL 


// ---------------------------------------------------------------------------
// Donations
// ---------------------------------------------------------------------------
export async function fetchDonations(search = '') {
  console.log("fetchDonations called", search)

  const url = new URL(`${BASE_URL}/donations`)
  if (search) url.searchParams.set('search', search)

  const res = await fetch(url)

  const data = await handle(res, 'Failed to fetch donations')

  return data
}
 
export async function createDonation(payload) {

  const res = await fetch(`${BASE_URL}/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });


  const text = await res.text();


  if (!res.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}
 
export async function updateDonation(id, payload) {
  const res = await fetch(`${BASE_URL}/donations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handle(res, 'Failed to update donation')
}
 
export async function deleteDonation(id) {
  const res = await fetch(`${BASE_URL}/donations/${id}`, { method: 'DELETE' })
  return handle(res, 'Failed to delete donation')
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
export async function fetchEvents() {
  const res = await fetch(`${BASE_URL}/events`)
  if (!res.ok) throw new Error('Failed to fetch events')
  return res.json()
}

export async function createEvent(payload) {
  const res = await fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to save event')
  return res.json()
}

export async function updateEvent(id, payload) {
  const res = await fetch(`${BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to update event')
  return res.json()
}

export async function deleteEvent(id) {
  const res = await fetch(`${BASE_URL}/events/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete event')
  return res.json()
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------
export async function fetchImages() {
  const res = await fetch(`${BASE_URL}/images`)
  if (!res.ok) throw new Error('Failed to fetch images')
  return res.json()
}

export async function uploadImage(file, caption = '') {
  const formData = new FormData()
  formData.append('file', file)
  if (caption) formData.append('caption', caption)
  const res = await fetch(`${BASE_URL}/images`, { method: 'POST', body: formData })
  if (!res.ok) throw new Error('Failed to upload image')
  return res.json()
}

export async function deleteImage(id) {
  const res = await fetch(`${BASE_URL}/images/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete image')
  return res.json()
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export async function fetchStats() {
  const res = await fetch(`${BASE_URL}/stats`)
  if (!res.ok) throw new Error('Failed to fetch stats')
  return res.json()
}

async function handle(res, msg) {
  if (!res.ok) {
    const error = await res.text()
    console.error("API ERROR:", error)
    throw new Error(msg)
  }

  return await res.json()
}