import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BlurText from '../effects/BlurText'
import AnimatedContent from '../effects/AnimatedContent'
import SectionBackground from '../components/SectionBackground'

const COACH_APPLICATION_EMAIL = 'sriram.efx@gmail.com'

const sectionStyle: React.CSSProperties = { position: 'relative', padding: 'clamp(90px, 14vw, 180px) clamp(20px, 6vw, 72px)' }
const container: React.CSSProperties = { maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 }

const STEPS = [
  { num: '01', label: 'Personal', title: 'Tell us about yourself' },
  { num: '02', label: 'Chess Profile', title: 'Your Chess Profile' },
  { num: '03', label: 'Coaching Experience', title: 'Your Coaching Experience' },
  { num: '04', label: 'Skills & Languages', title: 'Your Coaching Skills' },
  { num: '05', label: 'Availability', title: 'Your Availability' },
  { num: '06', label: 'Education & Documents', title: 'Qualifications & Documents' },
  { num: '07', label: 'About You', title: 'Tell Us More About You' },
  { num: '08', label: 'Review & Submit', title: 'Review your application' },
]

const STATES = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Other']
const TITLES = ['None', 'CM', 'FM', 'IM', 'GM', 'WCM', 'WFM', 'WIM', 'WGM', 'Other']
const CHESS_EXPERIENCE = ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years']
const AGE_GROUPS = ['Under 6', '6–10', '11–14', '15–18', 'College Students', 'Adults']
const STUDENT_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Tournament Level']
const TEACHING_AREAS = [
  'Chess Fundamentals',
  'Opening Principles',
  'Middlegame Strategy',
  'Endgames',
  'Tactical Training',
  'Positional Understanding',
  'Tournament Preparation',
  'Game Analysis',
  'Advanced Chess',
]
const LANGUAGES = ['English', 'Tamil', 'Hindi', 'Malayalam', 'Kannada', 'Telugu', 'Other']
const WEEKLY_HOURS = ['1–5', '5–10', '10–20', '20+']
const DEMO_TOPICS = ['Chess Fundamentals', 'Opening Principles', 'Tactical Patterns', 'Middlegame Strategy', 'Endgames', 'Game Analysis', 'Other']
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const SLOTS = ['Morning', 'Afternoon', 'Evening']
const ACCEPTED_FILES = 'application/pdf,image/jpeg,image/png'
const MAX_FILE_MB = 5

type CoachForm = {
  fullName: string
  email: string
  phone: string
  dob: string
  city: string
  state: string
  fideId: string
  currentRating: string
  peakRating: string
  chessTitle: string
  chessExperience: string
  tournamentExperience: string
  achievements: string
  hasCoached: string
  coachingYears: string
  previousCoaching: string
  previousOrgs: string
  ageGroups: string[]
  studentLevels: string[]
  teachingAreas: string[]
  coachingMode: string
  onlineExperience: string
  offlineExperience: string
  languages: string[]
  preferredMode: string
  availability: Record<string, string[]>
  preferredHours: string
  weeklyHours: string
  travel: string
  education: string
  institution: string
  currentProfession: string
  workingWithAcademy: string
  currentChessOrg: string
  fideProfile: string
  portfolio: string
  introduction: string
  whyChessbishop: string
  studentDevelopment: string
  demoClass: string
  demoFormat: string
  demoTopic: string
}

type Files = { resume: File | null; chessCert: File | null; eduCert: File | null }
type Errors = Record<string, string>

const emptyAvailability: Record<string, string[]> = DAYS.reduce((acc, d) => ({ ...acc, [d]: [] }), {})

const initialForm: CoachForm = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  city: '',
  state: '',
  fideId: '',
  currentRating: '',
  peakRating: '',
  chessTitle: '',
  chessExperience: '',
  tournamentExperience: '',
  achievements: '',
  hasCoached: '',
  coachingYears: '',
  previousCoaching: '',
  previousOrgs: '',
  ageGroups: [],
  studentLevels: [],
  teachingAreas: [],
  coachingMode: '',
  onlineExperience: '',
  offlineExperience: '',
  languages: [],
  preferredMode: '',
  availability: emptyAvailability,
  preferredHours: '',
  weeklyHours: '',
  travel: '',
  education: '',
  institution: '',
  currentProfession: '',
  workingWithAcademy: '',
  currentChessOrg: '',
  fideProfile: '',
  portfolio: '',
  introduction: '',
  whyChessbishop: '',
  studentDevelopment: '',
  demoClass: '',
  demoFormat: '',
  demoTopic: '',
}

function validateStep(step: number, form: CoachForm, files: Files): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name.'
    if (!form.email.trim()) e.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) e.phone = 'Please enter your phone / WhatsApp number.'
    else if (!/^[+\d][\d\s\-()]{5,}$/.test(form.phone.trim())) e.phone = 'That phone number doesn’t look right.'
    if (!form.city.trim()) e.city = 'Please enter your current city.'
    if (!form.state) e.state = 'Please select your state.'
  }
  if (step === 1) {
    if (!form.chessExperience) e.chessExperience = 'Please select your years of chess experience.'
  }
  if (step === 2) {
    if (!form.hasCoached) e.hasCoached = 'Please tell us whether you have coached chess before.'
  }
  if (step === 3) {
    if (form.teachingAreas.length === 0) e.teachingAreas = 'Please select at least one coaching area.'
    if (form.languages.length === 0) e.languages = 'Please select at least one language.'
  }
  if (step === 4) {
    if (!form.preferredMode) e.preferredMode = 'Please select your preferred coaching mode.'
    if (Object.values(form.availability).every((slots) => slots.length === 0)) e.availability = 'Please select your available coaching days.'
  }
  if (step === 5) {
    if (!form.education.trim()) e.education = 'Please enter your highest educational qualification.'
    if (!files.resume) e.resume = 'Please upload your CV.'
  }
  if (step === 6) {
    if (!form.introduction.trim()) e.introduction = 'Please add a short introduction.'
    if (!form.whyChessbishop.trim()) e.whyChessbishop = 'Please tell us why you would like to join Chessbishop.'
    if (!form.studentDevelopment.trim()) e.studentDevelopment = 'Please answer the student development question.'
    if (!form.demoClass) e.demoClass = 'Please tell us whether you are willing to conduct a demo class.'
    if (form.demoClass === 'Yes') {
      if (!form.demoFormat) e.demoFormat = 'Please select a demo class format.'
      if (!form.demoTopic) e.demoTopic = 'Please select a demo class topic.'
    }
  }
  return e
}

function validateAll(form: CoachForm, files: Files, declaration: boolean): { errors: Errors; step: number } {
  let errors: Errors = {}
  let first = 0
  for (let i = 0; i < 8; i++) {
    const stepErrors = validateStep(i, form, files)
    if (i === 7 && !declaration) stepErrors.declaration = 'Please accept the declaration before submitting.'
    if (Object.keys(stepErrors).length > 0) {
      errors = stepErrors
      first = i
      break
    }
  }
  return { errors, step: first }
}

function makeApplicationId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = ''
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return `CHB-${id}`
}

function formatDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
}

export default function CoachApply() {
  const [searchParams] = useSearchParams()
  const submitted = searchParams.get('submitted') === '1'

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<CoachForm>(initialForm)
  const [files, setFiles] = useState<Files>({ resume: null, chessCert: null, eduCert: null })
  const [declaration, setDeclaration] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [receipt, setReceipt] = useState<{ id: string; date: string } | null>(null)

  const appIdRef = useRef<HTMLInputElement | null>(null)
  const dateRef = useRef<HTMLInputElement | null>(null)
  const submittingRef = useRef(false)
  const topRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (submitted) {
      try {
        const raw = sessionStorage.getItem('cb-coach-application')
        if (raw) setReceipt(JSON.parse(raw))
      } catch {
        setReceipt(null)
      }
    }
  }, [submitted])

  const nextUrl = typeof window !== 'undefined' ? `${window.location.origin}/career/apply?submitted=1` : ''

  const set = <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => (prev[key as string] ? { ...prev, [key as string]: '' } : prev))
  }

  const toggleArray = (key: 'ageGroups' | 'studentLevels' | 'teachingAreas' | 'languages', value: string) => {
    setForm((prev) => {
      const list = prev[key]
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
      return { ...prev, [key]: next }
    })
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev))
  }

  const toggleSlot = (day: string, slot: string) => {
    setForm((prev) => {
      const slots = prev.availability[day]
      const next = slots.includes(slot) ? slots.filter((s) => s !== slot) : [...slots, slot]
      return { ...prev, availability: { ...prev.availability, [day]: next } }
    })
    setErrors((prev) => (prev.availability ? { ...prev, availability: '' } : prev))
  }

  const onFile = (key: keyof Files) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) {
      setFiles((prev) => ({ ...prev, [key]: null }))
      return
    }
    const okType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)
    const okSize = file.size <= MAX_FILE_MB * 1024 * 1024
    if (!okType) {
      setErrors((prev) => ({ ...prev, [key]: 'Please upload a PDF, JPG or PNG file.' }))
      e.target.value = ''
      return
    }
    if (!okSize) {
      setErrors((prev) => ({ ...prev, [key]: `Please keep the file under ${MAX_FILE_MB}MB.` }))
      e.target.value = ''
      return
    }
    setFiles((prev) => ({ ...prev, [key]: file }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const goTo = (target: number) => {
    setStep(target)
    setErrors({})
    scrollTop()
  }

  const next = () => {
    const stepErrors = validateStep(step, form, files)
    setErrors(stepErrors)
    if (Object.keys(stepErrors).length > 0) {
      focusFirstError(stepErrors)
      return
    }
    if (step < 7) {
      setStep(step + 1)
      scrollTop()
    }
  }

  const back = () => {
    if (step > 0) {
      setStep(step - 1)
      setErrors({})
      scrollTop()
    }
  }

  const focusFirstError = (errs: Errors) => {
    const first = Object.keys(errs)[0]
    if (!first) return
    requestAnimationFrame(() => {
      const el = document.getElementById(`coach-${first}`) || document.getElementById(first)
      el?.focus()
    })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (submittingRef.current) {
      e.preventDefault()
      return
    }
    const { errors: allErrors, step: firstStep } = validateAll(form, files, declaration)
    if (Object.keys(allErrors).length > 0) {
      e.preventDefault()
      setStep(firstStep)
      setErrors(allErrors)
      requestAnimationFrame(() => focusFirstError(allErrors))
      scrollTop()
      return
    }
    e.preventDefault()
    submittingRef.current = true
    setSubmitting(true)

    const id = makeApplicationId()
    const date = formatDate(new Date())
    const payload = { ...form }
    const record = { id, date, payload }

    if (appIdRef.current) appIdRef.current.value = id
    if (dateRef.current) dateRef.current.value = date
    try {
      sessionStorage.setItem('cb-coach-application', JSON.stringify(record))
    } catch {
      /* ignore storage errors */
    }
    e.currentTarget.submit()
  }

  const reviewGroups = useMemo(
    () => [
      { step: 0, title: 'Personal Information', rows: [['Full Name', form.fullName], ['Email', form.email], ['Phone / WhatsApp', form.phone], ['Date of Birth', form.dob], ['City', form.city], ['State', form.state]] },
      { step: 1, title: 'Chess Profile', rows: [['FIDE ID', form.fideId], ['Current Rating', form.currentRating], ['Peak Rating', form.peakRating], ['Chess Title', form.chessTitle], ['Years of Experience', form.chessExperience], ['Tournament Experience', form.tournamentExperience], ['Achievements', form.achievements]] },
      { step: 2, title: 'Coaching Experience', rows: [['Coached Before', form.hasCoached], ['Years Coaching', form.coachingYears], ['Previous Experience', form.previousCoaching], ['Organizations', form.previousOrgs], ['Age Groups', form.ageGroups.join(', ')], ['Student Levels', form.studentLevels.join(', ')]] },
      { step: 3, title: 'Skills & Languages', rows: [['Teaching Areas', form.teachingAreas.join(', ')], ['Coaching Mode', form.coachingMode], ['Online Experience', form.onlineExperience], ['In-Person Experience', form.offlineExperience], ['Languages', form.languages.join(', ')]] },
      { step: 4, title: 'Availability', rows: [['Preferred Mode', form.preferredMode], ['Weekly Availability', DAYS.filter((d) => form.availability[d].length > 0).map((d) => `${d}: ${form.availability[d].join(', ')}`).join(' · ')], ['Preferred Hours', form.preferredHours], ['Hours / Week', form.weeklyHours], ['Travel', form.travel]] },
      { step: 5, title: 'Education & Documents', rows: [['Qualification', form.education], ['Institution', form.institution], ['Profession', form.currentProfession], ['With Another Academy', form.workingWithAcademy], ['Organization', form.currentChessOrg], ['CV', files.resume?.name], ['Chess Certificate', files.chessCert?.name], ['Education Certificate', files.eduCert?.name], ['FIDE / Tournament Profile', form.fideProfile], ['Portfolio', form.portfolio]] },
      { step: 6, title: 'About You', rows: [['Introduction', form.introduction], ['Why Chessbishop', form.whyChessbishop], ['Student Development', form.studentDevelopment], ['Demo Class', form.demoClass], ['Demo Format', form.demoFormat], ['Demo Topic', form.demoTopic]] },
    ],
    [form, files],
  )

  if (submitted) {
    return (
      <section style={{ ...sectionStyle, minHeight: '80svh', display: 'flex', alignItems: 'center' }}>
        <SectionBackground />
        <div style={{ ...container, maxWidth: 760 }}>
          <AnimatedContent from={{ y: 18 }}>
            <div className="cb-apply-review" style={{ textAlign: 'center', padding: 'clamp(32px, 5vw, 64px)' }}>
              <div style={{ width: 64, height: 64, margin: '0 auto', borderRadius: 999, border: '1px solid var(--border-gold)', display: 'grid', placeItems: 'center', color: 'var(--gold)', fontSize: 28 }} aria-hidden="true">
                ✓
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3.4vw, 44px)', marginTop: 24 }}>
                Application Submitted Successfully
              </h1>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 18 }}>
                Thank you for your interest in joining Chessbishop as a Chess Coach. Your application has been received successfully. Our team
                will review the information provided and contact you regarding the next steps.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 28 }}>
                <div className="cb-stat-card" style={{ minWidth: 200 }}>
                  <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.24em' }}>APPLICATION ID</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2vw, 28px)', marginTop: 10 }}>{receipt?.id ?? 'CHB-XXXXXX'}</div>
                </div>
                <div className="cb-stat-card" style={{ minWidth: 200 }}>
                  <div style={{ color: 'var(--gold)', font: '700 11px / 1 var(--font-body)', letterSpacing: '0.24em' }}>SUBMITTED</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2vw, 28px)', marginTop: 10 }}>{receipt?.date ?? '—'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 34 }}>
                <Link to="/home" className="btn-gold">
                  BACK TO CHESSBISHOP
                </Link>
                <a href="https://sigaram64.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  EXPLORE SIGARAM64
                </a>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
    )
  }

  return (
    <>
      <section style={{ ...sectionStyle, paddingBottom: 0, minHeight: '42svh', display: 'flex', alignItems: 'flex-end' }}>
        <SectionBackground />
        <div style={container} ref={topRef}>
          <AnimatedContent from={{ y: 14 }}>
            <span className="eyebrow">Join Our Team</span>
          </AnimatedContent>
          <BlurText as="h1" text={'BECOME A\nCHESSBISHOP COACH.'} delay={0.2} stagger={0.035} className="about-title" />
          <AnimatedContent delay={0.35} from={{ y: 20 }}>
            <p style={{ color: 'var(--muted)', maxWidth: 620, fontSize: 'clamp(16px, 1.2vw, 19px)', lineHeight: 1.75, marginTop: 24 }}>
              Share your chess expertise and help develop the next generation of chess players.
            </p>
          </AnimatedContent>
        </div>
      </section>

      <section style={{ ...sectionStyle, paddingTop: 'clamp(48px, 6vw, 80px)' }}>
        <div style={{ ...container }} className="cb-apply-layout">
          <nav aria-label="Application steps" className="cb-apply-rail">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                type="button"
                className={`cb-apply-step${i === step ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
                aria-current={i === step ? 'step' : undefined}
                onClick={() => goTo(i)}
              >
                <span className="cb-apply-step-num">{s.num}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>

          <div>
            <div className="cb-apply-mobile-progress">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, letterSpacing: '0.18em', color: 'var(--muted)', fontWeight: 700 }}>
                <span>
                  STEP {step + 1} OF {STEPS.length}
                </span>
                <span>{STEPS[step].label.toUpperCase()}</span>
              </div>
              <div className="cb-apply-bar" aria-hidden="true">
                <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
              </div>
            </div>

            <form action={`https://formsubmit.co/${COACH_APPLICATION_EMAIL}`} method="POST" encType="multipart/form-data" onSubmit={onSubmit} noValidate>
              <input type="hidden" name="_subject" value="NEW COACH APPLICATION — Chessbishop" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input ref={appIdRef} type="hidden" name="application_id" defaultValue="" />
              <input ref={dateRef} type="hidden" name="submitted_date" defaultValue="" />

              <h2 className="section-title" style={{ fontSize: 'clamp(22px, 2.6vw, 34px)' }}>
                {STEPS[step].num} — {STEPS[step].title}
              </h2>

              <div style={{ marginTop: 28 }} key={step}>
                {step === 0 && (
                  <Grid>
                    <TextField id="coach-fullName" name="full_name" label="FULL NAME*" value={form.fullName} onChange={(v) => set('fullName', v)} error={errors.fullName} autoComplete="name" />
                    <TextField id="coach-email" name="email" type="email" label="EMAIL ADDRESS*" value={form.email} onChange={(v) => set('email', v)} error={errors.email} autoComplete="email" inputMode="email" spellCheck={false} />
                    <TextField id="coach-phone" name="phone" type="tel" label="PHONE / WHATSAPP NUMBER*" value={form.phone} onChange={(v) => set('phone', v)} error={errors.phone} autoComplete="tel" inputMode="tel" spellCheck={false} />
                    <TextField id="coach-dob" name="date_of_birth" type="date" label="DATE OF BIRTH" value={form.dob} onChange={(v) => set('dob', v)} />
                    <TextField id="coach-city" name="city" label="CURRENT CITY*" value={form.city} onChange={(v) => set('city', v)} error={errors.city} autoComplete="address-level2" />
                    <SelectField id="coach-state" name="state" label="STATE*" value={form.state} onChange={(v) => set('state', v)} error={errors.state} options={STATES} />
                  </Grid>
                )}

                {step === 1 && (
                  <Grid>
                    <TextField id="coach-fideId" name="fide_id" label="FIDE ID" value={form.fideId} onChange={(v) => set('fideId', v)} />
                    <TextField id="coach-currentRating" name="current_rating" type="number" inputMode="numeric" label="CURRENT FIDE RATING" value={form.currentRating} onChange={(v) => set('currentRating', v)} />
                    <TextField id="coach-peakRating" name="peak_rating" type="number" inputMode="numeric" label="PEAK FIDE RATING" value={form.peakRating} onChange={(v) => set('peakRating', v)} />
                    <SelectField id="coach-chessTitle" name="chess_title" label="CHESS TITLE" value={form.chessTitle} onChange={(v) => set('chessTitle', v)} options={TITLES} />
                    <SelectField id="coach-chessExperience" name="chess_experience" label="YEARS OF CHESS EXPERIENCE*" value={form.chessExperience} onChange={(v) => set('chessExperience', v)} error={errors.chessExperience} options={CHESS_EXPERIENCE} />
                    <div className="cb-span-2">
                      <TextareaField id="coach-tournamentExperience" name="tournament_experience" label="TOURNAMENT EXPERIENCE" value={form.tournamentExperience} onChange={(v) => set('tournamentExperience', v)} />
                    </div>
                    <div className="cb-span-2">
                      <TextareaField id="coach-achievements" name="chess_achievements" label="MAJOR CHESS ACHIEVEMENTS" value={form.achievements} onChange={(v) => set('achievements', v)} />
                    </div>
                  </Grid>
                )}

                {step === 2 && (
                  <>
                    <RadioGroup legend="Have you coached chess before?*" name="has_coaching_experience" options={['Yes', 'No']} value={form.hasCoached} onChange={(v) => set('hasCoached', v)} error={errors.hasCoached} />
                    {form.hasCoached === 'Yes' && (
                      <div style={{ marginTop: 28 }}>
                        <Grid>
                          <SelectField id="coach-coachingYears" name="coaching_years" label="YEARS OF COACHING EXPERIENCE" value={form.coachingYears} onChange={(v) => set('coachingYears', v)} options={CHESS_EXPERIENCE} />
                          <TextField id="coach-previousOrgs" name="previous_organizations" label="ORGANIZATIONS / ACADEMIES" value={form.previousOrgs} onChange={(v) => set('previousOrgs', v)} />
                          <div className="cb-span-2">
                            <TextareaField id="coach-previousCoaching" name="previous_coaching_experience" label="PREVIOUS COACHING EXPERIENCE" value={form.previousCoaching} onChange={(v) => set('previousCoaching', v)} />
                          </div>
                        </Grid>
                        <CheckboxGroup legend="Student Age Groups" name="student_age_groups" options={AGE_GROUPS} values={form.ageGroups} onToggle={(v) => toggleArray('ageGroups', v)} />
                        <CheckboxGroup legend="Typical Student Level" name="student_levels" options={STUDENT_LEVELS} values={form.studentLevels} onToggle={(v) => toggleArray('studentLevels', v)} />
                      </div>
                    )}
                  </>
                )}

                {step === 3 && (
                  <>
                    <CheckboxGroup legend="Areas You Can Teach*" name="teaching_areas" options={TEACHING_AREAS} values={form.teachingAreas} onToggle={(v) => toggleArray('teachingAreas', v)} error={errors.teachingAreas} />
                    <RadioGroup legend="Coaching Mode" name="coaching_mode" options={['Online', 'Offline', 'Both']} value={form.coachingMode} onChange={(v) => set('coachingMode', v)} />
                    <RadioGroup legend="Online Coaching Experience" name="online_experience" options={['Yes', 'No']} value={form.onlineExperience} onChange={(v) => set('onlineExperience', v)} />
                    <RadioGroup legend="In-Person Coaching Experience" name="offline_experience" options={['Yes', 'No']} value={form.offlineExperience} onChange={(v) => set('offlineExperience', v)} />
                    <CheckboxGroup legend="Languages You Can Teach In*" name="languages" options={LANGUAGES} values={form.languages} onToggle={(v) => toggleArray('languages', v)} error={errors.languages} />
                  </>
                )}

                {step === 4 && (
                  <>
                    <RadioGroup legend="Preferred Coaching Mode*" name="coaching_mode_preference" options={['Online', 'Offline', 'Both']} value={form.preferredMode} onChange={(v) => set('preferredMode', v)} error={errors.preferredMode} />
                    <fieldset className="cb-choice-group" style={{ marginTop: 28 }}>
                      <legend className="cb-group-legend">Weekly Availability*</legend>
                      <div className="cb-avail-scroll">
                        <table className="cb-avail-table">
                          <caption className="cb-sr-only">Select your available coaching slots for each day</caption>
                          <thead>
                            <tr>
                              <th scope="col">Day</th>
                              {SLOTS.map((s) => (
                                <th key={s} scope="col">
                                  {s}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {DAYS.map((d) => (
                              <tr key={d}>
                                <th scope="row">{d}</th>
                                {SLOTS.map((s) => (
                                  <td key={s}>
                                    <label className="cb-avail-check">
                                      <input
                                        type="checkbox"
                                        name="availability"
                                        value={`${d} ${s}`}
                                        checked={form.availability[d].includes(s)}
                                        onChange={() => toggleSlot(d, s)}
                                        aria-label={`${d} ${s}`}
                                      />
                                      <span aria-hidden="true" />
                                    </label>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {errors.availability ? <span className="field-error-msg">{errors.availability}</span> : null}
                    </fieldset>
                    <Grid>
                      <TextField id="coach-preferredHours" name="preferred_hours" label="PREFERRED WORKING HOURS" value={form.preferredHours} onChange={(v) => set('preferredHours', v)} placeholder="5:00 PM – 9:00 PM" />
                      <SelectField id="coach-weeklyHours" name="weekly_hours" label="EXPECTED HOURS PER WEEK" value={form.weeklyHours} onChange={(v) => set('weeklyHours', v)} options={WEEKLY_HOURS} />
                    </Grid>
                    <RadioGroup legend="Willingness to Travel for Offline Coaching" name="travel_availability" options={['Yes', 'No', 'Depends on location']} value={form.travel} onChange={(v) => set('travel', v)} />
                  </>
                )}

                {step === 5 && (
                  <>
                    <Grid>
                      <TextField id="coach-education" name="education" label="HIGHEST EDUCATIONAL QUALIFICATION*" value={form.education} onChange={(v) => set('education', v)} error={errors.education} />
                      <TextField id="coach-institution" name="institution" label="INSTITUTION / UNIVERSITY" value={form.institution} onChange={(v) => set('institution', v)} />
                      <TextField id="coach-currentProfession" name="current_profession" label="CURRENT PROFESSION / OCCUPATION" value={form.currentProfession} onChange={(v) => set('currentProfession', v)} />
                      <SelectField id="coach-workingWithAcademy" name="current_chess_organization_status" label="WORKING WITH ANOTHER CHESS ACADEMY?" value={form.workingWithAcademy} onChange={(v) => set('workingWithAcademy', v)} options={['Yes', 'No']} />
                      {form.workingWithAcademy === 'Yes' && (
                        <TextField id="coach-currentChessOrg" name="current_chess_organization" label="ORGANIZATION NAME" value={form.currentChessOrg} onChange={(v) => set('currentChessOrg', v)} />
                      )}
                    </Grid>

                    <div style={{ marginTop: 30, display: 'grid', gap: 18 }}>
                      <FileField id="coach-resume" name="resume" label="RESUME / CV* (PDF, JPG or PNG, max 5MB)" file={files.resume} error={errors.resume} onFile={onFile('resume')} />
                      <FileField id="coach-chessCert" name="chess_certificate" label="CHESS CERTIFICATES / TITLES (PDF, JPG or PNG)" file={files.chessCert} error={errors.chessCert} onFile={onFile('chessCert')} />
                      <FileField id="coach-eduCert" name="education_certificate" label="EDUCATIONAL CERTIFICATES (PDF, JPG or PNG)" file={files.eduCert} error={errors.eduCert} onFile={onFile('eduCert')} />
                      <Grid>
                        <TextField id="coach-fideProfile" name="fide_profile_url" type="url" label="TOURNAMENT / FIDE PROFILE URL" value={form.fideProfile} onChange={(v) => set('fideProfile', v)} />
                        <TextField id="coach-portfolio" name="portfolio_url" type="url" label="PORTFOLIO / PROFESSIONAL PROFILE URL" value={form.portfolio} onChange={(v) => set('portfolio', v)} />
                      </Grid>
                    </div>
                  </>
                )}

                {step === 6 && (
                  <>
                    <TextareaField id="coach-introduction" name="introduction" label="SHORT INTRODUCTION*" value={form.introduction} onChange={(v) => set('introduction', v)} error={errors.introduction} maxLength={500} hint="Tell us about your chess journey, coaching experience and interest in teaching chess." />
                    <TextareaField id="coach-whyChessbishop" name="why_chessbishop" label="WHY CHESSBISHOP?*" value={form.whyChessbishop} onChange={(v) => set('whyChessbishop', v)} error={errors.whyChessbishop} maxLength={500} hint="Why would you like to join Chessbishop as a chess coach?" />
                    <TextareaField id="coach-studentDevelopment" name="student_development_answer" label="STUDENT DEVELOPMENT QUESTION*" value={form.studentDevelopment} onChange={(v) => set('studentDevelopment', v)} error={errors.studentDevelopment} maxLength={750} hint="How would you help a beginner develop their chess skills?" />
                    <div style={{ marginTop: 28 }}>
                      <RadioGroup legend="Are you willing to conduct a demo class?*" name="demo_class" options={['Yes', 'No']} value={form.demoClass} onChange={(v) => set('demoClass', v)} error={errors.demoClass} />
                    </div>
                    {form.demoClass === 'Yes' && (
                      <div style={{ marginTop: 24 }}>
                        <Grid>
                          <SelectField id="coach-demoFormat" name="demo_format" label="PREFERRED DEMO FORMAT*" value={form.demoFormat} onChange={(v) => set('demoFormat', v)} error={errors.demoFormat} options={['Online', 'Offline']} />
                          <SelectField id="coach-demoTopic" name="demo_topic" label="PREFERRED DEMO TOPIC*" value={form.demoTopic} onChange={(v) => set('demoTopic', v)} error={errors.demoTopic} options={DEMO_TOPICS} />
                        </Grid>
                      </div>
                    )}
                  </>
                )}

                {step === 7 && (
                  <>
                    <div style={{ display: 'grid', gap: 16 }}>
                      {reviewGroups.map((g) => (
                        <div key={g.title} className="cb-apply-review">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 1.6vw, 22px)' }}>{g.title}</h3>
                            <button type="button" className="cb-review-edit" onClick={() => goTo(g.step)}>
                              EDIT
                            </button>
                          </div>
                          <div style={{ marginTop: 14 }}>
                            {g.rows.map(([label, value]) => (
                              <div key={label} className="cb-review-row">
                                <span style={{ color: 'var(--muted)' }}>{label}</span>
                                <span style={{ color: 'var(--ivory)', wordBreak: 'break-word' }}>{value && String(value).trim() ? value : '—'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <label className="cb-declaration">
                      <input
                        type="checkbox"
                        name="declaration"
                        checked={declaration}
                        onChange={(e) => {
                          setDeclaration(e.target.checked)
                          setErrors((prev) => (prev.declaration ? { ...prev, declaration: '' } : prev))
                        }}
                        aria-invalid={errors.declaration ? true : undefined}
                      />
                      <span>
                        I confirm that the information provided in this application is accurate and complete to the best of my knowledge. I
                        understand that Chessbishop may verify the information provided as part of the coach selection process.
                      </span>
                    </label>
                    {errors.declaration ? <span className="field-error-msg" role="alert">{errors.declaration}</span> : null}
                    <p role="status" aria-live="polite" style={{ color: 'var(--muted)', fontSize: 13, marginTop: 12 }}>
                      {submitting ? 'Submitting your application…' : ''}
                    </p>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 36 }}>
                {step > 0 && (
                  <button type="button" className="btn-outline" onClick={back}>
                    ← BACK
                  </button>
                )}
                {step < 7 ? (
                  <button type="button" className="btn-gold" onClick={next}>
                    CONTINUE
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                ) : (
                  <button type="submit" className="btn-gold" disabled={submitting}>
                    {submitting ? <span aria-hidden="true" className="btn-spinner" /> : null}
                    SUBMIT APPLICATION
                    {submitting ? null : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9.4M8.2 4.2 12 8l-3.8 3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="cb-form-grid">{children}</div>
}

type TextFieldProps = {
  id: string
  name: string
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  inputMode?: 'email' | 'tel' | 'text' | 'numeric'
  autoComplete?: string
  spellCheck?: boolean
  placeholder?: string
}

function TextField({ id, name, label, value, onChange, error, type = 'text', inputMode, autoComplete, spellCheck, placeholder }: TextFieldProps) {
  return (
    <div className={`field${value ? ' has-value' : ''}${error ? ' field--error' : ''}`}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode as 'email' | 'tel' | 'text' | 'numeric' | undefined}
        spellCheck={spellCheck}
        placeholder={placeholder ?? ' '}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id}>{label}</label>
      {error ? (
        <span id={`${id}-error`} className="field-error-msg" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}

function SelectField({ id, name, label, value, onChange, options, error }: { id: string; name: string; label: string; value: string; onChange: (v: string) => void; options: string[]; error?: string }) {
  return (
    <div className={`field${value ? ' has-value' : ''}${error ? ' field--error' : ''}`}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled hidden />
        {options.map((o) => (
          <option key={o} value={o} style={{ background: '#0a0d0b' }}>
            {o}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      {error ? (
        <span id={`${id}-error`} className="field-error-msg" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}

function TextareaField({ id, name, label, value, onChange, error, maxLength, hint }: { id: string; name: string; label: string; value: string; onChange: (v: string) => void; error?: string; maxLength?: number; hint?: string }) {
  return (
    <div className={`field field--area${value ? ' has-value' : ''}${error ? ' field--error' : ''}`} style={{ marginTop: 18 }}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder=" "
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined}
      />
      <label htmlFor={id}>{label}</label>
      {hint ? (
        <span id={`${id}-hint`} style={{ display: 'block', color: 'var(--muted-dark)', fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>
          {hint}
        </span>
      ) : null}
      {maxLength ? (
        <span style={{ display: 'block', color: 'var(--muted-dark)', fontSize: 11, marginTop: 6, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
          {value.length} / {maxLength}
        </span>
      ) : null}
      {error ? (
        <span id={`${id}-error`} className="field-error-msg" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}

function RadioGroup({ legend, name, options, value, onChange, error }: { legend: string; name: string; options: string[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <fieldset className="cb-choice-group">
      <legend className="cb-group-legend">{legend}</legend>
      <div className="cb-choices">
        {options.map((o) => (
          <label key={o} className={`cb-choice${value === o ? ' is-checked' : ''}`}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {error ? <span className="field-error-msg" role="alert">{error}</span> : null}
    </fieldset>
  )
}

function CheckboxGroup({ legend, name, options, values, onToggle, error }: { legend: string; name: string; options: string[]; values: string[]; onToggle: (v: string) => void; error?: string }) {
  return (
    <fieldset className="cb-choice-group">
      <legend className="cb-group-legend">{legend}</legend>
      <div className="cb-choices">
        {options.map((o) => (
          <label key={o} className={`cb-choice${values.includes(o) ? ' is-checked' : ''}`}>
            <input type="checkbox" name={name} value={o} checked={values.includes(o)} onChange={() => onToggle(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {error ? <span className="field-error-msg" role="alert">{error}</span> : null}
    </fieldset>
  )
}

function FileField({ id, name, label, file, onFile, error }: { id: string; name: string; label: string; file: File | null; onFile: (e: ChangeEvent<HTMLInputElement>) => void; error?: string }) {
  return (
    <div className={`cb-file${error ? ' is-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="file" accept={ACCEPTED_FILES} onChange={onFile} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} />
      <span style={{ color: file ? 'var(--gold)' : 'var(--muted-dark)', fontSize: 12, marginTop: 8, display: 'block' }}>{file ? file.name : 'No file selected'}</span>
      {error ? (
        <span id={`${id}-error`} className="field-error-msg" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
