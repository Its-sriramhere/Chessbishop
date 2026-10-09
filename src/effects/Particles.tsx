import { useEffect, useRef, useState } from 'react'

type ParticlesProps = {
  className?: string
  count?: number
  maxRadius?: number
}

export default function Particles({ className = '', count = 46, maxRadius = 2.2 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [shown, setShown] = useState(false)
  const shownRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let raf = 0
    let width = 0
    let height = 0
    let visible = true
    let resizeTimer = 0

    type P = { x: number; y: number; r: number; vx: number; vy: number; o: number }
    let parts: P[] = []

    const isSmallScreen = () => window.innerWidth < 640
    const activeCount = () => (isSmallScreen() ? Math.min(count, 24) : count)
    const activeMaxRadius = () => (isSmallScreen() ? Math.min(maxRadius, 1.8) : maxRadius)
    const activeDprCap = () => (isSmallScreen() ? 1.5 : 2)

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = Math.max(1, Math.round(rect?.width || window.innerWidth))
      height = Math.max(1, Math.round(rect?.height || window.innerHeight))
      const targetCount = activeCount()
      const targetRadius = activeMaxRadius()
      const dpr = Math.min(window.devicePixelRatio || 1, activeDprCap())
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (parts.length !== targetCount) {
        parts = Array.from({ length: targetCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * targetRadius + 0.4,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          o: Math.random() * 0.5 + 0.15,
        }))
      } else {
        for (const p of parts) {
          p.x = Math.min(p.x, width)
          p.y = Math.min(p.y, height)
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of parts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(216, 182, 106, ${p.o})`
        ctx.fill()
      }
      if (!shownRef.current) {
        shownRef.current = true
        setShown(true)
      }
    }

    const step = () => {
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const start = () => {
      stop()
      if (document.hidden || !visible) return
      if (reduced.matches) {
        draw()
        return
      }
      step()
    }

    const ensureRunning = () => {
      if (raf !== 0) return
      start()
    }

    const handleSizeChange = () => {
      resize()
      ensureRunning()
    }

    const scheduleSizeChange = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(handleSizeChange, 150)
    }

    const refresh = () => {
      resize()
      start()
    }

    refresh()

    window.addEventListener('resize', scheduleSizeChange)
    window.addEventListener('orientationchange', scheduleSizeChange)
    reduced.addEventListener('change', refresh)
    document.addEventListener('visibilitychange', start)

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleSizeChange) : null
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement)

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting
              start()
            },
            { rootMargin: '120px' },
          )
        : null
    io?.observe(canvas)

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', scheduleSizeChange)
      window.removeEventListener('orientationchange', scheduleSizeChange)
      reduced.removeEventListener('change', refresh)
      document.removeEventListener('visibilitychange', start)
      ro?.disconnect()
      io?.disconnect()
    }
  }, [count, maxRadius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: shown ? 1 : 0, transition: 'opacity 0.9s ease' }}
    />
  )
}
