import { useState, type CSSProperties } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import DepthCarousel, { type DepthCarouselItem } from '../components/DepthCarousel'
import AnimatedContent from '../effects/AnimatedContent'
import { galleryItems } from '../data/site'

const sectionStyle: CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: CSSProperties = { maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2 }

const IMAGE_POOL = ['/chessbishop-emblem-v2.png']

export default function GalleryCarousel() {
  const [searchParams] = useSearchParams()
  const requested = Math.max(0, parseInt(searchParams.get('start') ?? '0', 10) || 0)
  const count = galleryItems.length
  const start = requested % count

  const ordered = [...galleryItems.slice(start), ...galleryItems.slice(0, start)]

  const items: DepthCarouselItem[] = ordered.map((g) => ({
    image: g.cover || IMAGE_POOL[0],
    alt: `${g.title} – ${g.category}`,
  }))

  const [active, setActive] = useState(0)
  const current = ordered[active]

  return (
    <section style={sectionStyle}>
      <div style={container}>
        <AnimatedContent from={{ y: 14 }}>
          <span className="eyebrow">Gallery</span>
        </AnimatedContent>
        <h1 className="section-title" style={{ marginTop: 20, maxWidth: 760 }}>
          THE DEPTH OF THE BOARD
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: 560, fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.75, marginTop: 16, marginBottom: 48 }}>
          Drag, scroll or use the arrows to walk through Chessbishop — every slide is a position we have lived.
        </p>

        <AnimatedContent from={{ y: 26 }}>
          <div style={{ position: 'relative', height: 'clamp(420px, 58vw, 620px)' }}>
            <DepthCarousel
              items={items}
              cardWidth={320}
              cardHeight={400}
              autoplay
              autoplayDelay={3600}
              tint="rgba(5, 11, 8, 0.72)"
              onChange={(idx) => setActive(idx)}
            />
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.15} from={{ y: 16 }}>
          <div role="status" aria-live="polite" style={{ textAlign: 'center', marginTop: 34 }}>
            <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.35em', fontWeight: 700 }}>{current?.category}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.4vw, 30px)', marginTop: 8 }}>{current?.title}</div>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.25} from={{ y: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
            <Link to="/gallery" className="btn-outline">
              BACK TO GALLERY
            </Link>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}