export function formatReadableDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function buildReceiptMessage({ receiptNo, name, amount, status, date }) {
  const statusLabel = status === 'paid' ? 'Paid' : 'Unpaid'

  return [
    '🙏 *Vinayaka Chavithi Donations*',
    '',
    `🧾 *Receipt No:* ${receiptNo}`,
    '',
    `👤 *Name:* ${name}`,
    '',
    `💰 *Amount:* ₹${Number(amount).toLocaleString('en-IN')}`,
    '',
    `✅ *Payment Status:* ${statusLabel}`,
    '',
    `📅 *Date:* ${formatReadableDate(date)}`,
    '',
    '🙏 Thank you for supporting *Vinayaka Chavithi*.',
    'Ganapathi Bappa Morya! 🙏',
    '',
    '━━━━━━━━━━━━━━━━━━━━',
    '🌐 *Vinayaka Chavithi Festival Website*',
    '',
    'Stay connected with us!',
    'Visit our website to view:',
    '• 📸 Festival Photos',
    '• 🎉 Event Schedule',
    '• 💝 Donation Details',
    '• 📢 Festival Updates',
    '',
    '• VasaviNagar Podalakur, Nellore District, Andhra Pradesh, India',
    '',
    
    '🔗 Click the link below:',
    'https://vinayaka-chavithi-frontend-2bfndry1j-prasanthsai0987s-projects.vercel.app/',
  ].join('\n')
}

// Opens WhatsApp with the phone number taken directly from the donation
// record — the user never has to retype it.
export function openWhatsApp(phone, message) {
  const digitsOnly = (phone || '').replace(/\D/g, '')
  const withCountryCode = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly
  const url = `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
