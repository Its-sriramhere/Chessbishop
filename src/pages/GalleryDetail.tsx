import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import AnimatedContent from '../effects/AnimatedContent'
import SectionBackground from '../components/SectionBackground'
import InfiniteSpiral from '../components/InfiniteSpiral'
import AccordionGallery from '../components/AccordionGallery'
import DriftWall, { type DriftWallItem } from '../components/DriftWall'
import { getGalleryBySlug, GALLERY_PLACEHOLDER } from '../data/site'

const sectionStyle: CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: CSSProperties = { maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 2 }

type DriftConfig = {
  columns: number
  tileWidth: number
  tileHeight: number
  gap: number
  height: string
  tilt: number
  turn: number
  fade: number
}

const DEFAULT_DRIFT: DriftConfig = {
  columns: 5,
  tileWidth: 220,
  tileHeight: 150,
  gap: 18,
  height: 'clamp(420px, 52vw, 640px)',
  tilt: 14,
  turn: -12,
  fade: 0.72,
}

function useDriftConfig() {
  const [config, setConfig] = useState<DriftConfig>(DEFAULT_DRIFT)

  useEffect(() => {
    const small = window.matchMedia('(max-width: 640px)')
    const medium = window.matchMedia('(max-width: 1024px)')
    const update = () => {
      if (small.matches) {
        setConfig({
          columns: 4,
          tileWidth: 150,
          tileHeight: 100,
          gap: 14,
          height: 'clamp(560px, 150vw, 660px)',
          tilt: 8,
          turn: -5,
          fade: 0.58,
        })
      } else if (medium.matches) {
        setConfig({
          columns: 4,
          tileWidth: 200,
          tileHeight: 135,
          gap: 18,
          height: 'clamp(520px, 64vw, 680px)',
          tilt: 11,
          turn: -9,
          fade: 0.66,
        })
      } else {
        setConfig(DEFAULT_DRIFT)
      }
    }
    update()
    small.addEventListener('change', update)
    medium.addEventListener('change', update)
    return () => {
      small.removeEventListener('change', update)
      medium.removeEventListener('change', update)
    }
  }, [])

  return config
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 26,
        minHeight: 'clamp(320px, 44vw, 520px)',
        borderRadius: 24,
        border: '1px solid var(--border)',
        background: 'radial-gradient(120% 120% at 50% 0%, rgba(216, 182, 106, 0.08), transparent 60%), rgba(244, 240, 230, 0.03)',
        padding: 32,
        textAlign: 'center',
      }}
    >
      <img
        src={GALLERY_PLACEHOLDER}
        alt=""
        width={150}
        height={150}
        style={{ width: 'clamp(110px, 16vw, 160px)', height: 'auto', filter: 'drop-shadow(0 0 34px rgba(216, 182, 106, 0.35))' }}
      />
      <div>
        <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.35em', fontWeight: 700 }}>PHOTOS COMING SOON</div>
        <p style={{ color: 'var(--muted)', marginTop: 10, maxWidth: 420, lineHeight: 1.7 }}>
          We are curating the archive for {title}. Check back shortly.
        </p>
      </div>
    </div>
  )
}

export default function GalleryDetail() {
  const { slug = '' } = useParams()
  const item = getGalleryBySlug(slug)
  const drift = useDriftConfig()
  const [lightIdx, setLightIdx] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const touchX = useRef<number | null>(null)

  useEffect(() => {
    if (item) document.title = `${item.title} – Chessbishop`
  }, [item])

  const images = item?.images ?? []

  const driftItems = useMemo<DriftWallItem[]>(
    () => images.map((src, i) => ({ image: src, title: `${item?.title ?? 'Gallery'} ${i + 1}` })),
    [images, item],
  )

  const spiralItems = useMemo(
    () => images.map((src, i) => ({ src, alt: `${item?.title ?? 'Gallery'} photo ${i + 1}` })),
    [images, item],
  )

  useEffect(() => {
    if (lightIdx === null) return
    const previous = document.activeElement as HTMLElement | null
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightIdx(null)
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setLightIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setLightIdx((prev) => (prev !== null ? (prev + 1) % images.length : null))
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
  }, [lightIdx, images.length])

  if (!item) return <Navigate to="/gallery" replace />

  const hasImages = images.length > 0

  return (
    <>
      <section style={{ ...sectionStyle, paddingBottom: 'clamp(40px, 6vw, 80px)' }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 14 }}>
            <Link to="/gallery" className="eyebrow" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span aria-hidden="true">←</span> Back to gallery
            </Link>
          </AnimatedContent>
          <AnimatedContent from={{ y: 18 }} delay={0.08}>
            <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.35em', fontWeight: 700, marginTop: 26 }}>{item.category}</div>
            <h1 className="section-title" style={{ marginTop: 14, maxWidth: 980 }}>{item.title}</h1>
          </AnimatedContent>
        </div>
      </section>

      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          {!hasImages && <ComingSoon title={item.title} />}

          {hasImages && item.viewer === 'drift' && (
            <AnimatedContent from={{ y: 24 }}>
              <div style={{ position: 'relative', height: drift.height, borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <DriftWall
                  items={driftItems}
                  columns={drift.columns}
                  tileWidth={drift.tileWidth}
                  tileHeight={drift.tileHeight}
                  gap={drift.gap}
                  radius={14}
                  tilt={drift.tilt}
                  turn={drift.turn}
                  roll={0}
                  perspective={1200}
                  depth={120}
                  speed={38}
                  direction="up"
                  variance={0.45}
                  parallax={0.6}
                  pauseOnHover={false}
                  lift={70}
                  fade={drift.fade}
                  dim={0.78}
                  grayscale={false}
                  overlayColor="#050605"
                />
              </div>
            </AnimatedContent>
          )}

          {hasImages && item.viewer === 'spiral' && (
            <AnimatedContent from={{ y: 24 }}>
              <div style={{ position: 'relative', height: '600px', overflow: 'hidden', borderRadius: 24, border: '1px solid var(--border)' }}>
                <InfiniteSpiral
                  items={spiralItems}
                  animationMode="all"
                  speed={0.55}
                  radius={170}
                  cardWidth={100}
                  cardHeight={100}
                  verticalSpacing={60}
                  perspective={1000}
                  cardRadius={10}
                  centerScale={1.2}
                  edgeBlur={6}
                  cardsPerTurn={7}
                  pauseOnHover
                  direction="down"
                />
              </div>
            </AnimatedContent>
          )}

          {hasImages && item.viewer === 'accordion' && (
            <AnimatedContent from={{ y: 24 }}>
              <div className="cb-accordion-frame">
                <AccordionGallery
                  items={images.map((src, i) => ({
                    image: src,
                    alt: `${item.title} photo ${i + 1} of ${images.length}`,
                  }))}
                  defaultIndex={0}
                  showLabels={false}
                  gap={6}
                  radius={14}
                  height={520}
                  expandRatio={0.5}
                  accentColor="#d8b66a"
                  overlayColor="#050605"
                  textColor="#f4f0e6"
                  label={`${item.title} photo gallery`}
                />
              </div>
            </AnimatedContent>
          )}

          {hasImages && item.viewer === 'grid' && (
            <div className="gallery-masonry">
              {images.map((src, i) => (
                <AnimatedContent key={src} delay={i * 0.03} from={{ y: 20 }} className="masonry-item">
                  <button
                    type="button"
                    onClick={() => setLightIdx(i)}
                    aria-label={`Open ${item.title} image ${i + 1} of ${images.length}`}
                    className="cb-gallery-tile"
                    style={{ display: 'block', width: '100%', padding: 0, border: 'none', borderRadius: 18, overflow: 'hidden', position: 'relative', cursor: 'zoom-in', aspectRatio: i % 3 === 0 ? '3/4' : '4/3', background: 'none' }}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82)' }} />
                  </button>
                </AnimatedContent>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightIdx !== null && hasImages && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal
          aria-label={`${item.title}, image ${lightIdx + 1} of ${images.length}`}
          tabIndex={-1}
          onClick={() => setLightIdx(null)}
          className="cb-lightbox"
          style={{ animation: 'page-enter 0.4s ease both' }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            touchX.current = null
            if (Math.abs(dx) < 45) return
            setLightIdx((prev) => (prev !== null ? (prev + (dx < 0 ? 1 : -1) + images.length) % images.length : null))
          }}
        >
          <button onClick={() => setLightIdx(null)} type="button" aria-label="Close lightbox" className="cb-lightbox-btn cb-lightbox-btn--close">
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null)) }}
            type="button"
            aria-label="Previous image"
            className="cb-lightbox-btn cb-lightbox-btn--prev"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightIdx((prev) => (prev !== null ? (prev + 1) % images.length : null)) }}
            type="button"
            aria-label="Next image"
            className="cb-lightbox-btn cb-lightbox-btn--next"
          >
            →
          </button>
          <span aria-hidden="true" className="cb-lightbox-count">
            {lightIdx + 1} / {images.length}
          </span>
          <img
            onClick={(e) => e.stopPropagation()}
            src={images[lightIdx]}
            alt={`${item.title} image ${lightIdx + 1}`}
            className="cb-lightbox-img"
            style={{ animation: 'page-enter 0.35s ease both' }}
          />
        </div>
      )}
    </>
  )
}
