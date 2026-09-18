import { useState, type ChangeEvent, type FormEvent } from 'react'
import BlurText from '../effects/BlurText'
import SplitText from '../effects/SplitText'
import AnimatedContent from '../effects/AnimatedContent'
import ChessbishopReveal from '../effects/ChessbishopReveal'
import StatusMark from '../components/StatusMark'
import SectionBackground from '../components/SectionBackground'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 2 }

const COMPANY_EMAIL = 'teamchessbishop@gmail.com'
const COMPANY_PHONE = '+91 75981 11855'
const WHATSAPP_URL = 'https://wa.me/917598111855'

const ADDRESS_LINES = [
  '31/13 Second Street, Srinivasa Nagar,',
  'Co-operative Colony Road, MC Road,',
  'Thanjavur, Tamil Nadu, India',
  'Pincode: 613 007',
]

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=31%2F13%20Second%20Street%20Srinivasa%20Nagar%20Co-operative%20Colony%20Road%20MC%20Road%20Thanjavur%20Tamil%20Nadu%20613007'

const infoRows = [
  { label: 'EMAIL', value: COMPANY_EMAIL, href: `mailto:${COMPANY_EMAIL}` },
  { label: 'PHONE', value: COMPANY_PHONE, href: WHATSAPP_URL },
  { label: 'LOCATION', value: 'Thanjavur, Tamil Nadu, India', href: GOOGLE_MAPS_URL },
  { label: 'HOURS', value: 'Mon–Sat · 9:00 AM–7:00 PM' },
]

const interests = ['Chess Training', 'Corporate Partnership', 'Tournament', 'Career', 'General Enquiry']

type Values = { name: string; email: string; phone: string; interest: string; message: string }
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const initialValues: Values = { name: '', email: '', phone: '', interest: '', message: '' }

const fieldConfig: Record<
  keyof Values,
  { label: string; type?: string; autocomplete?: string; inputMode?: 'email' | 'tel' | 'text'; select?: boolean; textarea?: boolean; required?: boolean; minLength?: number; spellCheck?: boolean }
> = {
  name: { label: 'YOUR NAME', type: 'text', autocomplete: 'name', required: true, minLength: 2 },
  email: { label: 'YOUR EMAIL', type: 'email', autocomplete: 'email', inputMode: 'email', required: true, spellCheck: false },
  phone: { label: 'PHONE NUMBER', type: 'tel', autocomplete: 'tel', inputMode: 'tel', spellCheck: false },
  interest: { label: "I'M INTERESTED IN", select: true },
  message: { label: 'MESSAGE', textarea: true, required: true, minLength: 10, spellCheck: true },
}

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Your name needs at least 2 characters.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'That email address doesn’t look right.'
  if (values.phone.trim() && !/^[+\d][\d\s\-()]{5,}$/.test(values.phone.trim())) errors.phone = 'That phone number doesn’t look right.'
  if (!values.message.trim()) errors.message = 'Please write a short message.'
  else if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const update =
    (key: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target.value
      setValues((prev) => ({ ...prev, [key]: v }))
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }))
      }
    }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)

    const firstError = (Object.keys(next) as (keyof Values)[]).find((k) => next[k])
    if (firstError) {
      const el = document.getElementById(firstError)
      el?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/teamchessbishop@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          _subject: 'Chessbishop coaching enquiry',
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!res.ok) throw new Error('FormSubmit rejected the request')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const statusText: Record<Status, string> = {
    idle: '',
    sending: '',
    sent: '',
    error: 'Something went wrong. Please email teamchessbishop@gmail.com or write to us on WhatsApp.',
  }

  return (
    <>
      {/* Hero */}
      <section style={{ ...sectionStyle, minHeight: '68svh', display: 'flex', alignItems: 'center' }}>
        <SectionBackground />
        <div style={container}>
          <AnimatedContent from={{ y: 14 }}>
            <span className="eyebrow">Contact</span>
          </AnimatedContent>
          <BlurText as="h1" text={"LET'S MAKE\nYOUR NEXT MOVE."} delay={0.25} className="about-title" />
          <AnimatedContent delay={0.9} from={{ y: 20 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 540, fontSize: 'clamp(16px, 1.2vw, 19px)', lineHeight: 1.75, marginTop: 28 }}>
              Have a question about training, partnerships, careers or Chessbishop? Let's talk.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Info + Form */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'center' }}>
          <AnimatedContent from={{ y: 24 }} className="gs-5">
            <div style={{ maxWidth: 380 }}>
              <span className="eyebrow">Contact Chessbishop</span>
              <h2 className="section-title" style={{ marginTop: 18, fontSize: 'clamp(23px, 2.8vw, 38px)' }}>LET'S TALK.</h2>

              <div style={{ marginTop: 36, display: 'grid', gap: 26 }}>
                {infoRows.map((row) => (
                  <div key={row.label}>
                    <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.3em', fontWeight: 700 }}>{row.label}</div>
                    {row.href ? (
                      <a href={row.href} target={row.href.startsWith('http') ? '_blank' : undefined} rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ color: 'var(--ivory)', marginTop: 6, display: 'inline-block', fontSize: 'clamp(15px, 1.1vw, 18px)', textDecoration: 'none', borderBottom: '1px solid var(--border-gold)', transition: 'color 0.25s, border-color 0.25s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderBottomColor = '' }}>
                        {row.value}
                      </a>
                    ) : (
                      <div style={{ color: 'var(--ivory)', marginTop: 6, fontSize: 'clamp(15px, 1.1vw, 18px)' }}>{row.value}</div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 40 }}>
                <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.3em', fontWeight: 700, marginBottom: 14 }}>FOLLOW</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Instagram', href: 'https://www.instagram.com/chessbishopofficial/' },
                    { label: 'YouTube', href: 'https://chessbishop.com' },
                    { label: 'X', href: 'https://chessbishop.com' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, borderBottom: '1px solid transparent', transition: 'color 0.25s, border-color 0.25s' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderBottomColor = 'var(--gold)' }} onMouseLeave={(e) => { e.currentTarget.style.color = ''; e.currentTarget.style.borderBottomColor = 'transparent' }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent delay={0.12} from={{ x: 36 }} className="gs-7">
            <div className="glass-card" style={{ padding: 'clamp(24px, 2.8vw, 40px)' }}>
              {status === 'sent' ? (
                <div role="status" aria-live="polite" style={{ textAlign: 'center', paddingBlock: 56 }}>
                  <StatusMark status="done" size={64} strokeWidth={2.5} doneColor="#63a985" fillOpacity={0.08} strike={false} />
                  <h3 className="text-gold-shine" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 2.6vw, 36px)', marginTop: 20 }}>MESSAGE SENT.</h3>
                  <p style={{ color: 'var(--muted)', marginTop: 14 }}>We'll get back to you within one working day.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate style={{ display: 'grid', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
                    <Field name="name" {...fieldConfig.name} values={values} errors={errors} onChange={update('name')} />
                    <Field name="email" {...fieldConfig.email} values={values} errors={errors} onChange={update('email')} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
                    <Field name="phone" {...fieldConfig.phone} values={values} errors={errors} onChange={update('phone')} />
                    <Field name="interest" {...fieldConfig.interest} options={interests} values={values} errors={errors} onChange={update('interest')} />
                  </div>
                  <Field name="message" {...fieldConfig.message} values={values} errors={errors} onChange={update('message')} />
                  <p role="status" aria-live="polite" style={{ minHeight: 22, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', fontSize: 12, letterSpacing: '0.08em' }}>
                    {status === 'sending' ? (
                      <StatusMark status="running" label="Sending your message…" color="var(--gold)" size={16} strokeWidth={2} fontSize={12} />
                    ) : status === 'error' ? (
                      <StatusMark status="failed" label="Couldn’t send. Please retry or write to us on WhatsApp." color="var(--gold)" errorColor="#e2a89c" size={16} strokeWidth={2} fontSize={12} />
                    ) : (
                      statusText[status]
                    )}
                  </p>
                  <button type="submit" className="btn-gold" disabled={status === 'sending'} style={{ justifyContent: 'center', marginTop: 6 }}>
                    {status === 'sending' ? <span aria-hidden="true" className="btn-spinner" /> : null}
                    SEND MESSAGE
                    {status === 'sending' ? null : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Location + Map */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(20px, 3vw, 36px)' }}>
          <AnimatedContent from={{ y: 24 }} className="gs-8">
            <div className="cb-map-frame glass-card" style={{ height: 'clamp(320px, 46vw, 480px)', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <iframe
                title="Chessbishop location on the map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=79.103%2C10.761%2C79.173%2C10.811&layer=mapnik&marker=10.786%2C79.138"
                loading="lazy"
              />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(500px 320px at 50% 55%, transparent 55%, rgba(5,6,5,0.55))' }} />
              <div className="cb-map-pin" style={{ position: 'absolute', left: '50%', top: '54%', transform: 'translate(-50%, -50%)' }} aria-hidden="true">
                <span style={{ width: 16, height: 16, borderRadius: 999, background: '#D8B66A', boxShadow: '0 0 26px rgba(216,182,106,0.9)' }} />
              </div>
              <div style={{ position: 'absolute', left: 16, bottom: 12, color: 'var(--muted-dark)', fontSize: 12, letterSpacing: '0.06em' }}>OpenStreetMap</div>
            </div>
          </AnimatedContent>

          <div className="gs-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatedContent from={{ y: 20 }} delay={0.1}>
              <span className="eyebrow">Visit Chessbishop</span>
              <h2 className="section-title" style={{ marginTop: 18, fontSize: 'clamp(22px, 2.4vw, 34px)' }}>FIND US IN THANJAVUR.</h2>
              <div style={{ marginTop: 24, display: 'grid', gap: 4, color: 'var(--ivory)', fontSize: 'clamp(15px, 1.05vw, 17px)', lineHeight: 1.7 }}>
                {ADDRESS_LINES.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  GET DIRECTIONS
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  WHATSAPP US
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                </a>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ ...sectionStyle, textAlign: 'center', paddingTop: 10 }}>
        <SectionBackground />
        <ChessbishopReveal label="Your Move" />
        <h2 className="section-title" style={{ marginTop: 40 }}>
          <SplitText>ONE MOVE CAN CHANGE THE GAME.</SplitText>
        </h2>
        <AnimatedContent delay={0.3} from={{ y: 18 }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ marginTop: 40 }}>
            START A CONVERSATION
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
          </a>
        </AnimatedContent>
      </section>
    </>
  )
}

type FieldProps = {
  name: keyof Values
  label: string
  type?: string
  autocomplete?: string
  inputMode?: 'email' | 'tel' | 'text'
  textarea?: boolean
  select?: boolean
  required?: boolean
  minLength?: number
  spellCheck?: boolean
  options?: string[]
  values: Values
  errors: Errors
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

function Field({
  name,
  label,
  type = 'text',
  autocomplete,
  inputMode,
  textarea,
  select,
  required,
  minLength,
  spellCheck,
  options,
  values,
  errors,
  onChange,
}: FieldProps) {
  const value = values[name]
  const error = errors[name]
  const hasValue = value.trim() !== ''
  const cls = ['field', textarea ? 'field--area' : '', hasValue ? 'has-value' : '', error ? 'field--error' : ''].filter(Boolean).join(' ')
  const shared = {
    name,
    id: name,
    value,
    onChange,
    autoComplete: autocomplete,
    inputMode: inputMode as 'email' | 'tel' | 'text' | undefined,
    spellCheck,
    required,
    minLength,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${name}-error` : undefined,
  }

  return (
    <div className={cls}>
      {textarea ? (
        <textarea {...shared} placeholder=" " rows={5} />
      ) : select ? (
        <select {...shared} defaultValue="" style={{ minHeight: 52 }}>
          <option value="" disabled hidden />
          {options?.map((o) => (
            <option key={o} value={o} style={{ background: '#0a0d0b' }}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...shared} type={type} placeholder=" " />
      )}
      <label htmlFor={name}>{label}</label>
      {error ? (
        <span id={`${name}-error`} className="field-error-msg" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}