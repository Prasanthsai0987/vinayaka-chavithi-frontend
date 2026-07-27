import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud } from 'lucide-react'
import toast from 'react-hot-toast'
import GalleryGrid from '../components/GalleryGrid.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import { fetchImages, uploadImage, deleteImage } from '../api/api.js'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const load = async () => {
    setLoading(true)
    try {
      setImages(await fetchImages())
    } catch {
      toast.error('Could not load gallery')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleFiles = async (files) => {
    if (!files?.length) return
    setUploading(true)
    try {
      for (const file of files) {
        await uploadImage(file)
      }
      toast.success('Image uploaded')
      load()
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await deleteImage(deleteTarget.id)
      toast.success('Deleted successfully')
      setDeleteTarget(null)
      load()
    } catch {
      toast.error('Failed to delete image')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-maroon-700 dark:text-orange-200">
          Gallery
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">
          Relive the celebrations — upload and browse festival moments.
        </p>
      </motion.div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(Array.from(e.dataTransfer.files))
        }}
        onClick={() => inputRef.current?.click()}
        className={`mb-8 rounded-3xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-saffron-500 bg-orange-50 dark:bg-stone-800'
            : 'border-orange-200 dark:border-stone-700 bg-white dark:bg-stone-900'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(Array.from(e.target.files))}
        />
        <UploadCloud size={36} className="mx-auto mb-3 text-saffron-500" />
        <p className="font-medium text-stone-700 dark:text-stone-200">
          {uploading ? 'Uploading...' : 'Drag & drop photos here, or click to browse'}
        </p>
        <p className="text-xs text-stone-400 mt-1">Supports multiple image uploads (JPG, PNG, WEBP)</p>
      </div>

      <GalleryGrid images={images} loading={loading} onDelete={setDeleteTarget} />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete image?"
        message="This photo will be permanently removed from the gallery."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
