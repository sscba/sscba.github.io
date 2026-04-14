export function Footer() {
  return (
    <footer
      className="py-8 text-center border-t"
      style={{
        background: '#080604',
        borderColor: 'rgba(194,119,58,0.12)',
      }}
    >
      <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: '#78716c' }}>
        © 2025 Shiv Chandekar.{' '}
        <span style={{ color: '#c2773a' }}>Crafted with passion for scalable systems.</span>
      </p>
    </footer>
  )
}
