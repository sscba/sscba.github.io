import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const count = window.innerWidth > 768 ? 30 : 15

    const els = Array.from({ length: count }, () => {
      const el = document.createElement('div')
      const size = Math.random() * 2.5 + 1.5
      const top = Math.random() * 100
      const duration = Math.random() * 10 + 8
      const delay = Math.random() * 6

      Object.assign(el.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: '#c2773a',
        top: `${top}%`,
        left: '-10px',
        opacity: '0',
        boxShadow: '0 0 5px rgba(194,119,58,0.7), 0 0 10px rgba(194,119,58,0.3)',
        animation: `driftRight ${duration}s linear ${delay}s infinite`,
        pointerEvents: 'none',
      })
      container.appendChild(el)
      return el
    })

    return () => els.forEach((el) => el.remove())
  }, [])

  return (
    <div
      ref={containerRef}
      className="animated-bg fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
