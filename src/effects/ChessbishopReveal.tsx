import { useEffect, useRef } from 'react'

type ChessbishopRevealProps = {
  className?: string
  label?: string
}

const bishopSvg =
  '<svg viewBox="0 0 40 40" width="22" height="22" aria-hidden="true"><path d="M20 3c4 3.4 6 6.6 6 10.6 0 2.4-.9 4.6-2.6 6.2h-6.8C15 18.2 14 16 14 13.6c0-4 2-7.2 6-10.6Z" fill="#D8B66A"/><path d="M13.8 22h12.4l2.2 4.6c2.2 2 3.5 4 3.5 6.4 0 2-1.6 3.4-3.6 3.4H12.7c-2 0-3.6-1.4-3.6-3.4 0-2.4 1.3-4.4 3.5-6.4l1.2-4.6Z" fill="#F4F0E6" stroke="#D8B66A" stroke-width="1"/><path d="M13.5 22h13l2 3H11.5l2-3Z" fill="none" stroke="#D8B66A" stroke-width="1.2"/></svg>'

export default function ChessbishopReveal({ className = '', label = '' }: ChessbishopRevealProps) {
  const lineRef = useRef<HTMLDivElement | null>(null)
  const bishopRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const line = lineRef.current
    const bishop = bishopRef.current
    if (!line || !bishop) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        line.style.transition = 'width 1s cubic-bezier(0.22,1,0.36,1)'
        line.style.width = '100%'
        bishop.style.transition = 'left 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s, opacity 0.4s ease'
        bishop.style.left = 'calc(100% - 22px)'
        bishop.style.opacity = '1'
      },
      { threshold: 0.4 },
    )
    io.observe(line)
    return () => io.disconnect()
  }, [])

  return (
    <div className={className} style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ position: 'relative', height: 22 }}>
        <div
          ref={lineRef}
          style={{ position: 'absolute', top: '50%', left: 0, height: 1, width: 0, background: 'var(--gold)' }}
        />
        <div
          ref={bishopRef}
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0, lineHeight: 0 }}
          dangerouslySetInnerHTML={{ __html: bishopSvg }}
        />
      </div>
      {label && (
        <p style={{ textAlign: 'center', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--muted)', fontSize: 11, fontWeight: 700, marginTop: 14 }}>
          {label}
        </p>
      )}
    </div>
  )
}