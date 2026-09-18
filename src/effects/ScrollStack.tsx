import { useEffect, useRef, type CSSProperties } from 'react'

type ScrollStackProps = {
  cards: { title: string; subtitle: string; description?: string }[]
  className?: string
}

export default function ScrollStack({ cards, className = '' }: ScrollStackProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const cardStyles = useRef<CSSProperties[]>([])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nodes = Array.from(el.querySelectorAll('[data-stack-card]')) as HTMLElement[]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => {
        node.style.transform = 'none'
        node.style.opacity = '1'
      })
      return
    }

    const update = () => {
      const rect = el.getBoundingClientRect()
      cards.forEach((_, i) => {
        const node = nodes[i]
        if (!node) return
        const progress = Math.min(Math.max((window.innerHeight * 0.62 - rect.top) / rect.height, 0), 1)
        const offset = i * Math.min(progress * 1.6, 1) * 42
        cardStyles.current[i] = {
          transform: `translateY(${offset}px) scale(${1 + i * 0.004 * progress})`,
          zIndex: i,
        }
        Object.assign(node.style, {
          transform: cardStyles.current[i].transform,
          zIndex: String(cardStyles.current[i].zIndex),
        })
        node.style.opacity = String(progress + 0.1)
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [cards])

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>
      {cards.map((card, i) => (
        <div
          key={card.title}
          data-stack-card
          style={{
            position: 'sticky',
            top: clamp(i * 34, 60, 150),
            marginBottom: '-34px',
          }}
        >
          <div className="glass-card" style={{ padding: 'clamp(24px, 3.4vw, 48px)' }}>
            <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span className="text-gold" style={{ font: '600 clamp(60px, 8vw, 120px) / 1 var(--font-display)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="section-title">{card.title}</h3>
                <p className="eyebrow" style={{ marginTop: 10 }}>{card.subtitle}</p>
                {card.description && (
                  <p style={{ color: 'var(--muted)', maxWidth: 520, marginTop: 14, fontSize: 'clamp(15px, 1.1vw, 18px)' }}>
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ height: 120 }} aria-hidden="true" />
    </div>
  )
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}