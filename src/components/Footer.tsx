import { Link } from 'react-router-dom'
import { Camera, Play, AtSign, Briefcase } from 'lucide-react'

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/chessbishopofficial/', Icon: Camera },
  { label: 'YouTube', href: 'https://youtube.com', Icon: Play },
  { label: 'X', href: 'https://x.com', Icon: AtSign },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Briefcase },
]

const quickLinks = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Career', path: '/career' },
  { label: 'Contact', path: '/contact' },
]

const col = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
}

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '1px solid var(--border)',
        background: 'linear-gradient(180deg, #050605 0%, #0a0d0b 100%)',
        padding: 'clamp(60px, 8vw, 110px) clamp(20px, 6vw, 72px) max(32px, env(safe-area-inset-bottom))',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 44, maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ maxWidth: 300 }}>
          <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
            <img src="/chessbishop-emblem-v2.png" alt="" aria-hidden="true" style={{ height: 42, width: 42, borderRadius: 999, objectFit: 'cover' }} />
            <span translate="no" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: '0.12em' }}>CHESSBISHOP</span>
          </Link>
          <p style={{ color: 'var(--muted)', marginTop: 18, fontSize: 14, lineHeight: 1.7 }}>
            Premium chess training, education, tournaments and player development. We build thinkers, not just players.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Chessbishop on ${label}`}
                style={{
                  color: 'var(--muted)',
                  width: 44,
                  height: 44,
                  display: 'inline-grid',
                  placeItems: 'center',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  transition: 'color 0.25s, border-color 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold)'
                  e.currentTarget.style.borderColor = 'var(--border-gold)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = ''
                  e.currentTarget.style.borderColor = ''
                }}
              >
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div style={col}>
          <span style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.3em', fontWeight: 700 }}>MAIN</span>
          {quickLinks.map((l) => (
            <Link key={l.path} to={l.path} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, transition: 'color 0.25s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ivory)')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={col}>
          <span style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.3em', fontWeight: 700 }}>CONTACT</span>
          <a href="mailto:teamchessbishop@gmail.com" style={{ color: 'var(--muted)', fontSize: 14, textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
            teamchessbishop@gmail.com
          </a>
          <a href="https://wa.me/917598111855" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', fontSize: 14, textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
            +91 75981 11855
          </a>
          <span style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
            31/13 Second Street, MC Road,
            <br />
            Thanjavur, Tamil Nadu 613 007
          </span>
          <span style={{ color: 'var(--muted)', fontSize: 14 }}>Mon–Sat · 9:00 AM–7:00 PM</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
          <Link to="/contact" className="btn-gold">
            START YOUR JOURNEY
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: '64px auto 0', borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', color: 'var(--muted-dark)', fontSize: 13 }}>
        <span>© {new Date().getFullYear()} CHESSBISHOP LLP. All rights reserved.</span>
        <span>MASTER THE GAME.</span>
      </div>
    </footer>
  )
}