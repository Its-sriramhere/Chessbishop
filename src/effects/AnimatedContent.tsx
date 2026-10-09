import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useInViewToggle } from './useInView'

type AnimatedContentProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  from?: { opacity?: number; y?: number; x?: number; blur?: number; scale?: number }
  duration?: number
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'span' | 'article'
}

export default function AnimatedContent({
  children,
  className = '',
  style,
  delay = 0,
  from = {},
  duration = 0.9,
  once = false,
  as: Tag = 'div',
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInViewToggle(ref, '0px 0px -12% 0px')
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (inView) setHasShown(true)
  }, [inView])

  const show = once ? hasShown : inView

  const hidden: CSSProperties = {
    opacity: from.opacity ?? 0,
    transform: `translate3d(${from.x ?? 0}px, ${from.y ?? 24}px, 0) scale(${from.scale ?? 1})`,
    filter: from.blur ? `blur(${from.blur}px)` : 'none',
  }
  const shown: CSSProperties = {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale(1)',
    filter: 'blur(0px)',
  }

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{
        ...(show ? shown : hidden),
        transition: `opacity ${duration}s ease, transform ${duration}s cubic-bezier(0.22,1,0.36,1), filter ${duration}s ease`,
        transitionDelay: show ? `${delay}s` : '0s',
        willChange: 'opacity, transform, filter',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}