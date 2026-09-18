import { Link } from 'react-router-dom'
import Aurora from '../effects/Aurora'
import Particles from '../effects/Particles'
import BlurText from '../effects/BlurText'
import SplitText from '../effects/SplitText'
import AnimatedContent from '../effects/AnimatedContent'
import CountUp from '../effects/CountUp'
import SpotlightCard from '../effects/SpotlightCard'
import ScrollStack from '../effects/ScrollStack'
import ChessbishopReveal from '../effects/ChessbishopReveal'
import SectionBackground from '../components/SectionBackground'
import { galleryItems, GALLERY_PLACEHOLDER, reviews } from '../data/site'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 }

const features = [
  {
    title: 'TRAINING',
    copy: 'Structured programmes for every level, from first principles to advanced tournament preparation.',
    lead: true,
  },
  {
    title: 'COACHING',
    copy: 'Learn from experienced chess professionals who treat every student like a contender.',
  },
  {
    title: 'COMPETITION',
    copy: 'Prepare with purpose: calculation, openings and endgame mastery.',
  },
  {
    title: 'DEVELOPMENT',
    copy: 'Build skills beyond the board: discipline, patience and decision-making.',
  },
]

const stats = [
  { value: 10000, suffix: '+', label: 'Students' },
  { value: 25, suffix: '+', label: 'Coaches' },
  { value: 40, suffix: '+', label: 'Countries' },
]

export default function Home() {
  return (
    <>
      {/* SECTION 01 — Cinematic Hero */}
      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/bg-image.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'ken-burns 26s ease-in-out infinite alternate',
            opacity: 1,
          }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,6,5,0.35) 0%, rgba(5,6,5,0.75) 55%, #050605 100%)' }} />
        <div aria-hidden="true" className="chess-grid-grid" style={{ position: 'absolute', inset: 0, maskImage: 'radial-gradient(1000px 640px at 50% 45%, black, transparent 78%)', WebkitMaskImage: 'radial-gradient(1000px 640px at 50% 45%, black, transparent 78%)' }} />
        <Aurora intensity={0.55} />
        <Particles count={40} />

        <div style={{ ...container, paddingBlock: 'clamp(120px, 18vh, 200px)', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', alignItems: 'center' }}>
          <div className="hero-statement">
          <AnimatedContent delay={0.3} from={{ y: 16, opacity: 0 }}>
            <span className="eyebrow">The Art Of Chess</span>
          </AnimatedContent>

          <BlurText
            as="h1"
            text="MASTER THE GAME."
            delay={0.25}
            stagger={0.045}
            duration={0.8}
            className="hero-title"
          />

          <AnimatedContent delay={1.1} from={{ y: 24, opacity: 0 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 520, fontSize: 'clamp(15px, 1.4vw, 19px)', lineHeight: 1.7, marginTop: 30 }}>
              Build sharper calculation, stronger decision-making and a deeper understanding of the game.
            </p>
          </AnimatedContent>

          <AnimatedContent delay={1.45} from={{ y: 18, opacity: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 40 }}>
              <Link to="/contact" className="btn-gold">
                START YOUR JOURNEY
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/about" className="btn-outline">EXPLORE CHESSBISHOP</Link>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={1.8} from={{ y: 20, opacity: 0 }}>
            <div style={{ display: 'flex', gap: 0, marginTop: 56, flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    paddingRight: 'clamp(28px, 4vw, 64px)',
                    marginRight: 'clamp(28px, 4vw, 64px)',
                    borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div className="stat-number" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3vw, 40px)', color: 'var(--gold-soft)' }}>
                    <CountUp to={s.value} separator="," />
                    {s.suffix}
                  </div>
                  <div style={{ color: 'var(--muted)', letterSpacing: '0.24em', fontSize: 12, marginTop: 6, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedContent>
          </div>
        </div>
      </section>

      {/* SECTION 02 — Brand Statement */}
      <section style={sectionStyle}>
        <SectionBackground />
        <div style={container}>
          <ChessbishopReveal label="The Chessbishop Standard" />
          <h2 className="section-title" style={{ textAlign: 'center', marginTop: 40 }}>
            <SplitText delay={0.1}>{'CHESS IS MORE\nTHAN A GAME.'}</SplitText>
          </h2>
          <p style={{ textAlign: 'center', marginTop: 22, color: 'var(--muted)', fontSize: 'clamp(15px, 1.4vw, 19px)', fontFamily: 'var(--font-display)', fontStyle: 'italic', textWrap: 'balance' }}>
            <SplitText delay={0.35} stagger={0.1}>IT IS THE DISCIPLINE OF THINKING AHEAD.</SplitText>
          </p>
        </div>
      </section>

      {/* SECTION 03 — What Chessbishop Does */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <span className="eyebrow">What Chessbishop Does</span>
            <h2 className="section-title" style={{ marginTop: 18, maxWidth: 640 }}>
              BUILT AROUND ONE IDEA: <span className="text-gold-shine">BETTER CHESS BEGINS WITH BETTER THINKING.</span>
            </h2>
          </AnimatedContent>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridAutoRows: 'clamp(118px, 12vw, 150px)',
              gap: 20,
              marginTop: 56,
            }}
          >
            {features.map((f, i) => {
              const lead = f.lead
              const span = lead ? 'span 7' : 'span 5'
              const rows = lead ? 'span 3' : 'span 1'
              return (
                <AnimatedContent
                  key={f.title}
                  delay={i * 0.07}
                  from={{ y: 26 }}
                  style={{ gridColumn: span, gridRow: rows, minWidth: 0 }}
                >
                  <SpotlightCard
                    className="glass-card"
                    style={{ height: '100%' }}
                    spotlightColor={lead ? 'rgba(99, 169, 133, 0.16)' : 'rgba(216, 182, 106, 0.12)'}
                  >
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: lead ? 'clamp(28px, 3vw, 44px)' : 'clamp(20px, 1.8vw, 26px)' }}>
                      <span className="text-gold" style={{ font: '700 11px / 1 var(--font-body)', letterSpacing: '0.32em' }}>
                        {f.title}
                      </span>
                      <p
                        style={{
                          color: 'var(--muted)',
                          marginTop: lead ? 'auto' : 10,
                          fontSize: lead ? 'clamp(17px, 1.5vw, 22px)' : 'clamp(13px, 0.95vw, 15px)',
                          lineHeight: 1.7,
                          maxWidth: lead ? 420 : 360,
                        }}
                      >
                        {f.copy}
                      </p>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 04 — Chessbishop Experience */}
      <section style={{ ...sectionStyle, paddingTop: 40 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <div>
              <span className="eyebrow">The Chessbishop Experience</span>
              <h2 className="section-title" style={{ marginTop: 18, maxWidth: 560 }}>
                THE <span className="text-gold-shine">CHESSBISHOP</span> METHOD
              </h2>
            </div>
          </AnimatedContent>
          <div style={{ marginTop: 60 }}>
            <ScrollStack
              cards={[
                { title: 'UNDERSTAND', subtitle: 'Position', description: 'Learn the language of the position: structure, plans and the ideas behind every move.' },
                { title: 'CALCULATE', subtitle: 'Precision', description: 'Develop precision. Calculate variations with clear priorities and clean execution.' },
                { title: 'EXECUTE', subtitle: 'Temperament', description: 'Convert your advantage calmly. Build endgame confidence and tournament temperament.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 05 — Gallery Preview */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <AnimatedContent from={{ y: 20 }}>
              <span className="eyebrow">Life At Chessbishop</span>
              <h2 className="section-title" style={{ marginTop: 18, maxWidth: 560 }}>MOMENTS ON AND OFF THE BOARD.</h2>
            </AnimatedContent>
            <AnimatedContent from={{ y: 20, opacity: 0 }} delay={0.15}>
              <Link to="/gallery" className="btn-outline">
                VIEW FULL GALLERY
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </AnimatedContent>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: 'clamp(140px, 16vw, 220px)', gap: 14, marginTop: 48, gridAutoFlow: 'dense' }}>
            {galleryItems.slice(0, 8).map((g, i) => (
              <AnimatedContent
                key={`${g.title}-${i}`}
                delay={i * 0.06}
                from={{ y: 24 }}
                style={{ gridColumn: g.tall ? 'span 2' : 'span 1', gridRow: g.tall ? 'span 2' : 'span 1', minWidth: 0 }}
              >
                <Link
                  to={`/gallery/${g.slug}`}
                  className="cb-gallery-tile"
                  aria-label={`${g.title}, ${g.category}`}
                  style={{ position: 'relative', display: 'block', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 18, border: '1px solid var(--border)', textDecoration: 'none', backgroundColor: '#0b0f0d' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: g.images.length ? `url(${g.cover}) center / cover no-repeat` : `url(${GALLERY_PLACEHOLDER}) center / 52% no-repeat`,
                      transform: 'scale(1.001)',
                      filter: g.images.length ? 'brightness(0.72)' : 'brightness(0.9)',
                    }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(5,6,5,0.85))', opacity: 0.9 }} />
                  <div style={{ position: 'absolute', left: 14, bottom: 12, right: 14 }}>
                    <div style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: '0.3em', fontWeight: 700 }}>{g.category}</div>
                    <div className="cb-clamp-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px, 1.2vw, 19px)', marginTop: 4, lineHeight: 1.3 }}>{g.title}</div>
                  </div>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06 — Testimonials */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <span className="eyebrow">Testimonials</span>
            <h2 className="section-title" style={{ marginTop: 18, maxWidth: 560 }}>WHAT PEOPLE SAY.</h2>
          </AnimatedContent>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 48 }}>
            {reviews.map((r, i) => (
              <AnimatedContent key={r.name} delay={i * 0.06} from={{ y: 26 }}>
                <div className="glass-card cb-review-card" style={{ padding: 'clamp(22px, 2.2vw, 32px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: 'var(--ivory)', fontSize: 'clamp(14px, 1.05vw, 16px)', lineHeight: 1.75, marginTop: 0, flex: 1, textWrap: 'balance' }}>
                    “{r.quote}”
                  </p>
                  <div style={{ borderTop: '1px solid var(--border)', marginTop: 22, paddingTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={r.image}
                      alt=""
                      width={46}
                      height={46}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        objectFit: 'cover',
                        border: '1px solid var(--border-gold)',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: '0.02em' }}>{r.name}</div>
                      <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 07 — Final CTA */}
      <section style={{ ...sectionStyle, overflow: 'hidden' }}>
        <SectionBackground />
        <ChessbishopReveal label="Your Move" />
        <div style={{ ...container, textAlign: 'center', paddingTop: 40 }}>
          <h2 className="section-title">
            <SplitText>{'YOUR\nNEXT MOVE\nSTARTS HERE.'}</SplitText>
          </h2>
          <AnimatedContent delay={0.3} from={{ y: 20 }}>
            <div style={{ marginTop: 40 }}>
              <Link to="/contact" className="btn-gold" style={{ padding: '20px 42px', fontSize: 15 }}>
                JOIN CHESSBISHOP
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}