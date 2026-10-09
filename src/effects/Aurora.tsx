import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInViewToggle } from './useInView'

type AuroraProps = {
  className?: string
  intensity?: number
}

export default function Aurora({ className = '', intensity = 0.5 }: AuroraProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const visible = useInViewToggle(containerRef, '100px')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])
  const layer: CSSProperties = {
    position: 'absolute',
    borderRadius: '9999px',
    willChange: 'transform',
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: mounted ? intensity : 0,
        transition: 'opacity 1.4s ease',
        contain: 'paint',
      }}
    >
      <div
        className="aurora-layer"
        style={{
          ...layer,
          width: '42vw',
          height: '42vw',
          top: '-14vw',
          right: '-8vw',
          background: 'radial-gradient(circle, rgba(99, 169, 133, 0.5), transparent 70%)',
          animation: 'aurora-drift-a 22s ease-in-out infinite alternate',
          animationPlayState: visible ? 'running' : 'paused',
        }}
      />
      <div
        className="aurora-layer"
        style={{
          ...layer,
          width: '36vw',
          height: '36vw',
          bottom: '-12vw',
          left: '-10vw',
          background: 'radial-gradient(circle, rgba(216, 182, 106, 0.32), transparent 70%)',
          animation: 'aurora-drift-b 26s ease-in-out infinite alternate',
          animationPlayState: visible ? 'running' : 'paused',
        }}
      />
      <div
        className="aurora-layer"
        style={{
          ...layer,
          width: '30vw',
          height: '30vw',
          top: '30%',
          left: '34%',
          background: 'radial-gradient(circle, rgba(23, 60, 43, 0.85), transparent 70%)',
          animation: 'aurora-drift-c 24s ease-in-out infinite alternate',
          animationPlayState: visible ? 'running' : 'paused',
        }}
      />
      <style>{`
        @keyframes aurora-drift-a {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-9vw, 8vh) scale(1.18); }
        }
        @keyframes aurora-drift-b {
          from { transform: translate(0, 0) scale(1.05); }
          to { transform: translate(11vw, -7vh) scale(1.25); }
        }
        @keyframes aurora-drift-c {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-6vw, 6vh) scale(1.14); }
        }
      `}</style>
    </div>
  )
}