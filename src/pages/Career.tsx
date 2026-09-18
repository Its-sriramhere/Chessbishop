import { useState } from 'react'
import { Link } from 'react-router-dom'
import BlurText from '../effects/BlurText'
import SplitText from '../effects/SplitText'
import AnimatedContent from '../effects/AnimatedContent'
import SpotlightCard from '../effects/SpotlightCard'
import ChessbishopReveal from '../effects/ChessbishopReveal'
import SectionBackground from '../components/SectionBackground'
import { careers } from '../data/site'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 2 }

const whyCards = [
  { title: 'CHESS', copy: 'Work around a game that challenges every day. Every lesson is a new position, a new puzzle, a new idea.', lead: true },
  { title: 'IMPACT', copy: 'Help players grow, from their first fork to their first national title.', lead: false },
  { title: 'PEOPLE', copy: 'Work with a passionate community of coaches, creators and competitors.', lead: false },
  { title: 'GROWTH', copy: 'Learn, experiment and build. Chessbishop is a place for people who keep getting better.', lead: false },
]

export default function Career() {
  const [open, setOpen] = useState<string | null>(careers[0].id)

  return (
    <>
      {/* Hero */}
      <section style={{ ...sectionStyle, minHeight: '80svh', display: 'flex', alignItems: 'center' }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 14 }}>
            <span className="eyebrow">Career</span>
          </AnimatedContent>
          <BlurText as="h1" text={'BUILD THE\nFUTURE OF CHESS\nWITH US.'} delay={0.25} className="about-title" />
          <AnimatedContent delay={1} from={{ y: 20 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 560, fontSize: 'clamp(16px, 1.2vw, 19px)', lineHeight: 1.75, marginTop: 28 }}>
              We're looking for people who care about chess, education, technology and building meaningful experiences.
            </p>
          </AnimatedContent>
          <AnimatedContent delay={1.3} from={{ y: 18 }}>
            <a href="#positions" className="btn-gold" style={{ marginTop: 40 }}>
              VIEW OPENINGS
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </AnimatedContent>
        </div>
      </section>

      {/* Why Chessbishop */}
      <section style={{ ...sectionStyle, paddingTop: 20 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <span className="eyebrow">Why Chessbishop</span>
            <h2 className="section-title" style={{ marginTop: 18, maxWidth: 620 }}>MORE THAN A JOB. A MOVE UP.</h2>
          </AnimatedContent>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'clamp(130px, 12vw, 170px)', gap: 18, marginTop: 48 }}>
            {whyCards.map((c, i) => {
              const span = c.lead ? 'span 7' : 'span 5'
              return (
                <AnimatedContent key={c.title} delay={i * 0.07} from={{ y: 26 }} style={{ gridColumn: span, gridRow: 'span 1', minWidth: 0 }}>
                  <SpotlightCard className="glass-card" style={{ height: '100%' }} spotlightColor={c.lead ? 'rgba(216, 182, 106, 0.14)' : 'rgba(99, 169, 133, 0.12)'}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: c.lead ? 'clamp(24px, 2.4vw, 34px)' : 'clamp(18px, 1.8vw, 24px)' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 1.5vw, 24px)', letterSpacing: '0.08em' }}>{c.title}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: 'clamp(13px, 0.95vw, 15px)', lineHeight: 1.7, marginTop: 'auto', paddingTop: 10, maxWidth: 400 }}>{c.copy}</p>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ ...sectionStyle, paddingTop: 30 }} id="positions">
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <span className="eyebrow">Open Positions</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>CURRENT ROLES</h2>
          </AnimatedContent>

          <div style={{ marginTop: 40 }}>
            {careers.map((role, i) => {
              const isOpen = open === role.id
              return (
                <AnimatedContent key={role.id} delay={i * 0.06} from={{ y: 20 }} style={{ marginBottom: 14 }}>
                  <div className="glass-card" style={{ overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : role.id)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: 'clamp(18px, 2.4vw, 26px) clamp(20px, 2.6vw, 30px)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'inherit',
                      minHeight: 44,
                    }}
                  >
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 1.8vw, 28px)', letterSpacing: '0.04em' }}>{role.title}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 8 }}>
                        {role.employment} <span aria-hidden="true">•</span> {role.mode}
                      </p>
                    </div>
                    <span style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {isOpen ? 'CLOSE −' : 'VIEW ROLE →'}
                    </span>
                  </button>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.5s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    <div style={{ overflow: 'hidden', minHeight: 0 }}>
                      <div style={{ padding: '0 clamp(20px, 2.6vw, 30px) clamp(24px, 2.6vw, 32px)' }}>
                        <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />
                        <p style={{ color: 'var(--ivory)', maxWidth: 640, lineHeight: 1.75 }}>{role.description}</p>
                        <ul style={{ color: 'var(--muted)', margin: '16px 0 0', paddingLeft: 18, gap: 10, display: 'grid', listStyle: 'none' }}>
                          {role.requirements.map((r) => (
                            <li key={r} style={{ paddingLeft: 18, position: 'relative' }}>
                              <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '0.6em', width: 5, height: 5, background: 'var(--gold)', borderRadius: 1 }} />
                              {r}
                            </li>
                          ))}
                        </ul>
                        <a href="mailto:teamchessbishop@gmail.com" className="btn-gold" style={{ marginTop: 26 }}>
                          APPLY NOW
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                </AnimatedContent>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section style={{ ...sectionStyle, paddingTop: 30 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 22 }}>
            <div className="cb-about-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="eyebrow">Join Our Team</span>
              <h2 className="section-title" style={{ marginTop: 18 }}>BECOME A CHESSBISHOP COACH</h2>
              <p style={{ color: 'var(--muted)', marginTop: 18, maxWidth: 560, lineHeight: 1.8 }}>
                Share your chess expertise and help develop the next generation of chess players.
              </p>
              <Link to="/career/apply" className="btn-gold" style={{ marginTop: 34 }}>
                APPLY AS A CHESS COACH
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Culture */}
      <section style={{ ...sectionStyle, textAlign: 'center' }}>
        <SectionBackground />
        <div style={container}>
          <ChessbishopReveal label="The Culture" />
          <h2 className="section-title" style={{ marginTop: 40 }}>
            <SplitText>{"WE DON'T JUST BUILD CHESS PLAYERS.\nWE BUILD PEOPLE WHO KEEP LEARNING."}</SplitText>
          </h2>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...sectionStyle, textAlign: 'center', paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <h3 className="section-title" style={{ fontSize: 'clamp(22px, 3vw, 42px)' }}>
            DON'T SEE YOUR ROLE?<br />
            <span style={{ color: 'var(--gold-soft)' }}>WE'D STILL LIKE TO HEAR FROM YOU.</span>
          </h3>
          <AnimatedContent delay={0.25} from={{ y: 18 }}>
            <Link to="/contact" className="btn-gold" style={{ marginTop: 40 }}>
              SEND YOUR PROFILE
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}