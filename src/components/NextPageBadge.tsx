import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NextPageBadge.css'

export default function NextPageBadge() {
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    let ticking = false
    const check = () => {
      ticking = false
      const el = document.documentElement
      const nearBottom = el.scrollHeight - el.scrollTop - window.innerHeight < 260
      setAtBottom(nearBottom)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={`cb-next-rail${atBottom ? ' is-visible' : ''}`} data-testid="next-rail">
      <Link to="/about" className="cb-next" aria-label="Go to the next page: About" title="About">
        <svg viewBox="0 0 100 100" className="cb-next-ring" aria-hidden="true">
          <defs>
            <path id="cb-next-ring-path" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" fill="none" />
          </defs>
          <text className="cb-next-ring-text">
            <textPath href="#cb-next-ring-path" xlinkHref="#cb-next-ring-path">
              NEXT · ABOUT · NEXT · ABOUT ·
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
      </Link>
    </div>
  )
}