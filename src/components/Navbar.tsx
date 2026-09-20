import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'

const NAV_LINKS: { label: string; path: string; cta?: boolean }[] = [
  { label: 'HOME', path: '/home' },
  { label: 'ABOUT', path: '/about' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'CAREER', path: '/career' },
  { label: 'CONTACT', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.dataset.menuOpen = open ? '1' : '0'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.dataset.menuOpen = '0'
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  const panelTransition = open
    ? 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1), visibility 0s'
    : 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1), visibility 0s 0.55s'
  const scrimTransition = open
    ? 'opacity 0.4s ease, visibility 0s'
    : 'opacity 0.4s ease, visibility 0s 0.4s'

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          backdropFilter: solid ? 'blur(18px) saturate(140%)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(18px) saturate(140%)' : 'none',
          background: solid ? 'rgba(5, 6, 5, 0.75)' : 'transparent',
          borderBottom: solid ? '1px solid rgba(216, 182, 106, 0.18)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <nav
          aria-label="Primary"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            height: 'clamp(64px, 7vh, 84px)',
            paddingInline: 'clamp(20px, 5vw, 64px)',
            maxWidth: 1440,
            marginInline: 'auto',
          }}
        >
          <Link to="/home" aria-label="Chessbishop home" className="cb-nav-brand">
            <span className="cb-nav-emblem-wrap">
              <img src="/chessbishop-emblem-v2.png" alt="" className="cb-nav-emblem" />
            </span>
            <span className="cb-nav-logo-wrap">
              <img src="/chessbishop-nav-logo.png" alt="Chessbishop" className="cb-nav-logo" />
            </span>
          </Link>

          <ul
            className="cb-nav-links"
            style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: 'clamp(18px, 2.6vw, 42px)',
              alignItems: 'center',
            }}
          >
            {NAV_LINKS.map((l) => {
              const active = pathname === l.path
              return (
                <li key={l.path}>
                  <Link to={l.path} className={`cb-nav-link${active ? ' is-active' : ''}`}>
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link to="/contact" className="btn-gold cb-nav-join">
              JOIN
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              type="button"
              className="cb-nav-burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="cb-nav-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span style={{ transform: open ? 'translateY(0) rotate(45deg)' : 'translateY(-4px)' }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'translateY(0) rotate(-45deg)' : 'translateY(4px)' }} />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="cb-nav-scrim"
        aria-hidden="true"
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 84,
          background: 'rgba(5, 6, 5, 0.6)',
          backdropFilter: open ? 'blur(5px)' : 'none',
          WebkitBackdropFilter: open ? 'blur(5px)' : 'none',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: scrimTransition,
          cursor: 'pointer',
        }}
      />

      <div
        id="cb-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(84vw, 380px)',
          zIndex: 85,
          background:
            'radial-gradient(140% 90% at 100% 0%, rgba(216, 182, 106, 0.08), transparent 55%), linear-gradient(180deg, #0a0d0b 0%, #050605 100%)',
          borderLeft: '1px solid rgba(216, 182, 106, 0.22)',
          boxShadow: '-28px 0 70px rgba(0, 0, 0, 0.55)',
          paddingTop: 'calc(clamp(96px, 13vh, 120px) + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(clamp(34px, 5vh, 48px) + env(safe-area-inset-bottom, 0px))',
          paddingInline: 'clamp(24px, 7vw, 38px)',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: panelTransition,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <span className="cb-nav-drawer-eyebrow">MENU</span>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {[...NAV_LINKS, { label: 'JOIN →', path: '/contact', cta: true }].map((l, i) => (
            <li key={l.path} style={{ overflow: 'hidden' }}>
              <Link
                to={l.path}
                className={l.cta ? 'cb-nav-mobile-cta' : 'cb-nav-mobile-link'}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(40%)',
                  transition: `opacity 0.5s ease ${open ? 120 + i * 60 : 0}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${open ? 120 + i * 60 : 0}ms`,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="cb-nav-drawer-foot">
          <a href="mailto:teamchessbishop@gmail.com">teamchessbishop@gmail.com</a>
          <a href="https://wa.me/917598111855" target="_blank" rel="noopener noreferrer">
            +91 75981 11855
          </a>
        </div>
      </div>
    </>
  )
}