import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import './FloatingAssistant.css'

type Side = 'left' | 'right'
type Place = { side: Side; yRatio: number }
type Insets = { top: number; right: number; bottom: number; left: number }

const STORAGE_KEY = 'cb-fab-pos'
const MENU_ID = 'cb-fab-menu'
const HINT_ID = 'cb-fab-hint'

const EDGE = 18
const SIZE = 60
const ITEM = 48
const SPREAD = 160
const DRAG_THRESHOLD = 8
const NUDGE = 16

const WHATSAPP_URL = `https://wa.me/917598111855?text=${encodeURIComponent(
  'Hi Chessbishop! I’d like to know more about your chess programs.',
)}`
const EMAIL_URL = `mailto:teamchessbishop@gmail.com?subject=${encodeURIComponent(
  'Enquiry from the Chessbishop website',
)}&body=${encodeURIComponent('Hi Chessbishop team,\n\nI’d like to know more about ')}`

const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.47-3.63 8.1-8.1 8.1a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.24-4.3c0-4.47 3.63-8.1 8.1-8.1Z" />
    <path d="M9.35 7.4c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.74-.71 1.98-1.4.25-.69.25-1.28.18-1.4-.07-.12-.27-.19-.57-.34-.3-.15-1.74-.86-2.01-.95-.27-.1-.46-.15-.66.15-.2.3-.78.95-.95 1.14-.17.19-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.57-.49-.49-.66-.5h-.56Z" />
  </svg>
)

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.6" />
    <path d="m3.6 6.6 8.4 5.9 8.4-5.9" />
  </svg>
)

const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6.4 3.6 8.9 3l1.7 3.8-1.6 1.4a12.4 12.4 0 0 0 5.3 5.3l1.4-1.6L19.5 13l-.6 2.5a2 2 0 0 1-2.3 1.6A15.8 15.8 0 0 1 3.4 6.5 2 2 0 0 1 5 4.2Z" />
  </svg>
)

const InstagramIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

const ContactIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 14.5a2 2 0 0 1-2 2H8l-4 3.5V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
    <path d="M8 8.5h8M8 12h5" />
  </svg>
)

const CoachIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.4 20a5.6 5.6 0 0 1 11.2 0" />
    <path d="M19 7.5v6M16 10.5h6" />
  </svg>
)

type Item = { key: string; label: string; icon: ReactNode; href?: string; to?: string; newTab?: boolean; accent?: boolean }

const ITEMS: Item[] = [
  { key: 'whatsapp', label: 'WhatsApp chat', icon: WhatsAppIcon, href: WHATSAPP_URL, newTab: true },
  { key: 'email', label: 'Email us', icon: MailIcon, href: EMAIL_URL },
  { key: 'call', label: 'Call +91 75981 11855', icon: PhoneIcon, href: 'tel:+917598111855' },
  { key: 'instagram', label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/chessbishopofficial/', newTab: true },
  { key: 'contact', label: 'Contact form', icon: ContactIcon, to: '/contact' },
  { key: 'coach', label: 'Apply as a Chess Coach', icon: CoachIcon, to: '/career/apply', accent: true },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function readStoredPlace(): Place | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Place>
    if (parsed.side !== 'left' && parsed.side !== 'right') return null
    if (typeof parsed.yRatio !== 'number' || !Number.isFinite(parsed.yRatio)) return null
    return { side: parsed.side, yRatio: clamp(parsed.yRatio, 0, 1) }
  } catch {
    return null
  }
}

function readInsets(): Insets {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:fixed;inset:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)'
  document.body.appendChild(probe)
  const cs = getComputedStyle(probe)
  const insets = {
    top: parseFloat(cs.paddingTop) || 0,
    right: parseFloat(cs.paddingRight) || 0,
    bottom: parseFloat(cs.paddingBottom) || 0,
    left: parseFloat(cs.paddingLeft) || 0,
  }
  probe.remove()
  return insets
}

export default function FloatingAssistant() {
  const { pathname } = useLocation()

  const rootRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const dragRef = useRef<{ id: number; sx: number; sy: number; bx: number; by: number; moved: boolean } | null>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const firstRef = useRef(true)

  const [place, setPlace] = useState<Place>(() => readStoredPlace() ?? { side: 'right', yRatio: 1 })
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const [insets, setInsets] = useState<Insets>(() => readInsets())
  const [open, setOpen] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const update = () => {
      setVp({ w: window.innerWidth, h: window.innerHeight })
      setInsets(readInsets())
    }
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('cb-fab-dragging')
    }
  }, [])

  const geo = useMemo(() => {
    const minX = EDGE + insets.left
    const maxX = Math.max(minX, vp.w - SIZE - EDGE - insets.right)
    const R = clamp(Math.min(vp.w, vp.h) * 0.2, 100, 126)
    const half = R * Math.sin((SPREAD / 2) * (Math.PI / 180)) + ITEM / 2 + 8
    const rawMinY = EDGE + insets.top + half
    const rawMaxY = vp.h - EDGE - insets.bottom - half
    const minY = Math.min(rawMinY, rawMaxY)
    const maxY = Math.max(rawMinY, rawMaxY)
    const x = place.side === 'left' ? minX : maxX
    const y = minY + place.yRatio * (maxY - minY)
    return { minX, maxX, minY, maxY, x, y, R }
  }, [insets, vp, place])

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.style.transition = firstRef.current || reduced ? 'none' : 'transform 0.34s cubic-bezier(0.22,1,0.36,1)'
    el.style.transform = `translate3d(${geo.x}px, ${geo.y}px, 0)`
    firstRef.current = false
  }, [geo.x, geo.y, reduced])

  const commit = useCallback((next: Place) => {
    setPlace(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable */
    }
  }, [])

  const closeMenu = useCallback((refocus: boolean) => {
    setOpen(false)
    if (refocus) requestAnimationFrame(() => btnRef.current?.focus())
  }, [])

  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => itemRefs.current[0]?.focus())
    const onDocPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closeMenu(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu(true)
      }
    }
    document.addEventListener('pointerdown', onDocPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointerdown', onDocPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, closeMenu])

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const el = rootRef.current
    if (!el) return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* capture unsupported */
    }
    dragRef.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, bx: geo.x, by: geo.y, moved: false }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current
    if (!d || d.id !== e.pointerId || open) return
    const dx = e.clientX - d.sx
    const dy = e.clientY - d.sy
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      d.moved = true
      rootRef.current?.classList.add('is-dragging')
      document.documentElement.classList.add('cb-fab-dragging')
      if (rootRef.current) rootRef.current.style.transition = 'none'
    }
    const nx = clamp(d.bx + dx, geo.minX, geo.maxX)
    const ny = clamp(d.by + dy, geo.minY, geo.maxY)
    posRef.current = { x: nx, y: ny }
    if (rootRef.current) rootRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`
  }

  const endDrag = (e: ReactPointerEvent<HTMLButtonElement>, cancelled: boolean) => {
    const d = dragRef.current
    if (!d || d.id !== e.pointerId) return
    dragRef.current = null
    rootRef.current?.classList.remove('is-dragging')
    document.documentElement.classList.remove('cb-fab-dragging')

    if (!d.moved) {
      if (!cancelled) setOpen((v) => !v)
      return
    }

    const band = geo.maxY - geo.minY || 1
    const side: Side = posRef.current.x + SIZE / 2 < vp.w / 2 ? 'left' : 'right'
    const yRatio = clamp((posRef.current.y - geo.minY) / band, 0, 1)
    const nx = side === 'left' ? geo.minX : geo.maxX
    const ny = geo.minY + yRatio * band
    const el = rootRef.current
    if (el) {
      el.style.transition = reduced ? 'none' : 'transform 0.34s cubic-bezier(0.22,1,0.36,1)'
      el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`
    }
    commit({ side, yRatio })
  }

  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (open) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu(true)
      }
      return
    }
    const band = geo.maxY - geo.minY || 1
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const delta = (e.key === 'ArrowUp' ? -NUDGE : NUDGE) / band
      commit({ ...place, yRatio: clamp(place.yRatio + delta, 0, 1) })
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const side: Side = e.key === 'ArrowLeft' ? 'left' : 'right'
      if (side !== place.side) commit({ ...place, side })
    } else if (e.key === 'Home') {
      e.preventDefault()
      commit({ side: 'right', yRatio: 1 })
    }
  }

  const onRootBlur = (e: ReactFocusEvent<HTMLDivElement>) => {
    if (!open) return
    const next = e.relatedTarget as Node | null
    if (next && rootRef.current?.contains(next)) return
    closeMenu(false)
  }

  const ring = useMemo(() => {
    const n = ITEMS.length
    const start = place.side === 'right' ? 180 - SPREAD / 2 : -SPREAD / 2
    return ITEMS.map((item, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1)
      const rad = ((start + t * SPREAD) * Math.PI) / 180
      const x = Math.cos(rad) * geo.R
      const y = Math.sin(rad) * geo.R
      return { item, x, y, below: y < -6 }
    })
  }, [place.side, geo.R])

  return (
    <div
      ref={rootRef}
      className={`cb-fab${open ? ' is-open' : ''}`}
      style={{ width: SIZE, height: SIZE }}
      onBlur={onRootBlur}
    >
      <span id={HINT_ID} className="cb-fab__sr">
        Drag to move. With the button focused, use arrow keys to reposition and Home to reset.
      </span>

      <div id={MENU_ID} className="cb-fab__ring">
        {ring.map(({ item, x, y, below }, i) => {
          const style = {
            '--x': `${x.toFixed(1)}px`,
            '--y': `${y.toFixed(1)}px`,
            '--delay': `${(open ? i : ITEMS.length - 1 - i) * 26}ms`,
          } as CSSProperties
          const className = `cb-fab__item${item.accent ? ' cb-fab__item--accent' : ''}`
          const inner = (
            <>
              <span className="cb-fab__icon">{item.icon}</span>
              <span className={`cb-fab__label${below ? ' cb-fab__label--below' : ''}`} aria-hidden="true">
                {item.label}
              </span>
            </>
          )
          if (item.to) {
            return (
              <Link
                key={item.key}
                to={item.to}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className={className}
                style={style}
                aria-label={item.label}
                tabIndex={open ? 0 : -1}
              >
                {inner}
              </Link>
            )
          }
          return (
            <a
              key={item.key}
              href={item.href}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className={className}
              style={style}
              aria-label={item.label}
              tabIndex={open ? 0 : -1}
              {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {inner}
            </a>
          )
        })}
      </div>

      <button
        ref={btnRef}
        type="button"
        className={`cb-fab__btn${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={MENU_ID}
        aria-describedby={HINT_ID}
        aria-label={open ? 'Close contact and coaching menu' : 'Open contact and coaching menu'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(e, false)}
        onPointerCancel={(e) => endDrag(e, true)}
        onKeyDown={onKeyDown}
      >
        <img src="/chessbishop-emblem-v2.png" alt="" aria-hidden="true" className="cb-fab__logo" draggable={false} />
        <span className="cb-fab__glyph" aria-hidden="true">
          ×
        </span>
      </button>
    </div>
  )
}
