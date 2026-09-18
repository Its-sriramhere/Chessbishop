import { useState, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [key, setKey] = useState(location.pathname)
  const [sweeping, setSweeping] = useState(false)

  useEffect(() => {
    if (key === location.pathname) return
    setSweeping(true)
    const swapT = setTimeout(() => setKey(location.pathname), 260)
    const sweepT = setTimeout(() => setSweeping(false), 820)
    return () => {
      clearTimeout(swapT)
      clearTimeout(sweepT)
    }
  }, [location.pathname, key])

  return (
    <>
      <div key={key} className="page-transition">
        {children}
      </div>
      {sweeping && (
        <div
          key={location.key}
          aria-hidden="true"
          className="page-sweep"
          style={{ position: 'fixed', inset: 0, zIndex: 150, pointerEvents: 'none' }}
        >
          <div className="page-sweep-line" />
        </div>
      )}
    </>
  )
}