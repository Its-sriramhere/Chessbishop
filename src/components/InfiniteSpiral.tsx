import { useEffect, useMemo, useRef } from 'react'
import './InfiniteSpiral.css'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const modulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor
const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1)
  return x * x * (3 - 2 * x)
}

export type InfiniteSpiralItem = {
  src: string
  alt?: string
  label?: string
  caption?: string
  href?: string
  id?: string
  target?: string
}

type AnimationMode = 'auto' | 'scroll' | 'drag' | 'all'
type Direction = 'up' | 'down'
type ImageFit = 'cover' | 'contain' | 'fill'

type InfiniteSpiralProps = {
  items?: InfiniteSpiralItem[]
  speed?: number
  direction?: Direction
  animationMode?: AnimationMode
  radius?: number
  cardWidth?: number
  cardHeight?: number
  verticalSpacing?: number
  perspective?: number
  cardsPerTurn?: number
  rotation?: number
  cardTilt?: number
  cardRadius?: number
  centerScale?: number
  edgeFade?: number
  edgeBlur?: number
  pauseOnHover?: boolean
  imageFit?: ImageFit
  grayscale?: number
  className?: string
}

const InfiniteSpiral = ({
  items = [],
  speed = 0.55,
  direction = 'up',
  animationMode = 'auto',
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardsPerTurn = 7,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 10,
  centerScale = 1.2,
  edgeFade = 0.3,
  edgeBlur = 6,
  pauseOnHover = true,
  imageFit = 'cover',
  grayscale = 0,
  className = '',
}: InfiniteSpiralProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const autoSpeedRef = useRef(0)
  const hoveredRef = useRef(false)
  const visibleRef = useRef(true)
  const draggingRef = useRef(false)
  const lastPointerYRef = useRef(0)
  const dragMovedRef = useRef(false)
  const wakeRef = useRef<() => void>(() => {})
  const idleRef = useRef(false)
  const lastCardStateRef = useRef<string[]>([])

  const normalizedItems = useMemo(
    () =>
      items.map((item, index) =>
        typeof item === 'string'
          ? { src: item, alt: `Spiral image ${index + 1}` }
          : { alt: `Spiral image ${index + 1}`, ...item },
      ),
    [items],
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root || normalizedItems.length === 0) return

    let frameId = 0
    let previousTime = performance.now()
    let bounds = root.getBoundingClientRect()
    idleRef.current = false
    lastCardStateRef.current = []
    const wake = () => {
      if (!idleRef.current) return
      idleRef.current = false
      previousTime = performance.now()
      frameId = requestAnimationFrame(render)
    }
    wakeRef.current = wake
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scrollEnabled = animationMode === 'scroll' || animationMode === 'all'
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55
    let lastScrollY = window.scrollY

    const resizeObserver = new ResizeObserver(() => {
      bounds = root.getBoundingClientRect()
    })
    resizeObserver.observe(root)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) wake()
      },
      { threshold: 0.02 },
    )
    intersectionObserver.observe(root)

    const handleScroll = () => {
      const nextScrollY = window.scrollY
      const scrollDelta = nextScrollY - lastScrollY
      lastScrollY = nextScrollY
      if (!scrollEnabled || !visibleRef.current || scrollDelta === 0) return
      targetProgressRef.current += clamp(
        (scrollDelta * scrollSpeedMultiplier) / Math.max(verticalSpacing * 2, 1),
        -1.5,
        1.5,
      )
      wake()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time

      const autoEnabled = animationMode === 'auto' || animationMode === 'all'
      const motionPaused = draggingRef.current || (pauseOnHover && hoveredRef.current)
      const directionMultiplier = direction === 'down' ? -1 : 1
      const desiredAutoSpeed =
        autoEnabled && visibleRef.current && !reducedMotion.matches && !motionPaused
          ? speed * directionMultiplier
          : 0
      const speedBlend = 1 - Math.exp(-delta * 7)
      autoSpeedRef.current += (desiredAutoSpeed - autoSpeedRef.current) * speedBlend
      targetProgressRef.current += autoSpeedRef.current * delta

      const followBlend = 1 - Math.exp(-delta * (draggingRef.current ? 22 : 11))
      progressRef.current += (targetProgressRef.current - progressRef.current) * followBlend

      const settled =
        !draggingRef.current &&
        Math.abs(targetProgressRef.current - progressRef.current) < 0.0005 &&
        Math.abs(autoSpeedRef.current) < 0.0005 &&
        (desiredAutoSpeed === 0 || !visibleRef.current || reducedMotion.matches)
      if ((!visibleRef.current || reducedMotion.matches) && settled) {
        idleRef.current = true
        frameId = 0
        return
      }

      const count = normalizedItems.length
      const half = count / 2
      const width = Math.max(bounds.width, 1)
      const height = Math.max(bounds.height, 1)
      const fit = Math.min(1, width / (cardWidth * 2.8), height / (cardHeight * 2.35))
      const responsiveRadius = Math.min(radius, Math.max(72, width * 0.36)) * fit
      const fadeStart = clamp(1 - edgeFade, 0, 0.98)
      const turnSize = Math.max(cardsPerTurn, 1)

      cardRefs.current.forEach((card, index) => {
        if (!card) return
        let offset = index - progressRef.current
        offset = modulo(offset + half, count) - half

        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1)
        const opacity = 1 - smoothstep(fadeStart, 1, edge)
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1)
        const scale = (1 + (centerScale - 1) * focus) * fit
        const angle = offset * (360 / turnSize) + rotation
        const angleRadians = (angle * Math.PI) / 180
        const x = Math.sin(angleRadians) * responsiveRadius
        const z = Math.cos(angleRadians) * responsiveRadius
        const depthScale = clamp(perspective / Math.max(perspective - z, 1), 0.72, 1.45)
        const visualScale = scale * depthScale
        const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2
        const blur = edgeBlur * smoothstep(0.35, 1, edge)
        const transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * verticalSpacing * fit}px, 0) rotateZ(${cardTilt}deg) scale(${visualScale})`
        const opacityText = opacity.toFixed(3)
        const filterText = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : 'none'
        const zIndexText = String(Math.round(depth * 100000) + index)
        const pointerEventsText = opacity > 0.25 ? 'auto' : 'none'
        const stateKey = `${transform}|${opacityText}|${filterText}|${zIndexText}|${pointerEventsText}`
        if (lastCardStateRef.current[index] === stateKey) return
        lastCardStateRef.current[index] = stateKey
        card.style.transform = transform
        card.style.opacity = opacityText
        card.style.filter = filterText
        card.style.zIndex = zIndexText
        card.style.pointerEvents = pointerEventsText
      })

      frameId = requestAnimationFrame(render)
    }

    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [
    normalizedItems,
    speed,
    direction,
    animationMode,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
    pauseOnHover,
  ])

  const rootStyle = {
    perspective: `${perspective}px`,
    '--infinite-spiral-card-width': `${cardWidth}px`,
    '--infinite-spiral-card-height': `${cardHeight}px`,
    '--infinite-spiral-card-radius': `${cardRadius}px`,
    cursor: animationMode === 'drag' || animationMode === 'all' ? 'grab' : 'default',
    touchAction: animationMode === 'drag' || animationMode === 'all' ? 'pan-x' : 'auto',
    userSelect: animationMode === 'drag' || animationMode === 'all' ? 'none' : 'auto',
  } as React.CSSProperties

  const dragEnabled = animationMode === 'drag' || animationMode === 'all'

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    event.currentTarget.style.cursor = dragEnabled ? 'grab' : 'default'
  }

  return (
    <div
      ref={rootRef}
      className={`infinite-spiral ${className}`.trim()}
      style={rootStyle}
      onMouseEnter={() => {
        hoveredRef.current = true
        wakeRef.current()
      }}
      onMouseLeave={() => {
        hoveredRef.current = false
        wakeRef.current()
      }}
      onPointerDown={(event) => {
        if (!dragEnabled || event.button !== 0) return
        draggingRef.current = true
        dragMovedRef.current = false
        lastPointerYRef.current = event.clientY
        targetProgressRef.current = progressRef.current
        event.currentTarget.setPointerCapture(event.pointerId)
        event.currentTarget.style.cursor = 'grabbing'
        wakeRef.current()
      }}
      onPointerMove={(event) => {
        if (!draggingRef.current) return
        const pointerDelta = event.clientY - lastPointerYRef.current
        lastPointerYRef.current = event.clientY
        if (Math.abs(pointerDelta) > 0.5) dragMovedRef.current = true
        targetProgressRef.current -= pointerDelta / Math.max(verticalSpacing, 1)
        wakeRef.current()
      }}
      onPointerUp={(event) => {
        stopDragging(event)
        wakeRef.current()
      }}
      onPointerCancel={(event) => {
        stopDragging(event)
        wakeRef.current()
      }}
      onClickCapture={(event) => {
        if (!dragMovedRef.current) return
        event.preventDefault()
        event.stopPropagation()
        dragMovedRef.current = false
      }}
    >
      <div className="infinite-spiral__stage" role="list" aria-label="Infinite spiral gallery">
        {normalizedItems.map((item, index) => {
          const Card = item.href ? 'a' : 'div'
          return (
            <Card
              key={item.id ?? `${item.src}-${index}`}
              ref={(node: HTMLElement | null) => {
                cardRefs.current[index] = node
              }}
              className="infinite-spiral__item"
              style={{ width: cardWidth, height: cardHeight, borderRadius: cardRadius }}
              href={item.href}
              target={item.target}
              rel={item.target === '_blank' ? 'noreferrer' : undefined}
              role="listitem"
              aria-label={item.label ?? item.alt}
            >
              <img
                className="infinite-spiral__image"
                src={item.src}
                alt={item.alt}
                loading={index < 6 ? 'eager' : 'lazy'}
                draggable={false}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: imageFit,
                  filter: `grayscale(${Math.min(1, Math.max(0, grayscale))})`,
                }}
              />
              <div aria-hidden="true" className="infinite-spiral__scrim" />
              {item.caption && (
                <span aria-hidden="true" className="infinite-spiral__name">
                  {item.caption}
                </span>
              )}
              <span aria-hidden="true" className="infinite-spiral__cta">
                VIEW <span aria-hidden="true">→</span>
              </span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default InfiniteSpiral