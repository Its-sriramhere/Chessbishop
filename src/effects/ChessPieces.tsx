import { useMemo } from 'react'

const GLYPHS = ['♞', '♜', '♝', '♟', '♛', '♚']

type Piece = {
  glyph: string
  left: string
  top: string
  size: number
  drift: number
  floatDur: number
  delay: number
  ivory: boolean
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function ChessPieces({ count = 14 }: { count?: number }) {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, () => ({
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        left: `${Math.floor(rand(2, 90))}%`,
        top: `${Math.floor(rand(4, 88))}%`,
        size: Math.floor(rand(46, 168)),
        drift: rand(16, 30),
        floatDur: rand(9, 16),
        delay: -rand(0, 14),
        ivory: Math.random() > 0.62,
      })),
    [count],
  )

  return (
    <div aria-hidden="true" className="cb-pieces">
      <div className="cb-piece-layer" style={{ position: 'absolute', left: '6%', top: '44%', animation: 'cb-drift 26s linear infinite' }}>
        <span className="cb-piece cb-piece--anchor" style={{ fontSize: 'clamp(220px, 30vw, 420px)', animation: 'cb-float 17s ease-in-out infinite' }}>
          ♞
        </span>
      </div>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="cb-piece-layer"
          style={{ position: 'absolute', left: p.left, top: p.top, animation: `cb-drift ${p.drift}s linear infinite`, animationDelay: `${p.delay}s` }}
        >
          <span className={`cb-piece${p.ivory ? ' cb-piece--ivory' : ''}`} style={{ fontSize: p.size, animation: `cb-float ${p.floatDur}s ease-in-out infinite`, animationDelay: `${p.delay}s` }}>
            {p.glyph}
          </span>
        </div>
      ))}
    </div>
  )
}