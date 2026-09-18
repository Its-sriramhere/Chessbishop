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

  const solid = scrolled || open

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
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
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 85,
          background: 'rgba(5, 6, 5, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(90px, 16vh, 140px) 8vw',
          overscrollBehavior: 'contain',
          overflowY: 'auto',
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)',
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {[...NAV_LINKS, { label: 'JOIN →', path: '/contact', cta: true }].map((l, i) => (
            <li key={l.path} style={{ overflow: 'hidden' }}>
              <Link
                to={l.path}
                className={l.cta ? 'cb-nav-mobile-cta' : 'cb-nav-mobile-link'}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(60%)',
                  transition: `opacity 0.5s ease ${open ? 120 + i * 70 : 0}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${open ? 120 + i * 70 : 0}ms`,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}