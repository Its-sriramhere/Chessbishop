import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'

type Direction = 'up' | 'down'

type CountUpProps = {
  to: number
  from?: number
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  startWhen?: boolean
  separator?: string
  onStart?: () => void
  onEnd?: () => void
}

function getDecimalPlaces(value: number) {
  const match = String(value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
  if (!match) return 0
  return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? Number(match[2]) : 0))
}

function formatNumber(value: number, separator: string) {
  const decimals = getDecimalPlaces(value)
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: separator !== '',
  })
  let output = formatter.format(value)
  if (separator && separator !== ',') {
    output = output.replace(/,/g, separator)
  }
  return output
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  className = '',
  startWhen = true,
  separator = ',',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const endedRef = useRef(false)

  const motionValue = useMotionValue(direction === 'down' ? to : from)

  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 100,
  })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (ref.current) ref.current.textContent = String(formatNumber(direction === 'down' ? to : from, separator))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, from, to, separator])

  useEffect(() => {
    if (!(isInView && startWhen)) return

    if (typeof onStart === 'function') onStart()

    const timeoutId = setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to)
    }, delay * 1000)

    const unsubscribe = springValue.on('change', (value) => {
      if (ref.current) {
        ref.current.textContent = String(formatNumber(value, separator))
        if (!endedRef.current && Math.abs(value - to) < 0.5) {
          endedRef.current = true
          if (typeof onEnd === 'function') onEnd()
        }
      }
    })

    return () => {
      endedRef.current = false
      clearTimeout(timeoutId)
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, startWhen, direction, delay, to, from, springValue])

  return <span ref={ref} className={className} />
}