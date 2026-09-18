import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SplitTextProps = {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  y?: number
}

export default function SplitText({ children, className = '', delay = 0, stagger = 0.08, y = 30 }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const lines = el.querySelectorAll('[data-split-line]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lines.forEach((line) => {
        ;(line as HTMLElement).style.opacity = '1'
        ;(line as HTMLElement).style.transform = 'none'
      })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: y, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          stagger,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [delay, stagger, y])

  return (
    <span ref={ref} className={className} style={{ display: 'inline-grid' }}>
      {String(children)
        .split('\n')
        .map((line, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
            <span data-split-line style={{ display: 'inline-block', opacity: 0 }}>
              {line || '\u00A0'}
            </span>
          </span>
        ))}
    </span>
  )
}