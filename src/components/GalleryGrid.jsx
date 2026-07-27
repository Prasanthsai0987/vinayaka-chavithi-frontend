import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import EmptyState from './EmptyState.jsx'
import { SkeletonCard } from './Skeleton.jsx'

export default function GalleryGrid({ images, loading, onDelete }) {
  const [activeIndex, setActiveIndex] = useState(null)

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <EmptyState
        icon={Images}
        title="No images yet"
        message="Upload photos from festival preparations, events, and celebrations to build your gallery."
      />
    )
  }

  const close = () => setActiveIndex(null)
  const showPrev = (e) => {
    e?.stopPropagation()
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }
  const showNext = (e) => {
    e?.stopPropagation()
    setActiveIndex((i) => (i + 1) % images.length)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            className="relative group rounded-2xl overflow-hidden shadow-card border border-orange-100 dark:border-stone-800 aspect-square cursor-pointer"
            onClick={() => setActiveIndex(i)}
          >
            <img src={img.image_url} alt={img.caption || 'Festival photo'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3">
              {img.caption && (
                <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</p>
              )}
            </div>
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(img)
                }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <Trash2 size={14} />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button onClick={close} className="absolute top-5 right-5 text-white/80 hover:text-white">
              <X size={28} />
            </button>
            <button onClick={showPrev} className="absolute left-4 sm:left-8 text-white/70 hover:text-white p-2">
              <ChevronLeft size={32} />
            </button>
            <motion.img
              key={images[activeIndex].id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={images[activeIndex].image_url}
              alt={images[activeIndex].caption || 'Festival photo'}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={showNext} className="absolute right-4 sm:right-8 text-white/70 hover:text-white p-2">
              <ChevronRight size={32} />
            </button>
            {images[activeIndex].caption && (
              <p className="absolute bottom-6 text-white/90 text-sm">{images[activeIndex].caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
