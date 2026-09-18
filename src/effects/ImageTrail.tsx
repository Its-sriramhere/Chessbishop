import { useRef } from 'react'

type ImageTrailProps = {
  images: string[]
  alt?: string
  size?: number
  className?: string
}

export default function ImageTrail({ images, alt = '', size = 132, className = '' }: ImageTrailProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const counter = useRef(0)

  const spawn = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!wrapRef.current || !images.length) return
    const img = document.createElement('img')
    img.src = images[counter.current % images.length]
    img.alt = alt
    img.style.cssText = `
      position: fixed;
      left: ${e.clientX - size / 2}px;
      top: ${e.clientY - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      object-fit: cover;
      border-radius: 14px;
      pointer-events: none;
      z-index: 90;
      transform: translateY(10px) rotate(-6deg);
      opacity: 0;
      will-change: transform, opacity;
    `
    document.body.appendChild(img)
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => {
        const anim = img.animate(
          [
            { transform: 'translateY(14px) rotate(-6deg) scale(0.9)', opacity: 0 },
            { transform: 'translateY(0) rotate(-2deg) scale(1)', opacity: 0.95 },
            { transform: 'translateY(-8px) rotate(3deg) scale(1)', opacity: 0.95 },
            { transform: 'translateY(-24px) rotate(1deg) scale(0.94)', opacity: 0 },
          ],
          { duration: 620, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        )
        anim.onfinish = () => img.remove()
      }),
    )
    counter.current += 1
  }

  return (
    <div ref={wrapRef} onPointerMove={spawn} className={className} style={{ position: 'relative' }}>
      {images.length > 0 && (
        <div
          data-trail-zone
          style={{ position: 'absolute', inset: 0, padding: 40 }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}