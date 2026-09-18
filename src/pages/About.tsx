import { ArrowUpRight, BrainCircuit, GraduationCap, MapPinned } from 'lucide-react'
import BlurText from '../effects/BlurText'
import AnimatedContent from '../effects/AnimatedContent'
import SectionBackground from '../components/SectionBackground'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 }

export default function About() {
  return (
    <>
      {/* About — header */}
      <section style={{ ...sectionStyle, minHeight: '78svh', display: 'flex', alignItems: 'center' }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 14 }}>
            <span className="eyebrow">About Chessbishop</span>
          </AnimatedContent>

          <BlurText
            as="h1"
            text={'BUILDING MINDS\nTHROUGH THE GAME\nOF CHESS.'}
            delay={0.2}
            stagger={0.035}
            className="about-title"
          />

          <AnimatedContent delay={0.3} from={{ y: 20 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 620, fontSize: 'clamp(16px, 1.2vw, 19px)', lineHeight: 1.8, marginTop: 30 }}>
              Chessbishop is a privately held LLP dedicated to making structured chess education accessible to students. Through government
              partnerships, the organization provides chess coaching to corporation school students across Tamil Nadu.
            </p>
            <p style={{ color: 'var(--muted)', maxWidth: 620, fontSize: 'clamp(16px, 1.2vw, 19px)', lineHeight: 1.8, marginTop: 18 }}>
              Established in 2021, Chessbishop has been working to expand access to quality chess education through structured coaching
              programs, with its initiatives currently reaching students across four districts in Tamil Nadu.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* About — story + Sigaram64 */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container }} className="cb-about-grid">
          <AnimatedContent className="cb-about-story" delay={0.1} from={{ y: 28 }} style={{ minWidth: 0 }}>
            <div className="cb-about-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <span className="cb-icon-badge">
                <GraduationCap size={22} />
              </span>

              <h2 className="section-title" style={{ marginTop: 26, fontSize: 'clamp(24px, 3vw, 42px)' }}>
                FROM CLASSROOMS TO COMMUNITIES.
              </h2>

              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 20, maxWidth: 560 }}>
                Chessbishop combines structured chess coaching with accessible educational initiatives to help students develop strategic
                thinking, concentration and problem-solving abilities through the game of chess.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 16, maxWidth: 560 }}>
                Through government tie-ups, Chessbishop provides chess coaching to corporation school students and has been carrying out these
                initiatives for the past two years.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginTop: 36 }}>
                <div className="cb-stat-card">
                  <MapPinned size={19} style={{ color: 'var(--gold)' }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 2.4vw, 34px)', marginTop: 16 }}>04</div>
                  <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Districts across Tamil Nadu</div>
                </div>
                <div className="cb-stat-card">
                  <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.24em' }}>ESTABLISHED</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 2.4vw, 34px)', marginTop: 16 }}>2021</div>
                  <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Chessbishop LLP</div>
                </div>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent className="cb-about-tech" delay={0.2} from={{ y: 28 }} style={{ minWidth: 0 }}>
            <a
              href="https://sigaram64.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cb-sigaram"
              aria-label="Explore Sigaram64, Chessbishop's AI-powered chess learning platform (opens in a new tab)"
            >
              <div aria-hidden="true" className="cb-sigaram-grid" />
              <div aria-hidden="true" className="cb-sigaram-glow" />

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="cb-icon-badge" style={{ background: 'rgba(216,182,106,0.12)' }}>
                      <BrainCircuit size={22} />
                    </span>
                    <span className="cb-sigaram-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>

                  <div style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
                    <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.28em' }}>OUR TECHNOLOGY</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px, 3.4vw, 46px)', marginTop: 14 }}>Sigaram64</h3>
                    <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 18, maxWidth: 420 }}>
                      Sigaram64 is Chessbishop's AI-powered chess learning platform, designed to make chess education more interactive,
                      accessible and personalized for learners.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40, color: 'var(--ivory)', fontWeight: 600, fontSize: 14 }}>
                  <span>Explore Sigaram64</span>
                  <span aria-hidden="true" className="cb-sigaram-cta-arrow" style={{ color: 'var(--gold)' }}>→</span>
                </div>
              </div>
            </a>
          </AnimatedContent>
        </div>
      </section>

      {/* About — founder */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent delay={0.15} from={{ y: 26 }}>
            <div className="cb-about-card">
              <div className="cb-founder-grid">
                <img
                  src="/people/founder.jpg"
                  alt="Dr. S. A. Suryakumar"
                  width={188}
                  height={235}
                  loading="lazy"
                  decoding="async"
                  className="cb-founder-photo"
                />

                <div>
                  <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.28em' }}>FOUNDER</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 40px)', marginTop: 16 }}>
                    Dr. S. A. Suryakumar
                  </h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 18, maxWidth: 680 }}>
                    Dr. S. A. Suryakumar is the founder of Chessbishop, with a vision to combine structured chess education, technology and
                    accessible learning opportunities to help develop the next generation of thinkers.
                  </p>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 16, maxWidth: 680 }}>
                    Dr. S. A. Suryakumar is a FIDE National Instructor and International FIDE-Rated Player with 12+ years of coaching
                    experience. Combining deep emotional intelligence with structured chess methodology, he personalises every training
                    journey for measurable improvement.
                  </p>

                  <div className="cb-founder-experience">
                    <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.28em' }}>EXPERIENCE</div>
                    <div className="cb-founder-years">12+ years coaching</div>
                    <ul>
                      <li>
                        <span aria-hidden="true" className="cb-founder-exp-mark">✦</span>
                        International FIDE-Rated Player
                      </li>
                      <li>
                        <span aria-hidden="true" className="cb-founder-exp-mark">✦</span>
                        Structured 1-on-1 &amp; Small Group Coaching
                      </li>
                      <li>
                        <span aria-hidden="true" className="cb-founder-exp-mark">✦</span>
                        Tournament Preparation &amp; Personalised Training
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="cb-founder-credentials">
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>FNI</div>
                  <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.9, marginTop: 8 }}>
                    PhD — Emotional Intelligence
                    <br />
                    Europe
                    <br />
                    MBA
                    <br />
                    FIDE Rated
                    <br />
                    India
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}
