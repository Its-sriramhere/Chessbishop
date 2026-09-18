import { useEffect, useRef, type CSSProperties } from 'react'
import { useReducedMotion } from 'motion/react'

type Mode = 'letters' | 'words' | 'both'
type Direction = 'left' | 'right'

type EaseName =
  | 'linear'
  | 'quad.in'
  | 'quad.out'
  | 'quad.inOut'
  | 'cubic.in'
  | 'cubic.out'
  | 'cubic.inOut'
  | 'sine.in'
  | 'sine.out'
  | 'sine.inOut'
  | 'expo.out'
  | 'expo.inOut'
  | 'circ.out'

type EchoTextProps = {
  text: string
  echoes?: number
  lag?: number
  offset?: number
  direction?: Direction
  fade?: number
  blur?: number
  tint?: string
  mode?: Mode
  cursorRadius?: number
  duration?: number
  ease?: EaseName
  fontSize?: string
  fontWeight?: number | string
  color?: string
  className?: string
  style?: CSSProperties
}

const EASINGS: Record<EaseName, (t: number) => number> = {
  linear: (t) => t,
  'quad.in': (t) => t * t,
  'quad.out': (t) => t * (2 - t),
  'quad.inOut': (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  'cubic.in': (t) => t * t * t,
  'cubic.out': (t) => 1 - Math.pow(1 - t, 3),
  'cubic.inOut': (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  'sine.in': (t) => 1 - Math.cos((t * Math.PI) / 2),
  'sine.out': (t) => Math.sin((t * Math.PI) / 2),
  'sine.inOut': (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  'expo.out': (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  'expo.inOut': (t) => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2),
  'circ.out': (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
}

function units(raw: string, mode: Mode): string[] {
  if (mode === 'letters' || mode === 'both') return Array.from(raw)
  return raw.split(' ')
}

export default function EchoText({
  text,
  echoes = 12,
  lag = 0.18,
  offset = 36,
  direction = 'right',
  fade = 0.72,
  blur = 3,
  tint,
  mode = 'letters',
  cursorRadius = 320,
  duration = 900,
  ease = 'cubic.out',
  fontSize,
  fontWeight,
  color,
  className = '',
  style,
}: EchoTextProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const echoRefs = useRef<(HTMLSpanElement | null)[]>([])
  const reduced = useReducedMotion()
  const coarseRef = useRef(false)

  const stateRef = useRef({
    cursor: { x: 0, y: 0 },
    history: [] as { x: number; y: number }[],
    currents: Array.from({ length: echoes }, () => ({ x: 0, y: 0 })),
    last: 0,
    raf: 0,
  })

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    coarseRef.current = mq.matches
    const onChange = (e: MediaQueryListEvent) => {
      coarseRef.current = e.matches
    }
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
    return
  }, [])

  const frozen = reduced === true || coarseRef.current

  useEffect(() => {
    if (frozen) return
    const st = stateRef.current
    const dirX = direction === 'right' ? 1 : -1
    const historyLen = Math.ceil(lag * Math.max(echoes, 1) * 60) + 2
    const lagSteps = Math.max(1, Math.round(lag * 60))
    const easeFn = EASINGS[ease]
    const root = rootRef.current

    const track = (clientX: number, clientY: number) => {
      if (!root) return
      const rect = root.getBoundingClientRect()
      st.cursor.x = clientX - rect.left - rect.width / 2
      st.cursor.y = clientY - rect.top - rect.height / 2
    }

    const onPointerMove = (e: PointerEvent) => track(e.clientX, e.clientY)
    const onPointerLeave = () => {
      st.cursor.x = 0
      st.cursor.y = 0
    }

    if (root) {
      root.addEventListener('pointermove', onPointerMove)
      root.addEventListener('pointerleave', onPointerLeave)
    }

    st.history = []
    st.currents = Array.from({ length: echoes }, () => ({ x: 0, y: 0 }))
    st.history.push({ x: 0, y: 0 })
    st.last = performance.now()

    const tick = () => {
      const now = performance.now()
      const dt = Math.min((now - st.last) / 1000, 0.05)
      st.last = now
      const k = 1 - Math.exp(-dt / (duration / 1000))
      const easedK = easeFn(Math.min(k, 1))

      const dist = Math.hypot(st.cursor.x, st.cursor.y)
      const driven = Math.max(0, Math.min(1, 1 - dist / cursorRadius))
      const nx = dist > 0 ? st.cursor.x / dist : 0
      const ny = dist > 0 ? st.cursor.y / dist : 0
      st.history.push({ x: nx * driven, y: ny * driven })
      if (st.history.length > historyLen) st.history.shift()

      const t0 = st.history.length - 1
      for (let i = 0; i < echoes; i += 1) {
        const cur = st.currents[i]
        const idx = Math.max(0, t0 - i * lagSteps)
        const src = st.history[idx]
        const amp = offset * ((i + 1) / echoes)
        const tx = src.x * amp * dirX
        const ty = src.y * amp
        cur.x += (tx - cur.x) * easedK
        cur.y += (ty - cur.y) * easedK
        const el = echoRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`
        }
      }
      st.raf = requestAnimationFrame(tick)
    }

    st.raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(st.raf)
      if (root) {
        root.removeEventListener('pointermove', onPointerMove)
        root.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [frozen, echoes, lag, offset, direction, duration, ease, cursorRadius])

  const rootStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    color: color ?? 'inherit',
    fontSize: fontSize ?? 'inherit',
    fontWeight: fontWeight ?? 'inherit',
    fontFamily: 'var(--font-display)',
    lineHeight: 1.08,
    letterSpacing: '0.01em',
    ...style,
  }

  return (
    <div ref={rootRef} className={className} style={rootStyle}>
      <span style={{ position: 'relative', zIndex: echoes + 2 }}>
        {units(text, mode).map((u, j) => (
          <span key={j}>
            {u}
            {mode === 'words' ? ' ' : ''}
          </span>
        ))}
      </span>
      {!frozen &&
        Array.from({ length: echoes }, (_, i) => (
          <span
            ref={(el) => {
              echoRefs.current[i] = el
            }}
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: echoes - i,
              pointerEvents: 'none',
              whiteSpace: 'pre-wrap',
              userSelect: 'none',
              color: tint ?? 'inherit',
              opacity: Math.max(0, Math.pow(fade, i + 1)),
              filter: blur > 0 ? `blur(${((blur * (i + 1)) / echoes).toFixed(2)}px)` : undefined,
              willChange: 'transform',
            }}
          >
            {units(text, mode).map((u, j) => (
              <span key={j}>
                {u}
                {mode === 'words' ? ' ' : ''}
              </span>
            ))}
          </span>
        ))}
    </div>
  )
}