import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type BlurTextProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
}

export default function BlurText({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  once = true,
}: BlurTextProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll('[data-blur-char]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      chars.forEach((char) => {
        ;(char as HTMLElement).style.opacity = '1'
        ;(char as HTMLElement).style.filter = 'blur(0px)'
        ;(char as HTMLElement).style.transform = 'none'
      })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { filter: 'blur(14px)', opacity: 0, y: 20 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [text, delay, duration, stagger, once])

  const charStyle: React.CSSProperties = {
    display: 'inline-block',
    opacity: 0,
    willChange: 'filter, transform',
  }

  return (
    <Tag ref={ref as React.Ref<never>} className={className} aria-label={text}>
      {text.split('\n').map((line, lineIdx) => (
        <span key={lineIdx} style={{ display: 'block' }}>
          {line.split(' ').map((word, wordIdx, arr) => (
            <span key={wordIdx}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split('').map((char, ci) => (
                  <span key={ci} data-blur-char style={charStyle}>
                    {char}
                  </span>
                ))}
              </span>
              {wordIdx < arr.length - 1 ? ' ' : null}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}