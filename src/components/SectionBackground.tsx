import ChessPieces from '../effects/ChessPieces'

export default function SectionBackground({ count = 14 }: { count?: number }) {
  return (
    <div className="section-bg" aria-hidden="true">
      <ChessPieces count={count} />
    </div>
  )
}
