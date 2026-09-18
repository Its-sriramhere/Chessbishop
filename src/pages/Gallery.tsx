import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EchoText from '../effects/EchoText'
import AnimatedContent from '../effects/AnimatedContent'
import SplitText from '../effects/SplitText'
import SectionBackground from '../components/SectionBackground'
import { galleryItems, galleryCategories, GALLERY_PLACEHOLDER, type GalleryItem } from '../data/site'

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

function coverFor(g: GalleryItem) {
  return g.images.length
    ? `url(${g.images[0]}) center / cover no-repeat`
    : `url(${GALLERY_PLACEHOLDER}) center / 55% no-repeat`
}

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get('filter')
  const [filter, setFilter] = useState<string>(galleryCategories.includes(param as never) ? (param as string) : 'ALL')
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
              <AnimatedContent key={`${filter}-${g.slug}`} delay={i * 0.04} from={{ y: 22 }} className="masonry-item">
                <Link
                  to={`/gallery/${g.slug}`}
                  aria-label={`Open ${g.title} gallery`}
                  className="cb-gallery-tile"
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
                    textDecoration: 'none',
                    backgroundColor: '#0b0f0d',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: coverFor(g),
                      filter: g.images.length ? 'brightness(0.72)' : 'brightness(0.9)',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 35%, rgba(5,6,5,0.85))' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                    <div style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.3em', fontWeight: 700 }}>{g.category}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, marginTop: 4 }}>
                      <span className="cb-clamp-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.3 }}>{g.title}</span>
                      <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.18em', fontWeight: 700, flexShrink: 0 }}>VIEW →</span>
                    </div>
                  </div>
                </Link>
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
    </>
  )
}
