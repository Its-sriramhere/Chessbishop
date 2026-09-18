type ShinyTextProps = {
  text: string
  className?: string
  speed?: number
}

export default function ShinyText({ text, className = '', speed = 6 }: ShinyTextProps) {
  return (
    <span
      className={className}
      style={{
        background: 'linear-gradient(110deg, rgba(244,240,230,0.45) 0%, #f4f0e6 20%, rgba(216,182,106,0.9) 40%, #f4f0e6 60%, rgba(244,240,230,0.45) 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: `gold-shimmer ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  )
}