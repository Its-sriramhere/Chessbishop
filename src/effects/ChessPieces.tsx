import { useMemo, type ReactNode } from 'react'

const PIECE_PATHS: Record<string, ReactNode> = {
  knight: (
    <g transform="translate(0,0.3)">
      <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" />
      <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" />
    </g>
  ),
  rook: (
    <g transform="translate(0,0.3)">
      <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z" />
      <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z" />
      <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" />
      <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
      <path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" />
      <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
    </g>
  ),
  bishop: (
    <g transform="translate(0,0.6)">
      <g>
        <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z" />
        <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
        <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
    </g>
  ),
  pawn: (
    <path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" />
  ),
  queen: (
    <g>
      <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z" />
      <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="14" cy="9" r="2" />
      <circle cx="22.5" cy="8" r="2" />
      <circle cx="31" cy="9" r="2" />
      <circle cx="39" cy="12" r="2" />
    </g>
  ),
  king: (
    <g>
      <path d="M22.5 11.63V6M20 8h5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
      <path d="M12.5 37c5.5 3.5 14.5 3.5 20 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" />
    </g>
  ),
}

const PIECE_KEYS = Object.keys(PIECE_PATHS)

type Piece = {
  kind: string
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
        kind: PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)],
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
        <span className="cb-piece cb-piece--anchor" style={{ animation: 'cb-float 17s ease-in-out infinite' }}>
          <svg viewBox="0 0 45 45" width="clamp(220px, 30vw, 420px)" height="clamp(220px, 30vw, 420px)">
            <g fill="currentColor">{PIECE_PATHS.knight}</g>
          </svg>
        </span>
      </div>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="cb-piece-layer"
          style={{ position: 'absolute', left: p.left, top: p.top, animation: `cb-drift ${p.drift}s linear infinite`, animationDelay: `${p.delay}s` }}
        >
          <span className={`cb-piece${p.ivory ? ' cb-piece--ivory' : ''}`} style={{ animation: `cb-float ${p.floatDur}s ease-in-out infinite`, animationDelay: `${p.delay}s` }}>
            <svg viewBox="0 0 45 45" width={p.size} height={p.size}>
              <g fill="currentColor">{PIECE_PATHS[p.kind]}</g>
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}