import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github, Briefcase, Download } from 'lucide-react'

const COPPER = '#c2773a'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shiv-chandekar-0799241b6/', icon: Linkedin, color: '#60a5fa' },
  { label: 'GitHub',   href: 'https://github.com/sscba',                      icon: Github,   color: '#fafaf9' },
  { label: 'Naukri',  href: 'https://www.naukri.com/mnjuser/profile',         icon: Briefcase, color: '#818cf8' },
  { label: 'Email',    href: 'mailto:shivchande2805@gmail.com',                  icon: Mail,     color: COPPER },
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: 'easeOut' as const },
  })

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = 'resources/Shiv_Chandekar_Resume.pdf'
    link.download = 'Shiv_Chandekar_Resume.pdf'
    link.click()
  }

  return (
    <section id="contact" ref={ref} className="relative py-28 px-6" style={{ zIndex: 1 }}>
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-10">
        {/* Header */}
        <motion.div {...fadeUp(0)}>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif", color: COPPER }}
          >
            04 / Contact
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#fafaf9' }}
          >
            Let&apos;s{' '}
            <em style={{ color: COPPER, fontStyle: 'italic' }}>Connect</em>
          </h2>
        </motion.div>

        <motion.p
          {...fadeUp(0.1)}
          className="text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: '#a8a29e', fontWeight: 300 }}
        >
          Open to discussing backend architecture, fintech challenges, or interesting
          distributed systems problems. If you have an opportunity or just want to talk
          tech — reach out.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          {...fadeUp(0.2)}
          href="mailto:shivchande2805@gmail.com"
          className="mx-auto flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: 'rgba(194,119,58,0.08)',
            border: `1.5px solid rgba(194,119,58,0.45)`,
            color: COPPER,
          }}
          whileHover={{ boxShadow: '0 0 32px rgba(194,119,58,0.25)' }}
        >
          <Mail size={16} />
          shivchande95@gmail.com
        </motion.a>

        {/* Social links */}
        <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon, color }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: '#1c1917',
                border: '1px solid rgba(255,255,255,0.08)',
                color,
              }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div {...fadeUp(0.35)} className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'rgba(194,119,58,0.15)' }} />
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", color: '#78716c' }}>or</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(194,119,58,0.15)' }} />
        </motion.div>

        {/* Resume download */}
        <motion.div {...fadeUp(0.4)}>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: '#1c1917',
              border: `1px solid rgba(194,119,58,0.3)`,
              color: '#fafaf9',
            }}
          >
            <Download size={15} style={{ color: COPPER }} />
            Download Résumé
          </button>
        </motion.div>
      </div>
    </section>
  )
}
