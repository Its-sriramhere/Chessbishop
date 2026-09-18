import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

const glow: CSSProperties = {
  position: 'absolute',
  borderRadius: '9999px',
  filter: 'blur(70px)',
  willChange: 'transform',
}

export default function PostHeroAurora() {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const update = () => setPastHero(window.scrollY > window.innerHeight * 0.8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: pastHero ? 1 : 0,
        transition: 'opacity 1.1s ease',
      }}
    >
      <div
        style={{
          ...glow,
          width: '55vw',
          height: '55vw',
          top: '-10vw',
          right: '-6vw',
          background: 'radial-gradient(circle, rgba(99, 169, 133, 0.72), transparent 65%)',
          animation: 'ph-aurora-a 21s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          ...glow,
          width: '46vw',
          height: '46vw',
          bottom: '-14vw',
          left: '-8vw',
          background: 'radial-gradient(circle, rgba(216, 182, 106, 0.5), transparent 65%)',
          animation: 'ph-aurora-b 25s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          ...glow,
          width: '42vw',
          height: '42vw',
          top: '32%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(23, 60, 43, 0.9), transparent 65%)',
          animation: 'ph-aurora-c 23s ease-in-out infinite alternate',
        }}
      />
      <style>{`
        @keyframes ph-aurora-a {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-9vw, 8vh) scale(1.15); }
        }
        @keyframes ph-aurora-b {
          from { transform: translate(0, 0) scale(1.05); }
          to { transform: translate(11vw, -7vh) scale(1.22); }
        }
        @keyframes ph-aurora-c {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-6vw, 6vh) scale(1.12); }
        }
      `}</style>
    </div>
  )
}