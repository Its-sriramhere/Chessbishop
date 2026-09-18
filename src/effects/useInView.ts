import { useEffect, useState } from 'react'

export function useInViewToggle(ref: React.RefObject<HTMLElement | null>, rootMargin = '0px 0px -12% 0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}
