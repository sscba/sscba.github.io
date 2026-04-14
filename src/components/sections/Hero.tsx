import { motion } from 'framer-motion'
import { useTypingEffect } from '@/hooks/useTypingEffect'

const COPPER = '#c2773a'
const COPPER_GLOW = 'rgba(194,119,58,0.4)'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: 'easeOut' as const },
})

export function Hero() {
  const typedText = useTypingEffect()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Profile image */}
        <motion.div {...fadeUp(0.1)} className="flex-shrink-0">
          <div
            className="relative w-44 h-56 md:w-52 md:h-64 rounded-2xl overflow-hidden"
            style={{
              border: `1.5px solid rgba(194,119,58,0.45)`,
              boxShadow: `0 0 28px ${COPPER_GLOW}, 0 16px 48px rgba(0,0,0,0.6)`,
            }}
          >
            <img
              src="resources/profile.jpg"
              alt="Shiv Chandekar"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="flex flex-col gap-5 text-center md:text-left">
          <motion.div {...fadeUp(0.2)}>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "'Inter', sans-serif", color: COPPER }}
            >
              &#47;&#47; Backend Engineer
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#fafaf9' }}
            >
              Shiv{' '}
              <span style={{ color: COPPER, textShadow: `0 0 24px ${COPPER_GLOW}` }}>
                Chandekar
              </span>
            </h1>
          </motion.div>

          {/* Typing subtitle */}
          <motion.div {...fadeUp(0.35)} className="h-8 flex items-center justify-center md:justify-start">
            <span
              className="text-lg md:text-xl"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, color: '#fafaf9' }}
              aria-label="Current role title"
            >
              {typedText}
              <span
                className="animate-pulse ml-0.5"
                style={{ color: COPPER, fontWeight: 400 }}
              >|</span>
            </span>
          </motion.div>

          <motion.p
            {...fadeUp(0.5)}
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", color: '#a8a29e', fontWeight: 300 }}
          >
            Architecting scalable microservices that process{' '}
            <span style={{ color: '#fafaf9', fontWeight: 500 }}>70M+ daily transactions</span>{' '}
            in enterprise fintech systems.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-7 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: COPPER,
                color: '#fafaf9',
                boxShadow: `0 4px 20px rgba(194,119,58,0.45)`,
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-7 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: 'transparent',
                color: COPPER,
                border: `1.5px solid ${COPPER}`,
              }}
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Quick stats strip */}
          <motion.div
            {...fadeUp(0.8)}
            className="flex flex-wrap gap-6 justify-center md:justify-start pt-2"
          >
            {[
              { value: '70M+', label: 'TPS Processed' },
              { value: '95%', label: 'Latency Cut' },
              { value: '2+', label: 'Years Exp.' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center md:items-start">
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: COPPER }}
                >
                  {value}
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Inter', sans-serif", color: '#78716c' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif", color: '#78716c' }}
        >
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#c2773a] to-transparent" />
      </motion.div>
    </section>
  )
}
