import { useEffect, useRef } from 'react'

export default function ChessCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches || window.innerWidth < 1024) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('cb-cursor-on')
    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100
    let raf = 0

    const move = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`
      const interactive = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select')
      ring.style.width = interactive ? '56px' : '34px'
      ring.style.height = interactive ? '56px' : '34px'
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.left = `${rx - 17}px`
      ring.style.top = `${ry - 17}px`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      document.documentElement.classList.remove('cb-cursor-on')
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          borderRadius: 999,
          background: 'var(--gold)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 34,
          height: 34,
          borderRadius: 999,
          border: '1px solid rgba(216,182,106,0.6)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.22s, height 0.22s',
        }}
      />
    </>
  )
}