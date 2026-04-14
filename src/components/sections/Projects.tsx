import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/projects/ProjectCard'

const COPPER = '#c2773a'

function StickyProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[number]
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.5])
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0])

  return (
    <div
      ref={ref}
      className="sticky"
      style={{
        top: `${72 + index * 12}px`,
        zIndex: index + 1,
        minHeight: 'min(85vh, 700px)',
        paddingBottom: index < total - 1 ? '8px' : 0,
      }}
    >
      <motion.div style={{ scale, opacity, y, minHeight: 'min(82vh, 680px)' }} className="w-full">
        <ProjectCard project={project} />
      </motion.div>
    </div>
  )
}

export function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true })

  return (
    <section id="projects" className="relative py-28 px-6" style={{ zIndex: 1 }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' as const }}
          className="mb-16 text-center"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif", color: COPPER }}
          >
            03 / Work
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#fafaf9' }}
          >
            Featured <em style={{ color: COPPER, fontStyle: 'italic' }}>Projects</em>
          </h2>
          <p
            className="mt-4 text-sm"
            style={{ fontFamily: "'Inter', sans-serif", color: '#78716c' }}
          >
            Scroll through to explore each project
          </p>
        </motion.div>

        {/* Sticky card stack */}
        <div style={{ position: 'relative' }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{ minHeight: '90vh', paddingBottom: i < projects.length - 1 ? '2rem' : 0 }}
            >
              <StickyProjectCard project={project} index={i} total={projects.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
