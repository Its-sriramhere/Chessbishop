export type GalleryViewer = 'spiral' | 'drift' | 'grid' | 'accordion'

export type GalleryItem = {
  slug: string
  title: string
  category: string
  cover: string
  images: string[]
  viewer: GalleryViewer
  tall?: boolean
  wide?: boolean
}

export const GALLERY_PLACEHOLDER = '/chessbishop-emblem-v2.png'

export const dhoniTrophyImages = [
  '/gallery/dhoni-trophy/dhoni-00.jpg',
  ...Array.from({ length: 32 }, (_, i) => `/gallery/dhoni-trophy/dhoni-${String(i + 1).padStart(2, '0')}.jpg`),
]

const pad2 = (n: number) => String(n).padStart(2, '0')

export const diceChessImages = Array.from(
  { length: 4 },
  (_, i) => `/gallery/dice-chess-diploma-tournament-riga-latvia/dice-${pad2(i + 1)}.jpg`,
)

export const indorseImages = Array.from(
  { length: 14 },
  (_, i) => `/gallery/indorse-2k18-chess-event/indorse-${pad2(i + 1)}.jpg`,
)

export const rootsImages = Array.from(
  { length: 15 },
  (_, i) => `/gallery/roots-of-chessbishop/roots-${pad2(i + 1)}.jpg`,
)

export const tambaramImages = Array.from(
  { length: 83 },
  (_, i) => `/gallery/tambaram-corporation-inauguration/tambaram-${String(i + 1).padStart(3, '0')}.jpg`,
)

export const tirupurImages = Array.from(
  { length: 10 },
  (_, i) => `/gallery/tirupur-corporation-inauguration/tirupur-${String(i + 1).padStart(3, '0')}.jpg`,
)

export const nagapattinamImages = Array.from(
  { length: 92 },
  (_, i) => `/gallery/journey-first-step-nagapattinam/nagapattinam-${String(i + 1).padStart(3, '0')}.jpg`,
)

export const studentsImages = Array.from(
  { length: 14 },
  (_, i) => `/gallery/students-achievements-and-events/students-${String(i + 1).padStart(3, '0')}.jpg`,
)

export const galleryCategories = ['ALL', 'TRAINING', 'TOURNAMENTS', 'EVENTS', 'COMMUNITY'] as const

export const galleryItems: GalleryItem[] = [
  {
    slug: 'dhonis-trophy-prize-distribution',
    title: 'Dhoni’s Trophy Prize Distribution',
    category: 'TOURNAMENTS',
    cover: dhoniTrophyImages[0],
    images: dhoniTrophyImages,
    viewer: 'drift',
    wide: true,
  },
  {
    slug: 'students-achievements-and-events',
    title: 'Student’s Achievements and Events',
    category: 'COMMUNITY',
    cover: studentsImages[0],
    images: studentsImages,
    viewer: 'grid',
    tall: true,
  },
  {
    slug: 'dice-chess-diploma-tournament-riga-latvia',
    title: 'Dice Chess Diploma Tournament (Riga, Latvia)',
    category: 'TOURNAMENTS',
    cover: diceChessImages[0],
    images: diceChessImages,
    viewer: 'grid',
  },
  {
    slug: 'indorse-2k18-chess-event',
    title: 'Indorse 2k18 Chess Event — Private Business School, Tamil Nadu',
    category: 'EVENTS',
    cover: indorseImages[0],
    images: indorseImages,
    viewer: 'grid',
  },
  {
    slug: 'roots-of-chessbishop',
    title: 'Roots of Chessbishop',
    category: 'COMMUNITY',
    cover: rootsImages[0],
    images: rootsImages,
    viewer: 'grid',
  },
  {
    slug: 'tambaram-corporation-inauguration',
    title: 'Tambaram Corporation Inauguration',
    category: 'EVENTS',
    cover: tambaramImages[0],
    images: tambaramImages,
    viewer: 'grid',
  },
  {
    slug: 'tirupur-corporation-inauguration',
    title: 'Tirupur Corporation Inauguration',
    category: 'EVENTS',
    cover: tirupurImages[0],
    images: tirupurImages,
    viewer: 'grid',
  },
  {
    slug: 'journey-first-step-nagapattinam',
    title: 'Journey of the First Step to Nagapattinam',
    category: 'EVENTS',
    cover: nagapattinamImages[0],
    images: nagapattinamImages,
    viewer: 'grid',
  },
]

export const getGalleryBySlug = (slug: string) => galleryItems.find((g) => g.slug === slug)

export type Review = {
  name: string
  role: string
  quote: string
  image: string
}

export const reviews: Review[] = [
  {
    name: 'Dr. Sathya Kumar J., Ph.D',
    role: 'Visiting Professor in B Schools (Rajalakshmi School of Business and Firebird Institute of Research in Management)',
    quote:
      'Surya and his team\'s Chess game coaching methodology is innovative and wonderful for learning.',
    image: '/people/sathya-kumar.jpg',
  },
  {
    name: 'Dr. R. Shyaam Prasadh, Ph.D.',
    role: 'Credit Risk Modeler, Ford Motors · Lead Data Scientist – Finsurge Pte Ltd',
    quote:
      'Surya is a chess prodigy, and I have witnessed his skills as a mentor/faculty during his post-graduate program. Highly analytical and equipped with strategic thinking. I am sure his chess classes are a blessing to the participants. Good luck with the venture.',
    image: '/people/shyam-prasad.jpg',
  },
  {
    name: 'Prof. Dr. S. Srinivasan, Ph.D.',
    role: 'Assistant Professor at VGSOM, IIT Kharagpur',
    quote:
      'It\'s exceptional to see the commitment and energy they have in teaching Chess with so much intensity. Much appreciation to Surya for bringing his research caliber and learning to the game of Chess; well deserved! Want to see how a Management Scholar can teach Chess – This is a place to be.',
    image: '/people/srinivasan.jpg',
  },
]

export const careers = [
  {
    id: 'chess-coach',
    title: 'CHESS COACH',
    employment: 'Full-time / Part-time',
    mode: 'Remote / Hybrid',
    description:
      'Deliver structured one-on-one and group training programmes to ambitious students, from first principles to competitive preparation.',
    requirements: [
      'FIDE rating 2000+ or equivalent pedagogical track record',
      'Experience designing lesson plans and game-review workflows',
      'Strong communication and student-mentorship skills',
    ],
  },
  {
    id: 'content-creator',
    title: 'CONTENT CREATOR',
    employment: 'Full-time',
    mode: 'Hybrid',
    description:
      'Own Chessbishop editorial and social channels — openings, tactics, student stories and tournament coverage that make chess feel alive.',
    requirements: [
      'Portfolio of social or video content with measurable reach',
      'Strong eye for premium, cinematic production standards',
      'Ability to turn complex chess ideas into simple stories',
    ],
  },
  {
    id: 'marketing-executive',
    title: 'MARKETING EXECUTIVE',
    employment: 'Full-time',
    mode: 'On-site',
    description:
      'Plan and run campaigns across training programmes, tournaments and partnerships that grow the Chessbishop community.',
    requirements: [
      '2+ years in growth or brand marketing',
      'Comfort with analytics and campaign reporting',
      'Passion for premium brands and community-building',
    ],
  },
]

export type SigaramPlan = {
  name: string
  price: string
  period: string
  badge: string
  blurb: string
  features: string[]
  featured?: boolean
}

export const sigaramPlans: SigaramPlan[] = [
  {
    name: 'Gold',
    price: '₹499',
    period: '/month',
    badge: 'AI CHESS COMPANION',
    blurb: 'The intelligent way to start learning chess.',
    features: ['AI Assistant', 'Multilingual Support', 'Analytics Dashboard', 'Game Analysis'],
  },
  {
    name: 'Platinum',
    price: '₹999',
    period: '/month',
    badge: 'TRAIN BEYOND SCREENS',
    blurb: 'Online intelligence plus hands-on physical training.',
    features: ['Everything in Gold', '2 Days Physical Bootcamp', 'Hands-on Training', 'Strategy Sessions'],
    featured: true,
  },
  {
    name: 'Diamond',
    price: '₹1,499',
    period: '/month',
    badge: 'LEARN TOGETHER. GROW FASTER.',
    blurb: 'Live mentorship and group learning for advanced players.',
    features: ['Everything in Gold + Platinum', 'Weekly 2 Days Online Group Classes', 'Live Sessions', 'Expert Mentorship'],
  },
]

export const sigaramFeatures = [
  {
    index: '01',
    title: 'AI-Powered Training',
    copy: 'Learn with an intelligent chess companion that guides students through concepts, practice, and improvement.',
  },
  {
    index: '02',
    title: 'Real-Time Analytics',
    copy: 'Track performance, progress, and learning patterns through easy-to-understand analytics.',
  },
  {
    index: '03',
    title: 'Game Analysis',
    copy: 'Review games, identify mistakes, understand positions, and discover opportunities for improvement.',
  },
  {
    index: '04',
    title: 'Multilingual Support',
    copy: 'Make chess learning more accessible with multilingual learning support.',
  },
  {
    index: '05',
    title: 'Structured Learning Path',
    copy: 'Follow a progressive learning journey from fundamental concepts to advanced strategic thinking.',
  },
]

export const sigaramSteps = [
  {
    index: '01',
    title: 'Create Your Profile',
    copy: 'Set up your learner profile and begin your chess journey.',
  },
  {
    index: '02',
    title: 'Learn & Play',
    copy: 'Practice chess concepts and play games through the platform.',
  },
  {
    index: '03',
    title: 'Analyze',
    copy: 'Use game analysis and performance insights to understand your play.',
  },
  {
    index: '04',
    title: 'Improve',
    copy: 'Follow personalized recommendations and continue developing your skills.',
  },
]

export const sigaramFaqs = [
  {
    q: 'What is Sigaram64?',
    a: 'Sigaram64 is an AI-powered chess learning platform combining chess education, game analysis, analytics, and adaptive learning.',
  },
  {
    q: 'Who can use Sigaram64?',
    a: 'Students, chess learners, parents, schools, and educational organizations.',
  },
  {
    q: 'What does the Gold plan include?',
    a: 'AI Assistant, multilingual support, analytics dashboard, and game analysis.',
  },
  {
    q: 'What does Platinum add?',
    a: 'Physical bootcamp, hands-on training, and strategy sessions.',
  },
  {
    q: 'What does Diamond add?',
    a: 'Online group classes, live sessions, and expert mentorship.',
  },
  {
    q: 'Can schools partner with Sigaram64?',
    a: 'Yes. Schools can reach out through the contact form by choosing the School Partnership enquiry so the team can plan onboarding.',
  },
  {
    q: 'Can I upgrade my plan?',
    a: 'Yes. Talk to the team through the contact form and they will help move your subscription to a higher plan.',
  },
]

export const sigaramSchoolBenefits = [
  'AI-powered chess training',
  'Structured learning paths',
  'Game analysis',
  'Student analytics',
  'Adaptive learning',
  'Online learning',
  'Physical training options',
]