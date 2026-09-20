import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './NextPageBadge.css'

const PAGE_ORDER = ['/home', '/about', '/gallery', '/career', '/contact']

const PAGE_LABELS: Record<string, string> = {
  '/home': 'Home',
  '/about': 'About',
  '/gallery': 'Gallery',
  '/career': 'Career',
  '/contact': 'Contact',
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function NextPageBadge() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const currentIndex = PAGE_ORDER.indexOf(pathname)
  const nextPage = PAGE_ORDER[(currentIndex + 1) % PAGE_ORDER.length]
  const nextLabel = PAGE_LABELS[nextPage] ?? 'Contact'

  const hasMultipleSections =
    typeof document !== 'undefined' && document.querySelectorAll('#main section').length > 1

  const goNext = useCallback(() => {
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
    const threshold = window.scrollY + headerHeight + 56
    const sections = Array.from(document.querySelectorAll('#main section'))
    const target = sections.find((s) => s.getBoundingClientRect().top + window.scrollY > threshold)

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: top - headerHeight - 24,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
      return
    }
    navigate(nextPage)
  }, [navigate, nextPage])

  return (
    <div className="cb-next-rail">
      <button type="button" className="cb-next" aria-label={hasMultipleSections ? 'Go to the next section' : `Go to the next page: ${nextLabel}`} title={hasMultipleSections ? 'Next section' : `Next: ${nextLabel}`} onClick={goNext}>
        <svg viewBox="0 0 100 100" className="cb-next-ring" aria-hidden="true">
          <defs>
            <path id="cb-next-ring-path" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" fill="none" />
          </defs>
          <text className="cb-next-ring-text">
            <textPath href="#cb-next-ring-path" xlinkHref="#cb-next-ring-path">
              NEXT · SECTION ·
            </textPath>
          </text>
        </svg>
        <svg viewBox="0 0 24 24" className="cb-next-arrow" aria-hidden="true">
          <path
            d="M12 4v12m0 0-5-5m5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}