import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { ScrambleText } from '@/components/effects/ScrambleText'

const COPPER = '#c2773a'

interface StatCardProps {
  value: number
  suffix: string
  label: string
  color?: string
}

function StatCard({ value, suffix, label, color = COPPER }: StatCardProps) {
  const { count, elementRef } = useCountUp(value)

  return (
    <div
      ref={elementRef}
      className="rounded-xl p-5 flex flex-col gap-1.5 border-l-2"
      style={{
        background: '#1c1917',
        borderColor: color,
        border: `1px solid rgba(194,119,58,0.15)`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <span
        className="text-3xl font-bold"
        style={{ fontFamily: "'Playfair Display', serif", color }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-xs uppercase tracking-wider"
        style={{ fontFamily: "'Inter', sans-serif", color: '#78716c', letterSpacing: '0.1em' }}
      >
        {label}
      </span>
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: 'easeOut' as const },
  })

  return (
    <section id="about" ref={ref} className="relative py-28 px-6" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-16 text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif", color: COPPER }}
          >
            01 / About
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#fafaf9' }}
          >
            <ScrambleText text="About Me" trigger={inView} lockSpeed={60} />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div
            className="flex flex-col gap-5 leading-relaxed text-base"
            style={{ fontFamily: "'Inter', sans-serif", color: '#a8a29e', fontWeight: 300 }}
          >
            <motion.p {...fadeUp(0.1)}>
              I&apos;m a Backend Software Engineer at{' '}
              <span style={{ color: '#fafaf9', fontWeight: 500 }}>MindGate Solutions</span>, where
              I design and build the distributed systems that power India&apos;s UPI payment
              infrastructure — from low-latency Kafka consumers to batch reconciliation pipelines
              processing 70M+ transaction records nightly.
            </motion.p>
            <motion.p {...fadeUp(0.2)}>
              I specialise in{' '}
              <span style={{ color: '#fafaf9', fontWeight: 500 }}>enterprise-grade microservices</span>{' '}
              — systems that must be correct at microsecond precision, survive node failures, and
              scale horizontally. Recognised with the{' '}
              <span style={{ color: COPPER, fontWeight: 500 }}>"WOW Machine" award</span>{' '}
              for delivering an 18× performance improvement and 70% cost reduction.
            </motion.p>
            <motion.p {...fadeUp(0.3)}>
              Beyond fintech, I build AI-powered developer tooling — local LLM pipelines that
              bring natural-language analytics to data teams without cloud API costs or latency.
            </motion.p>

            <motion.blockquote
              {...fadeUp(0.4)}
              className="rounded-lg p-5 mt-1 italic"
              style={{
                background: 'rgba(194,119,58,0.06)',
                borderLeft: `3px solid ${COPPER}`,
                color: '#a8a29e',
              }}
            >
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                &ldquo;I don&apos;t just write code that works — I architect systems that keep
                working at scale, under load, and through failures.&rdquo;
              </p>
            </motion.blockquote>
          </div>

          {/* Stats grid */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
            <StatCard value={70} suffix="M+" label="Daily Transactions" />
            <StatCard value={95} suffix="%" label="Latency Reduction" color="#10b981" />
            <StatCard value={18} suffix="×" label="Performance Boost" color="#d97706" />
            <StatCard value={2} suffix="+" label="Years Experience" color="#8b5cf6" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
