import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import BlurText from '../effects/BlurText'
import AnimatedContent from '../effects/AnimatedContent'
import StatusMark from '../components/StatusMark'
import SectionBackground from '../components/SectionBackground'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 2 }

const SCHOOL_TYPES = ['Government', 'Government-Aided', 'Private', 'CBSE', 'ICSE', 'International', 'Other']
const DESIGNATIONS = ['Principal', 'Correspondent / Management', 'Head of Department', 'Sports Coordinator', 'Teacher', 'Other']
const STUDENT_COUNTS = ['Below 50', '50–100', '100–250', '250–500', '500+']
const GRADES = ['Primary', 'Middle School', 'High School', 'Higher Secondary']
const PROGRAMS = ['Sigaram64 AI Platform', 'Chess Coaching', 'AI + Chess Training', 'Physical Bootcamp', 'Online Training', 'Complete School Program']
const MODELS = ['Student Subscriptions', 'School-Wide Subscription', 'Chess Coaching Program', 'AI Chess Lab / Club', 'Customized School Program']

type Values = {
  schoolName: string
  schoolType: string
  city: string
  district: string
  website: string
  contactName: string
  designation: string
  phone: string
  email: string
  studentCount: string
  partnershipModel: string
  startDate: string
  message: string
}

type Errors = Partial<Record<string, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const initialValues: Values = {
  schoolName: '',
  schoolType: '',
  city: '',
  district: '',
  website: '',
  contactName: '',
  designation: '',
  phone: '',
  email: '',
  studentCount: '',
  partnershipModel: '',
  startDate: '',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validIndianPhone(raw: string): boolean {
  let digits = raw.replace(/[^\d]/g, '')
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2)
  if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1)
  return /^[6-9]\d{9}$/.test(digits)
}

function validate(values: Values, grades: string[], programs: string[], consent: boolean): Errors {
  const errors: Errors = {}
  if (!values.schoolName.trim()) errors.schoolName = 'Please enter your school name.'
  if (!values.schoolType) errors.schoolType = 'Please choose the school type.'
  if (!values.city.trim()) errors.city = 'Please enter the city.'
  if (!values.district.trim()) errors.district = 'Please enter the district.'
  if (values.website.trim() && !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(values.website.trim()))
    errors.website = 'That website address doesn’t look right.'
  if (!values.contactName.trim()) errors.contactName = 'Please enter your full name.'
  else if (values.contactName.trim().length < 2) errors.contactName = 'Your name needs at least 2 characters.'
  if (!values.designation) errors.designation = 'Please choose a designation.'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!validIndianPhone(values.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.studentCount) errors.studentCount = 'Please choose the number of students.'
  if (programs.length === 0) errors.programs = 'Please choose at least one program.'
  if (!values.partnershipModel) errors.partnershipModel = 'Please choose a partnership model.'
  if (values.message.length > 1000) errors.message = 'Please keep your message within 1000 characters.'
  if (!consent) errors.consent = 'Please agree to be contacted before submitting.'
  void grades
  return errors
}

function makeReferenceId(): string {
  const bytes = new Uint32Array(1)
  crypto.getRandomValues(bytes)
  return `SIG-${String(bytes[0] % 1000000).padStart(6, '0')}`
}

type FieldProps = {
  name: keyof Values
  label: string
  type?: string
  autocomplete?: string
  inputMode?: 'email' | 'tel' | 'text' | 'url'
  spellCheck?: boolean
  textarea?: boolean
  select?: boolean
  options?: string[]
  min?: string
  maxLength?: number
  values: Values
  errors: Errors
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

function Field({ name, label, type = 'text', autocomplete, inputMode, spellCheck, textarea, select, options, min, maxLength, values, errors, onChange }: FieldProps) {
  const value = values[name]
  const error = errors[name]
  const hasValue = value.trim() !== '' || type === 'date'
  const cls = ['field', textarea ? 'field--area' : '', hasValue ? 'has-value' : '', error ? 'field--error' : ''].filter(Boolean).join(' ')
  const shared = {
    name,
    id: name,
    value,
    onChange,
    autoComplete: autocomplete,
    inputMode,
    spellCheck,
    maxLength,
    min,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${name}-error` : undefined,
  }
  return (
    <div className={cls}>
      {textarea ? (
        <textarea {...shared} placeholder=" " rows={5} />
      ) : select ? (
        <select {...shared} value={value} style={{ minHeight: 52 }}>
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

type MultiSelectProps = {
  id: string
  label: string
  options: string[]
  selected: string[]
  onToggle: (option: string) => void
  error?: string
  required?: boolean
}

function MultiSelect({ id, label, options, selected, onToggle, error, required }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const display = selected.length === 0 ? `Choose ${label.toLowerCase()}${required ? '' : ' (optional)'}` : selected.join(', ')
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          minHeight: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          textAlign: 'left',
          border: '1px solid var(--border)',
          borderRadius: 14,
          background: 'rgba(244, 240, 230, 0.03)',
          color: selected.length === 0 ? 'var(--muted)' : 'var(--ivory)',
          font: '500 16px / 1.45 var(--font-body)',
          padding: '14px 16px',
          cursor: 'pointer',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{display}</span>
        <span aria-hidden="true" style={{ color: 'var(--gold)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>▾</span>
      </button>
      <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 6, letterSpacing: '0.06em' }}>{label.toUpperCase()}{required ? ' *' : ''}</div>
      {open && (
        <div role="listbox" aria-multiselectable="true" aria-label={label} style={{ position: 'absolute', zIndex: 30, top: 'calc(100% + 8px)', left: 0, right: 0, background: '#0a0d0b', border: '1px solid var(--border-gold)', borderRadius: 14, padding: 8, boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.85)', maxHeight: 264, overflowY: 'auto' }}>
          {options.map((o) => {
            const checked = selected.includes(o)
            return (
              <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 10px', borderRadius: 10, cursor: 'pointer', color: 'var(--ivory)', fontSize: 15 }}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(o)}
                  style={{ width: 20, height: 20, accentColor: '#d8b66a', flexShrink: 0 }}
                />
                {o}
              </label>
            )
          })}
        </div>
      )}
      {error ? (
        <span id={`${id}-error`} className="field-error-msg" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.28em', marginTop: 34 }}>
      {children}
    </div>
  )
}

const twoCol: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginTop: 18 }

export default function Sigaram64School() {
  const [values, setValues] = useState<Values>(initialValues)
  const [grades, setGrades] = useState<string[]>([])
  const [programs, setPrograms] = useState<string[]>([])
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [referenceId, setReferenceId] = useState('')

  const today = new Date().toISOString().slice(0, 10)

  const update =
    (key: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target.value
      setValues((prev) => ({ ...prev, [key]: v.slice(0, key === 'message' ? 1000 : v.length) }))
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const toggleIn = (list: string[], setList: (v: string[]) => void, clearError?: string) => (option: string) => {
    setList(list.includes(option) ? list.filter((o) => o !== option) : [...list, option])
    if (clearError && errors[clearError]) setErrors((prev) => ({ ...prev, [clearError]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next = validate(values, grades, programs, consent)
    setErrors(next)

    const order = ['schoolName', 'schoolType', 'city', 'district', 'website', 'contactName', 'designation', 'phone', 'email', 'studentCount', 'programs', 'partnershipModel', 'startDate', 'message', 'consent']
    const firstError = order.find((k) => next[k])
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/teamchessbishop@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          schoolName: values.schoolName.trim(),
          schoolType: values.schoolType,
          city: values.city.trim(),
          district: values.district.trim(),
          schoolWebsite: values.website.trim(),
          contactName: values.contactName.trim(),
          designation: values.designation,
          phone: values.phone.trim(),
          email: values.email.trim(),
          studentCount: values.studentCount,
          grades: grades.join(', '),
          preferredPrograms: programs.join(', '),
          partnershipModel: values.partnershipModel,
          preferredStartDate: values.startDate,
          message: values.message.trim(),
          consent: true,
          _subject: 'New Sigaram64 School Partnership Request',
          _template: 'table',
          _captcha: 'false',
        }),
      })
      if (!res.ok) throw new Error('FormSubmit rejected the request')
      setReferenceId(makeReferenceId())
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section style={{ ...sectionStyle, minHeight: '62svh', display: 'flex', alignItems: 'center' }}>
        <SectionBackground />
        <div style={{ ...container, textAlign: 'center' }}>
          <AnimatedContent from={{ y: 14 }}>
            <span className="eyebrow eyebrow--center">School Partnership</span>
          </AnimatedContent>
          <BlurText as="h1" text={'BRING SIGARAM64\nTO YOUR SCHOOL'} delay={0.25} className="about-title" />
          <AnimatedContent delay={0.3} from={{ y: 20 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 640, margin: '28px auto 0', fontSize: 'clamp(15px, 1.2vw, 19px)', lineHeight: 1.8 }}>
              Partner with Sigaram64 to introduce AI-powered chess learning,
              structured training, and innovative chess education to your students.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Form */}
      <section style={{ ...sectionStyle, paddingTop: 0 }}>
        <SectionBackground />
        <div style={{ ...container, maxWidth: 880 }}>
          <AnimatedContent from={{ y: 26 }}>
            <div className="glass-card" style={{ padding: 'clamp(24px, 3vw, 44px)' }}>
              {status === 'sent' ? (
                <div role="status" aria-live="polite" style={{ textAlign: 'center', paddingBlock: 40 }}>
                  <StatusMark status="done" size={64} strokeWidth={2.5} doneColor="#63a985" fillOpacity={0.08} strike={false} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px, 2.6vw, 36px)', marginTop: 20 }}>THANK YOU FOR YOUR INTEREST!</h2>
                  <p style={{ color: 'var(--muted)', marginTop: 14, lineHeight: 1.75, maxWidth: 520, marginInline: 'auto' }}>
                    Your school partnership request has been received. Our team will
                    review your requirements and contact you shortly to discuss the next steps.
                  </p>
                  <div style={{ marginTop: 24, display: 'inline-block', border: '1px solid var(--border-gold)', borderRadius: 14, padding: '14px 26px', background: 'rgba(216, 182, 106, 0.06)' }}>
                    <div style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '0.3em', fontWeight: 700 }}>REFERENCE ID</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, marginTop: 6 }}>{referenceId}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 32, justifyContent: 'center' }}>
                    <Link to="/sigaram64" className="btn-gold">BACK TO SIGARAM64</Link>
                    <Link to="/contact" className="btn-outline">CONTACT OUR TEAM</Link>
                  </div>
                </div>
              ) : status === 'error' ? (
                <div role="alert" style={{ textAlign: 'center', paddingBlock: 40 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px, 2.6vw, 36px)' }}>SOMETHING WENT WRONG</h2>
                  <p style={{ color: 'var(--muted)', marginTop: 14, lineHeight: 1.75 }}>
                    We couldn&apos;t submit your request right now. Please try again or contact our team directly.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 28, justifyContent: 'center' }}>
                    <button type="button" className="btn-gold" onClick={() => setStatus('idle')} style={{ cursor: 'pointer' }}>
                      TRY AGAIN
                    </button>
                    <Link to="/contact" className="btn-outline">CONTACT US</Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <SectionLabel>School Information</SectionLabel>
                  <div style={twoCol}>
                    <Field name="schoolName" label="SCHOOL NAME *" values={values} errors={errors} onChange={update('schoolName')} autocomplete="organization" />
                    <Field name="schoolType" label="SCHOOL TYPE *" select options={SCHOOL_TYPES} values={values} errors={errors} onChange={update('schoolType')} />
                  </div>
                  <div style={twoCol}>
                    <Field name="city" label="CITY *" values={values} errors={errors} onChange={update('city')} autocomplete="address-level2" />
                    <Field name="district" label="DISTRICT *" values={values} errors={errors} onChange={update('district')} autocomplete="address-level1" />
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <Field name="website" label="SCHOOL WEBSITE" type="url" inputMode="url" spellCheck={false} values={values} errors={errors} onChange={update('website')} autocomplete="url" />
                  </div>

                  <SectionLabel>Contact Person</SectionLabel>
                  <div style={twoCol}>
                    <Field name="contactName" label="FULL NAME *" values={values} errors={errors} onChange={update('contactName')} autocomplete="name" />
                    <Field name="designation" label="DESIGNATION *" select options={DESIGNATIONS} values={values} errors={errors} onChange={update('designation')} />
                  </div>
                  <div style={twoCol}>
                    <Field name="phone" label="PHONE NUMBER *" type="tel" inputMode="tel" spellCheck={false} values={values} errors={errors} onChange={update('phone')} autocomplete="tel" />
                    <Field name="email" label="EMAIL ADDRESS *" type="email" inputMode="email" spellCheck={false} values={values} errors={errors} onChange={update('email')} autocomplete="email" />
                  </div>

                  <SectionLabel>Program Requirements</SectionLabel>
                  <div style={twoCol}>
                    <Field name="studentCount" label="NUMBER OF STUDENTS *" select options={STUDENT_COUNTS} values={values} errors={errors} onChange={update('studentCount')} />
                    <MultiSelect id="grades" label="Classes / Grades" options={GRADES} selected={grades} onToggle={toggleIn(grades, setGrades)} />
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <MultiSelect id="programs" label="Preferred Program" options={PROGRAMS} selected={programs} onToggle={toggleIn(programs, setPrograms, 'programs')} error={errors.programs} required />
                  </div>

                  <SectionLabel>Partnership Details</SectionLabel>
                  <div style={twoCol}>
                    <Field name="partnershipModel" label="PARTNERSHIP MODEL *" select options={MODELS} values={values} errors={errors} onChange={update('partnershipModel')} />
                    <Field name="startDate" label="PREFERRED START DATE" type="date" min={today} values={values} errors={errors} onChange={update('startDate')} />
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <Field name="message" label="ADDITIONAL REQUIREMENTS / MESSAGE" textarea spellCheck maxLength={1000} values={values} errors={errors} onChange={update('message')} />
                    {values.message.length > 0 && (
                      <div aria-live="polite" style={{ color: 'var(--muted)', fontSize: 12, marginTop: 6, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {values.message.length} / 1000
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: 26 }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', color: 'var(--ivory)', fontSize: 15, lineHeight: 1.6 }}>
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked)
                          if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }))
                        }}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                        style={{ width: 22, height: 22, marginTop: 1, accentColor: '#d8b66a', flexShrink: 0 }}
                      />
                      I agree to be contacted by the Sigaram64 / Chessbishop team regarding school partnership opportunities. *
                    </label>
                    {errors.consent ? (
                      <span id="consent-error" className="field-error-msg" role="alert">
                        {errors.consent}
                      </span>
                    ) : null}
                  </div>

                  <button type="submit" className="btn-gold" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center', marginTop: 30, cursor: status === 'sending' ? 'wait' : 'pointer', opacity: status === 'sending' ? 0.75 : 1 }}>
                    {status === 'sending' ? (
                      <StatusMark status="running" label="Submitting…" color="currentColor" size={16} strokeWidth={2} fontSize={13} />
                    ) : (
                      'REQUEST A SCHOOL PARTNERSHIP'
                    )}
                  </button>
                  <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, marginTop: 16 }}>
                    Let&apos;s build smarter chess learning experiences together.
                  </p>
                </form>
              )}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  )
}