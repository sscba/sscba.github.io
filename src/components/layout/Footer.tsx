import { TickerTape } from '@/components/effects/TickerTape'

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: '#080604',
        borderColor: 'rgba(194,119,58,0.12)',
      }}
    >
      <TickerTape />
      <p className="py-8 text-sm text-center" style={{ fontFamily: "'Inter', sans-serif", color: '#78716c' }}>
        © 2025 Shiv Chandekar.{' '}
        <span style={{ color: '#c2773a' }}>Crafted with passion for scalable systems.</span>
      </p>
    </footer>
  )
}
