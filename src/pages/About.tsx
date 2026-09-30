import { ArrowUpRight, BrainCircuit, GraduationCap, MapPinned } from 'lucide-react'
import BlurText from '../effects/BlurText'
import AnimatedContent from '../effects/AnimatedContent'
import SectionBackground from '../components/SectionBackground'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 }

const crewMembers: { name: string; role: string; photo?: string; initials?: string }[] = [
  { name: 'Vimal R', role: 'Chief Operating Officer (COO)', photo: '/people/vimal.jpg' },
  { name: 'Sriram V', role: 'AI Technician & Developer', photo: '/people/sriram.jpg' },
  { name: 'Praneet S', role: 'AI Technician & Developer', photo: '/people/praneet.jpg' },
  { name: 'Anand N', role: 'AI Technician & Developer', photo: '/people/anand.jpg' },
]

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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14 }}>
                      <img
                        src="/sigaram64-icon.png"
                        alt="Sigaram64 logo"
                        width={54}
                        height={54}
                        loading="lazy"
                        decoding="async"
                        style={{ borderRadius: 14, border: '1px solid var(--border-gold)', display: 'block', flexShrink: 0 }}
                      />
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px, 3.4vw, 46px)' }}>Sigaram64</h3>
                    </div>
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

      {/* About — collaborating corporations */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, textAlign: 'center' }}>
          <AnimatedContent from={{ y: 20 }}>
            <h2 className="section-title" style={{ maxWidth: 720, marginInline: 'auto' }}>Collaborating with Leading Corporations</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 22, maxWidth: 780, marginInline: 'auto', fontSize: 'clamp(15px, 1.2vw, 18px)' }}>
              We are proud to collaborate with local government corporations across Tamil Nadu to bring innovative chess education,
              AI-powered learning, and cognitive development programs to students and communities.
            </p>
          </AnimatedContent>

          <AnimatedContent delay={0.1} from={{ y: 20 }}>
            <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.28em', marginTop: 56 }}>
              OUR COLLABORATIONS
            </div>
          </AnimatedContent>

          <div className="cb-corp-strip" style={{ marginTop: 36 }}>
            {[
              { name: 'Coimbatore Corporation', logo: '/corporations/coimbatore.png' },
              { name: 'Tiruppur Corporation', logo: '/corporations/tirupur.png' },
              { name: 'Tambaram Corporation', logo: '/corporations/tambaram.png' },
              { name: 'Nagapattinam Corporation', logo: '/corporations/nagapattinam.png' },
            ].map((c, i) => (
              <AnimatedContent key={c.name} delay={0.08 + i * 0.06} from={{ y: 22 }} className="cb-corp-item">
                <div className="cb-corp-tile">
                  <img src={c.logo} alt={`${c.name} logo`} width={200} height={200} loading="lazy" decoding="async" className="cb-corp-logo" />
                </div>
                <div className="cb-corp-name">{c.name}</div>
              </AnimatedContent>
            ))}
          </div>

          <AnimatedContent delay={0.25} from={{ y: 20 }}>
            <div className="cb-crew-quote">“Building better thinkers today for a smarter society tomorrow.”</div>
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
                  <p style={{ color: 'var(--ivory)', fontWeight: 600, lineHeight: 1.8, marginTop: 18, maxWidth: 680 }}>
                    Dr. S. A. Suryakumar is the founder of Chessbishop, with a vision to combine structured chess education, technology and
                    accessible learning opportunities to help develop the next generation of thinkers.
                  </p>
                  <p style={{ color: 'var(--ivory)', fontWeight: 600, lineHeight: 1.8, marginTop: 16, maxWidth: 680 }}>
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

                  <a
                    href="https://www.instagram.com/suryakumaarchess/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    aria-label="Dr. S. A. Suryakumar on Instagram (opens in a new tab)"
                    style={{ marginTop: 26 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                    </svg>
                    @suryakumaarchess
                  </a>
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

      {/* About — co-founder */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent delay={0.15} from={{ y: 26 }}>
            <div className="cb-about-card">
              <div className="cb-founder-grid">
                <img
                  src="/people/cofounder.jpg"
                  alt="Mrs. K. Ishwarya"
                  width={188}
                  height={235}
                  loading="lazy"
                  decoding="async"
                  className="cb-founder-photo"
                />

                <div>
                  <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.28em' }}>CO-FOUNDER</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 40px)', marginTop: 16 }}>
                    Mrs. K. Ishwarya
                  </h2>
                  <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 'clamp(14px, 1.2vw, 17px)', marginTop: 10 }}>
                    Co-Founder &amp; Managing Director
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: 'clamp(13px, 1vw, 15px)', marginTop: 4 }}>
                    M.Sc., B.Ed.
                  </div>
                  <p style={{ color: 'var(--ivory)', fontWeight: 600, lineHeight: 1.8, marginTop: 18, maxWidth: 680 }}>
                    With 2+ years of experience in chess coaching, Mrs. K. Ishwarya is passionate about nurturing young minds through
                    chess and innovative education. As Co-Founder &amp; Managing Director, she plays an active role in academic
                    planning, student development, team coordination, and organizational growth.
                  </p>
                  <p style={{ color: 'var(--ivory)', fontWeight: 600, lineHeight: 1.8, marginTop: 16, maxWidth: 680 }}>
                    Her vision is to make chess education more engaging and accessible by combining strategic thinking, technology,
                    and AI-powered learning, helping students develop concentration, problem-solving, creativity, and
                    decision-making skills.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* About — crew */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, textAlign: 'center' }}>
          <AnimatedContent from={{ y: 14 }}>
            <span className="eyebrow">Our Team</span>
            <h2 className="section-title" style={{ marginTop: 16 }}>THE CREW</h2>
          </AnimatedContent>

          <div className="cb-crew-grid" style={{ marginTop: 60 }}>
            {crewMembers.map((m, i) => (
              <AnimatedContent key={m.name} delay={0.08 + i * 0.06} from={{ y: 26 }} className="cb-crew-card">
                {m.photo ? (
                  <div className="cb-crew-photo-frame">
                    <img
                      src={m.photo}
                      alt={`${m.name} — ${m.role}`}
                      width={400}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className={`cb-crew-photo${i < 3 ? ' cb-crew-photo--zoom' : ''}`}
                    />
                  </div>
                ) : (
                  <div className="cb-crew-monogram" aria-hidden="true">{m.initials}</div>
                )}
                <div className="cb-crew-name">{m.name}</div>
                <div className="cb-crew-role">{m.role}</div>
              </AnimatedContent>
            ))}
          </div>

          <AnimatedContent delay={0.3} from={{ y: 20 }}>
            <div className="cb-crew-quote">“Different minds. One vision. One crew. Limitless possibilities.”</div>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}
