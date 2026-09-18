import { useState, useEffect, useRef, type CSSProperties } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import EchoText from '../effects/EchoText'
import AnimatedContent from '../effects/AnimatedContent'
import SplitText from '../effects/SplitText'
import SectionBackground from '../components/SectionBackground'
import { galleryItems, galleryCategories, type GalleryItem } from '../data/site'

const sectionStyle: CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: CSSProperties = { maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2 }

const btnStyle = (active: boolean): CSSProperties => ({
  padding: '12px 20px',
  borderRadius: 999,
  border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
  background: active ? 'rgba(216, 182, 106, 0.1)' : 'transparent',
  color: active ? 'var(--gold)' : 'var(--muted)',
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: '0.2em',
  cursor: 'pointer',
  transition: 'border-color 0.25s, background 0.25s, color 0.25s',
  whiteSpace: 'nowrap',
  minHeight: 44,
})

export default function Gallery() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get('filter')
  const [filter, setFilter] = useState<string>(galleryCategories.includes(param as never) ? (param as string) : 'ALL')
  const [lightIdx, setLightIdx] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const filtered = filter === 'ALL' ? galleryItems : galleryItems.filter((g) => g.category === filter)

  const selectFilter = (c: string) => {
    setFilter(c)
    setSearchParams(c === 'ALL' ? {} : { filter: c }, { replace: true })
  }

  useEffect(() => {
    const candidate = searchParams.get('filter')
    if (candidate && galleryCategories.includes(candidate as never)) {
      setFilter(candidate)
    } else if (filter !== 'ALL') {
      setFilter('ALL')
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lightIdx === null) return
    const previous = document.activeElement as HTMLElement | null

    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightIdx(null)
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setLightIdx((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null))
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setLightIdx((prev) => (prev !== null ? (prev + 1) % filtered.length : null))
      }
    }

    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    window.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', close)
      previous?.focus?.()
    }
  }, [lightIdx, filtered.length])

  return (
    <>
      {/* Hero */}
      <section style={{ ...sectionStyle, minHeight: '70svh', display: 'flex', alignItems: 'center' }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 14 }}><span className="eyebrow">Gallery</span></AnimatedContent>
          <h1 className="about-title">
            <EchoText
              text="MOMENTS ON THE BOARD"
              echoes={10}
              lag={0.16}
              offset={30}
              direction="right"
              fade={0.68}
              blur={2.5}
              tint="rgba(216, 182, 106, 0.85)"
              mode="letters"
              cursorRadius={340}
              duration={850}
              ease="cubic.inOut"
            />
          </h1>
          <AnimatedContent delay={0.85} from={{ y: 20 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 520, fontSize: 'clamp(16px, 1.2vw, 19px)', lineHeight: 1.75, marginTop: 28 }}>
              Training. Competition. Community. A glimpse into Chessbishop.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <div role="group" aria-label="Filter gallery by category" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
            {galleryCategories.map((c) => (
              <button key={c} style={btnStyle(filter === c)} aria-pressed={filter === c} onClick={() => selectFilter(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="gallery-masonry">
            {filtered.map((g, i) => (
              <AnimatedContent key={`${filter}-${i}`} delay={i * 0.04} from={{ y: 22 }} className="masonry-item">
                <button
                  type="button"
                  onClick={() => {
                    if (filter === 'ALL') {
                      navigate(`/gallery/carousel?start=${i}`)
                    } else {
                      setLightIdx(i)
                    }
                  }}
                  aria-label={filter === 'ALL' ? `Open ${g.title} in gallery carousel` : `Open ${g.title} in lightbox`}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: 0,
                    border: 'none',
                    borderRadius: 18,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    textAlign: 'left',
                    aspectRatio: g.tall ? '3/4' : '4/3',
                  }}
                  className="cb-gallery-tile"
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: g.gradient ? g.gradient : `url(${g.src}) center / cover no-repeat`,
                      filter: 'brightness(0.72)',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(5,6,5,0.82))', opacity: 0 }} className="cb-gallery-overlay" />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                    <div style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.3em', fontWeight: 700 }}>{g.category}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.1vw, 18px)' }}>{g.title}</span>
                      <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.18em', fontWeight: 700 }}>VIEW →</span>
                    </div>
                  </div>
                </button>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Story Strip */}
      <section style={{ position: 'relative', height: 'clamp(280px, 36vw, 420px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(/bg-image.png) center / cover no-repeat', animation: 'ken-burns 20s ease-in-out infinite alternate', filter: 'brightness(0.35)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050605 0%, transparent 25%, transparent 75%, #050605 100%)' }} />
        <SectionBackground />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingInline: 24, textAlign: 'center' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3.4vw, 42px)' }}>
            <SplitText>EVERY POSITION TELLS A STORY.</SplitText>
          </h2>
        </div>
      </section>

      {/* CTA */}
      <section style={sectionStyle}>
        <SectionBackground />
        <div style={{ ...container, textAlign: 'center' }}>
          <h2 className="section-title">
            <SplitText>{'COME MAKE\nYOUR OWN MOMENT.'}</SplitText>
          </h2>
          <AnimatedContent delay={0.25} from={{ y: 18 }}>
            <Link to="/contact" className="btn-gold" style={{ marginTop: 40 }}>
              START TRAINING
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </AnimatedContent>
        </div>
      </section>

      {/* Lightbox */}
      {lightIdx !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal
          aria-label={`${filtered[lightIdx].title}, image ${lightIdx + 1} of ${filtered.length}`}
          tabIndex={-1}
          onClick={() => setLightIdx(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(5, 6, 5, 0.94)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'zoom-out',
            overscrollBehavior: 'contain',
            animation: 'page-enter 0.4s ease both',
          }}
        >
          <button
            onClick={() => setLightIdx(null)}
            type="button"
            aria-label="Close lightbox"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 999,
              color: 'var(--ivory)',
              width: 48,
              height: 48,
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightIdx((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null)) }}
            type="button"
            aria-label="Previous image"
            style={{ position: 'absolute', left: 24, background: 'none', border: '1px solid var(--border-gold)', borderRadius: 999, color: 'var(--gold)', width: 52, height: 52, fontSize: 20, cursor: 'pointer' }}
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightIdx((prev) => (prev !== null ? (prev + 1) % filtered.length : null)) }}
            type="button"
            aria-label="Next image"
            style={{ position: 'absolute', right: 24, background: 'none', border: '1px solid var(--border-gold)', borderRadius: 999, color: 'var(--gold)', width: 52, height: 52, fontSize: 20, cursor: 'pointer' }}
          >
            →
          </button>
          <span aria-hidden="true" style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', color: 'var(--muted)', fontSize: 12, letterSpacing: '0.25em', fontWeight: 700 }}>
            {lightIdx + 1} / {filtered.length}
          </span>
          <LightboxContent item={filtered[lightIdx]} key={`${filter}-${lightIdx}`} />
        </div>
      )}
    </>
  )
}

function LightboxContent({ item }: { item: GalleryItem }) {
  const bg = item.gradient ? item.gradient : item.src ? `url(${item.src}) center / contain no-repeat` : 'var(--surface)'
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 'min(90vw, 900px)',
        aspectRatio: '4/3',
        borderRadius: 24,
        overflow: 'hidden',
        border: '1px solid var(--border-gold)',
        position: 'relative',
        animation: 'page-enter 0.35s ease both',
        boxShadow: '0 40px 80px -30px rgba(0,0,0,0.8)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: bg }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(5,6,5,0.85))' }} />
      <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
        <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.35em', fontWeight: 700 }}>{item.category}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginTop: 6 }}>{item.title}</div>
      </div>
    </div>
  )
}