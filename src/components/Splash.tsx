import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../effects/Particles'

const WORD = 'CHESSBISHOP'

export default function Splash() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const [totalMs, setTotalMs] = useState(3200)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setTotalMs(reduced ? 1000 : 3200)
  }, [])

  useEffect(() => {
    const already = sessionStorage.getItem('chessbishopv2-splash-seen')
    if (already) {
      navigate('/home', { replace: true })
      return
    }

    const showTimer = setTimeout(() => setVisible(true), 60)
    const exitTimer = setTimeout(() => setExiting(true), totalMs - 640)
    const navTimer = setTimeout(() => {
      sessionStorage.setItem('chessbishopv2-splash-seen', '1')
      navigate('/home', { replace: true })
    }, totalMs)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return () => {
        clearTimeout(showTimer)
        clearTimeout(exitTimer)
        clearTimeout(navTimer)
      }
    }

    const startedAt = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - startedAt) / totalMs, 1)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(exitTimer)
      clearTimeout(navTimer)
      cancelAnimationFrame(raf)
    }
  }, [navigate, totalMs])

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const emblemScale = exiting ? 0.7 : visible ? 1 : 0.85
  const emblemOpacity = exiting ? 0 : visible ? 1 : 0
  const wordDelay = reduced ? 0 : visible ? 240 : 0

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(1100px 700px at 78% -8%, rgba(23, 60, 43, 0.55), transparent 60%), radial-gradient(900px 600px at 0% 100%, rgba(216, 182, 106, 0.07), transparent 55%), linear-gradient(180deg, #050605 0%, #0a0d0b 100%)',
        opacity: visible ? 1 : 0,
        transition: reduced ? 'none' : 'opacity 0.8s ease',
      }}
    >
      <Particles count={38} />
      <div className="chess-grid-grid" style={{ position: 'absolute', inset: 0, maskImage: 'radial-gradient(600px 460px at 50% 55%, black, transparent 75%)', WebkitMaskImage: 'radial-gradient(600px 460px at 50% 55%, black, transparent 75%)' }} />

      <div
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-6px)' : 'none',
          transition: reduced ? 'none' : 'opacity 0.8s ease, transform 0.8s ease',
          textAlign: 'center',
          paddingInline: 24,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ position: 'relative', width: 'clamp(150px, 24vw, 230px)', height: 'clamp(150px, 24vw, 230px)', margin: '0 auto' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-18%',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(216,182,106,0.35) 14%, transparent 30%, rgba(99,169,133,0.3) 55%, transparent 72%, rgba(216,182,106,0.3) 88%, transparent 100%)',
              filter: 'blur(2px)',
              animation: reduced ? 'none' : 'spin-slow 14s linear infinite',
            }}
          />
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-4%', borderRadius: '50%', boxShadow: '0 0 90px rgba(216,182,106,0.35) inset, 0 0 60px rgba(99,169,133,0.25)', animation: reduced ? 'none' : 'floaty 5.5s ease-in-out infinite' }} />
          <img
            src="/chessbishop-emblem-v2.png"
            alt="Chessbishop emblem"
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              display: 'block',
              opacity: reduced ? 1 : emblemOpacity,
              transform: reduced ? 'none' : `scale(${emblemScale})`,
              filter: reduced ? 'none' : `drop-shadow(0 0 34px rgba(216, 182, 106, ${exiting ? 0 : 0.5}))`,
              transition: reduced ? 'none' : 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.9s ease',
              animation: reduced ? 'none' : 'floaty 5.5s ease-in-out infinite',
            }}
          />
        </div>

        <div style={{ overflow: 'hidden', marginTop: 'clamp(22px, 3vw, 38px)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(30px, 6.4vw, 64px)',
              letterSpacing: '0.12em',
              margin: 0,
              transform: reduced ? 'none' : exiting ? 'translateY(100%)' : 'none',
              transition: reduced ? 'none' : 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1) 0.05s',
            }}
          >
            <span className="text-gold-shine" style={{ backgroundSize: '200% auto', animation: reduced ? 'none' : 'gold-shimmer 4s linear infinite' }}>
              {WORD.split('').map((ch, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: reduced ? 1 : visible ? 1 : 0,
                    transform: reduced ? 'none' : visible ? 'translateY(0)' : 'translateY(0.4em)',
                    transition: reduced ? 'none' : `opacity 0.5s ease ${wordDelay + i * 45}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${wordDelay + i * 45}ms`,
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>
        </div>

        <div
          style={{
            width: reduced ? 'clamp(120px, 18vw, 220px)' : 0,
            height: 1,
            margin: '20px auto 0',
            background: 'linear-gradient(90deg, transparent, #D8B66A, transparent)',
            transition: reduced ? 'none' : `width 1.2s cubic-bezier(0.22,1,0.36,1) ${wordDelay + WORD.length * 45 + 60}ms`,
            opacity: reduced ? 1 : visible ? 1 : 0,
          }}
        />

        <p
          style={{
            marginTop: 18,
            fontSize: 'clamp(10px, 1vw, 12px)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#7a7f77',
            opacity: reduced ? 1 : visible ? 1 : 0,
            transition: reduced ? 'none' : `opacity 0.7s ease ${wordDelay + WORD.length * 45 + 160}ms`,
          }}
        >
          Private LLP
        </p>

        <div
          style={{
            marginTop: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            justifyContent: 'center',
            opacity: reduced ? 1 : visible ? 1 : 0,
            transition: reduced ? 'none' : `opacity 0.6s ease ${wordDelay + 460}ms`,
          }}
        >
          <div style={{ width: 'clamp(120px, 18vw, 220px)', height: 2, background: 'rgba(244,240,230,0.08)', borderRadius: 999, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                transform: `scaleX(${reduced ? 1 : progress})`,
                transformOrigin: 'left center',
                background: 'linear-gradient(90deg, #8a6b2f, #D8B66A, #E9D39A)',
                borderRadius: 999,
              }}
            />
          </div>
          <span style={{ color: 'var(--gold)', font: '700 12px/1 var(--font-body)', letterSpacing: '0.2em' }}>
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </div>
  )
}