import { useState } from 'react'
import { Link } from 'react-router-dom'
import BlurText from '../effects/BlurText'
import AnimatedContent from '../effects/AnimatedContent'
import SectionBackground from '../components/SectionBackground'
import { sigaramPlans, sigaramFeatures, sigaramSteps, sigaramFaqs, sigaramSchoolBenefits } from '../data/site'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 }

export default function Sigaram64() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      {/* Sigaram64 — hero */}
      <section style={{ ...sectionStyle, minHeight: '92svh', display: 'flex', alignItems: 'center' }}>
        <SectionBackground />
        <div style={{ ...container, textAlign: 'center' }}>
          <AnimatedContent from={{ y: 14 }}>
            <span className="eyebrow eyebrow--center">A product of Chessbishop</span>
          </AnimatedContent>

          <AnimatedContent delay={0.1} from={{ y: 18 }}>
            <img
              src="/sigaram64-logo.png"
              alt="Sigaram64 logo"
              width={640}
              height={277}
              decoding="async"
              fetchPriority="high"
              style={{ width: 'min(420px, 72vw)', height: 'auto', margin: '34px auto 0', display: 'block' }}
            />
          </AnimatedContent>

          <BlurText
            as="h1"
            text={'MASTER THE 64\nSQUARES WITH AI'}
            delay={0.2}
            stagger={0.035}
            className="about-title"
          />

          <AnimatedContent delay={0.3} from={{ y: 20 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 640, margin: '30px auto 0', fontSize: 'clamp(15px, 1.2vw, 19px)', lineHeight: 1.8 }}>
              An AI-powered chess learning platform designed to help students
              think, analyze, and improve through personalized and adaptive learning.
            </p>
            <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(16px, 1.4vw, 22px)', marginTop: 22 }}>
              Chess + AI = Sigaram64
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 36, justifyContent: 'center' }}>
              <a href="#pricing" className="btn-gold">
                EXPLORE PLANS
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="https://sigaram64.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
                EXPLORE SIGARAM64
              </a>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Sigaram64 — platform introduction */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'center' }}>
          <AnimatedContent from={{ y: 24 }}>
            <span className="eyebrow">Platform Introduction</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>More Than Chess. It&apos;s Intelligent Learning.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 20, maxWidth: 520, fontSize: 'clamp(15px, 1.2vw, 18px)' }}>
              Sigaram64 combines chess education, artificial intelligence,
              game analysis, analytics, and adaptive learning to create
              a personalized learning experience for every student.
            </p>
          </AnimatedContent>

          <AnimatedContent delay={0.15} from={{ y: 26 }}>
            <div className="glass-card" style={{ padding: 'clamp(22px, 2.4vw, 32px)' }}>
              <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.28em' }}>STUDENT DASHBOARD</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 20 }}>
                {[
                  { k: 'Chess Rating', v: '1,240' },
                  { k: 'Games Played', v: '86' },
                  { k: 'Learning Progress', v: '72%' },
                  { k: 'Practice Streak', v: '12 days' },
                ].map((s) => (
                  <div key={s.k} className="cb-stat-card">
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 2vw, 30px)', color: 'var(--gold-soft)' }}>{s.v}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{s.k}</div>
                  </div>
                ))}
              </div>
              <div className="cb-stat-card" style={{ marginTop: 14 }}>
                <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.24em' }}>AI RECOMMENDATION</div>
                <div style={{ color: 'var(--ivory)', fontSize: 14, marginTop: 10, lineHeight: 1.6 }}>Review your rook endgames — 3 key patterns to practice this week.</div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Sigaram64 — core features */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <span className="eyebrow">Core Features</span>
            <h2 className="section-title" style={{ marginTop: 18, maxWidth: 640 }}>Everything You Need to Think Better and Play Smarter</h2>
          </AnimatedContent>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 48 }}>
            {sigaramFeatures.map((f, i) => (
              <AnimatedContent key={f.index} delay={i * 0.06} from={{ y: 26 }}>
                <div className="glass-card" style={{ padding: 'clamp(22px, 2.2vw, 30px)', height: '100%' }}>
                  <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '0.12em' }}>{f.index}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(19px, 1.6vw, 24px)', marginTop: 14 }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginTop: 12, fontSize: 'clamp(14px, 1.1vw, 16px)' }}>{f.copy}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Sigaram64 — how it works */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>Your Chess Journey in 4 Steps</h2>
          </AnimatedContent>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 48 }}>
            {sigaramSteps.map((s, i) => (
              <AnimatedContent key={s.index} delay={i * 0.07} from={{ y: 26 }}>
                <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 40, height: 40, borderRadius: 999, border: '1px solid var(--border-gold)', color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                      {s.index}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(18px, 1.5vw, 22px)' }}>{s.title}</h3>
                  </div>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginTop: 14, fontSize: 'clamp(14px, 1.1vw, 16px)' }}>{s.copy}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Sigaram64 — pricing */}
      <section id="pricing" style={{ ...sectionStyle, paddingTop: 0, scrollMarginTop: 90 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <span className="eyebrow eyebrow--center">Subscription Plans</span>
              <h2 className="section-title" style={{ marginTop: 18 }}>Choose Your Learning Journey</h2>
              <p style={{ color: 'var(--muted)', marginTop: 16, fontSize: 'clamp(15px, 1.2vw, 18px)' }}>
                Choose the Sigaram64 experience that fits your learning goals.
              </p>
            </div>
          </AnimatedContent>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 48, alignItems: 'stretch' }}>
            {sigaramPlans.map((p, i) => (
              <AnimatedContent key={p.name} delay={i * 0.08} from={{ y: 28 }}>
                <div
                  className="glass-card"
                  style={{
                    padding: 'clamp(26px, 2.6vw, 36px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: p.featured ? 'var(--border-gold)' : undefined,
                    boxShadow: p.featured ? '0 0 46px -14px rgba(216, 182, 106, 0.35)' : undefined,
                  }}
                >
                  <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.24em' }}>{p.badge}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 2.4vw, 34px)', marginTop: 14 }}>{p.name}</h3>
                  <div style={{ marginTop: 10 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(30px, 3vw, 42px)', color: 'var(--gold-soft)' }}>{p.price}</span>
                    <span style={{ color: 'var(--muted)', fontSize: 15 }}> {p.period}</span>
                  </div>
                  <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 15, lineHeight: 1.6 }}>{p.blurb}</p>
                  <ul style={{ listStyle: 'none', margin: '22px 0 0', padding: 0, display: 'grid', gap: 12, flex: 1 }}>
                    {p.features.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: 12, color: 'var(--ivory)', fontSize: 15, lineHeight: 1.55 }}>
                        <span aria-hidden="true" style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={p.featured ? 'btn-gold' : 'btn-outline'} style={{ marginTop: 28, justifyContent: 'center' }}>
                    SUBSCRIBE TO {p.name.toUpperCase()}
                  </Link>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Sigaram64 — school partnership */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <div className="cb-about-card">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'center' }}>
              <AnimatedContent from={{ y: 24 }}>
                <span className="eyebrow">School Partnership</span>
                <h2 className="section-title" style={{ marginTop: 18 }}>Bring AI-Powered Chess to Your School</h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 18, maxWidth: 520, fontSize: 'clamp(15px, 1.2vw, 18px)' }}>
                  Empower students with structured chess education, AI-powered
                  analysis, adaptive learning, and measurable learning experiences.
                </p>
                <Link to="/sigaram64/school" className="btn-gold" style={{ marginTop: 28 }}>
                  PARTNER WITH SIGARAM64
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </AnimatedContent>

              <AnimatedContent delay={0.12} from={{ y: 26 }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 14 }}>
                  {sigaramSchoolBenefits.map((b) => (
                    <li key={b} style={{ display: 'flex', gap: 12, color: 'var(--ivory)', fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.6 }}>
                      <span aria-hidden="true" style={{ color: 'var(--gold)', fontWeight: 700 }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      {/* Sigaram64 — FAQ */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, maxWidth: 860 }}>
          <AnimatedContent from={{ y: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <span className="eyebrow eyebrow--center">FAQ</span>
              <h2 className="section-title" style={{ marginTop: 18 }}>Questions, Answered</h2>
            </div>
          </AnimatedContent>

          <div style={{ marginTop: 44, display: 'grid', gap: 14 }}>
            {sigaramFaqs.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <AnimatedContent key={f.q} delay={i * 0.04} from={{ y: 18 }}>
                  <div className="glass-card" style={{ overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: 'clamp(18px, 2.2vw, 24px) clamp(20px, 2.6vw, 28px)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--ivory)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(16px, 1.4vw, 19px)',
                        textAlign: 'left',
                      }}
                    >
                      {f.q}
                      <span aria-hidden="true" style={{ color: 'var(--gold)', fontSize: 20, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>+</span>
                    </button>
                    {isOpen && (
                      <p style={{ color: 'var(--muted)', lineHeight: 1.75, margin: 0, padding: '0 clamp(20px, 2.6vw, 28px) clamp(20px, 2.4vw, 26px)', fontSize: 'clamp(14px, 1.1vw, 16px)' }}>
                        {f.a}
                      </p>
                    )}
                  </div>
                </AnimatedContent>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sigaram64 — final CTA */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, textAlign: 'center' }}>
          <AnimatedContent from={{ y: 24 }}>
            <h2 className="section-title">Think. Analyze. Master.</h2>
            <p style={{ color: 'var(--muted)', marginTop: 18, maxWidth: 560, marginInline: 'auto', fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.8 }}>
              Your next move is more than a move.
              It&apos;s an opportunity to think better.
            </p>
            <img
              src="/sigaram64-logo.png"
              alt="Sigaram64 logo"
              width={400}
              height={173}
              loading="lazy"
              decoding="async"
              style={{ width: 'min(300px, 60vw)', height: 'auto', margin: '30px auto 0', display: 'block' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 34, justifyContent: 'center' }}>
              <Link to="/contact" className="btn-gold">
                SUBSCRIBE NOW
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/sigaram64/school" className="btn-outline">PARTNER WITH YOUR SCHOOL</Link>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}