import { useRef, useEffect, type ReactNode } from 'react'

type MagnetProps = {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
}

export default function Magnet({ children, className = '', strength = 0.35, radius = 240 }: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      if (dist < radius) {
        const pull = strength * (1 - dist / radius)
        el.style.transform = `translate(${dx * pull}px, ${dy * pull * 0.6}px)`
      } else {
        el.style.transform = ''
      }
    }
    const onLeave = () => {
      el.style.transform = ''
    }
    window.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength, radius])

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)', willChange: 'transform' }}>
      {children}
    </div>
  )
}