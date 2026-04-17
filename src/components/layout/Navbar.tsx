import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'
import { MagneticWrapper } from '@/components/effects/MagneticWrapper'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const y = (target as HTMLElement).offsetTop - 70
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md border-b'
          : 'bg-transparent'
      )}
      style={scrolled ? {
        background: 'rgba(12,10,9,0.94)',
        borderColor: 'rgba(194,119,58,0.15)',
        boxShadow: '0 1px 24px rgba(194,119,58,0.07)',
      } : undefined}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav('#home') }}
          className="text-xl font-bold tracking-widest"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#c2773a',
            textShadow: '0 0 12px rgba(194,119,58,0.45)',
            letterSpacing: '0.15em',
          }}
        >
          SC
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.slice(1)
            const isActive = active === sectionId
            return (
              <li key={href}>
                <MagneticWrapper strength={0.15} radius={80}>
                  <button
                    onClick={() => handleNav(href)}
                    className={cn(
                      'text-sm tracking-wide transition-colors duration-200 relative pb-1 group',
                      isActive ? '' : 'hover:text-[#fafaf9]'
                    )}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#c2773a' : '#a8a29e',
                    }}
                  >
                    {label}
                    {/* Terminal cursor — only on hover for inactive items */}
                    {!isActive && (
                      <span
                        className="ml-0.5 opacity-0 group-hover:opacity-100 animate-pulse"
                        style={{ color: '#c2773a', fontFamily: "'Fira Code', monospace", fontSize: '0.9em' }}
                        aria-hidden
                      >
                        █
                      </span>
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: '#c2773a' }}
                      />
                    )}
                  </button>
                </MagneticWrapper>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#c2773a',
                transform:
                  menuOpen && i === 0 ? 'rotate(45deg) translateY(5px)'
                  : menuOpen && i === 1 ? 'scaleX(0)'
                  : menuOpen && i === 2 ? 'rotate(-45deg) translateY(-5px)'
                  : undefined,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t"
          style={{
            background: 'rgba(12,10,9,0.98)',
            borderColor: 'rgba(194,119,58,0.15)',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleNav(href)}
              className="block w-full text-left px-6 py-3 text-sm transition-colors"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#a8a29e',
              }}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
