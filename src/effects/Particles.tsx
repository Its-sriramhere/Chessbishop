import { useEffect, useRef } from 'react'

type ParticlesProps = {
  className?: string
  count?: number
  maxRadius?: number
}

export default function Particles({ className = '', count = 46, maxRadius = 2.2 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

    type P = { x: number; y: number; r: number; vx: number; vy: number; o: number }
    let parts: P[] = []

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = Math.max(1, Math.round(rect?.width || window.innerWidth))
      height = Math.max(1, Math.round(rect?.height || window.innerHeight))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (parts.length !== count) {
        parts = Array.from({ length: count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * maxRadius + 0.4,
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

    const refresh = () => {
      resize()
      start()
    }

    refresh()

    window.addEventListener('resize', refresh)
    window.addEventListener('orientationchange', refresh)
    reduced.addEventListener('change', refresh)
    document.addEventListener('visibilitychange', start)

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refresh) : null
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
      window.removeEventListener('resize', refresh)
      window.removeEventListener('orientationchange', refresh)
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
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
