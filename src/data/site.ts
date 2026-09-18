export type GalleryItem = {
  src?: string
  gradient?: string
  title: string
  category: string
  tall?: boolean
}

export const galleryCategories = ['ALL', 'TRAINING', 'TOURNAMENTS', 'EVENTS', 'COMMUNITY'] as const

export const galleryItems: GalleryItem[] = [
  { src: '/bg-image.png', title: 'Grandmaster Sessions', category: 'TRAINING', tall: true },
  { src: '/chessbishop-nav-logo.png', title: 'Squad Retreat', category: 'COMMUNITY' },
  { gradient: 'radial-gradient(120% 120% at 20% 10%, #173c2b 0%, #0a0d0b 55%, #101512 100%)', title: 'Open Rapid 2026', category: 'TOURNAMENTS', tall: true },
  { src: '/logo.jpeg', title: 'Mentor Meetup', category: 'EVENTS' },
  { gradient: 'radial-gradient(120% 120% at 85% 15%, #2b1f08 0%, #0a0d0b 50%, #101512 100%)', title: 'Blitz Night', category: 'EVENTS' },
  { src: '/chessbishop-emblem.png', title: 'Coach Programme', category: 'TRAINING' },
  { gradient: 'linear-gradient(135deg, #0a0d0b 0%, #173c2b 45%, #63a985 130%)', title: 'National Invitational', category: 'TOURNAMENTS', tall: true },
  { src: '/chessbishop-wordmark.png', title: 'Community Open Day', category: 'COMMUNITY' },
]

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