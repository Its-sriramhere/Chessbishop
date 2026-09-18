import { useRef, type ReactNode, type CSSProperties } from 'react'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  spotlightColor?: string
  radius?: number
}

export default function SpotlightCard({
  children,
  className = '',
  style,
  spotlightColor = 'rgba(216, 182, 106, 0.16)',
  radius = 260,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--spot-x', `${x}px`)
    el.style.setProperty('--spot-y', `${y}px`)
  }

  const common: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s',
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={className}
      style={{
        ...common,
        ...style,
        ['--spot-x' as string]: '50%',
        ['--spot-y' as string]: '50%',
        ['--spot-color' as string]: spotlightColor,
        ['--spot-radius' as string]: `${radius}px`,
      }}
    >
      <div
        aria-hidden="true"
        className="spotlight-card-glow"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(${radius}px circle at var(--spot-x) var(--spot-y), var(--spot-color), transparent 70%)`,
          opacity: 0,
          transition: 'opacity 0.4s',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}