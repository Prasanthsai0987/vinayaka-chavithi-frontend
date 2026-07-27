export function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center gap-4 py-3 px-4">
      <div className="h-4 w-8 bg-orange-100 dark:bg-stone-800 rounded" />
      <div className="h-4 w-32 bg-orange-100 dark:bg-stone-800 rounded" />
      <div className="h-4 w-24 bg-orange-100 dark:bg-stone-800 rounded" />
      <div className="h-4 w-20 bg-orange-100 dark:bg-stone-800 rounded" />
      <div className="h-4 w-16 bg-orange-100 dark:bg-stone-800 rounded" />
      <div className="h-4 w-20 bg-orange-100 dark:bg-stone-800 rounded" />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-orange-100/70 dark:bg-stone-800 h-64 w-full" />
  )
}
