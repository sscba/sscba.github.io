import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Project } from '@/data/projects'

const ReconDiagram = lazy(() => import('./ReconDiagram').then((m) => ({ default: m.ReconDiagram })))
const HyperStreamDiagram = lazy(() => import('./HyperStreamDiagram').then((m) => ({ default: m.HyperStreamDiagram })))
const IntelliQueryDiagram = lazy(() => import('./IntelliQueryDiagram').then((m) => ({ default: m.IntelliQueryDiagram })))

const DiagramMap: Record<string, React.ComponentType> = {
  recon: ReconDiagram,
  hyperstream: HyperStreamDiagram,
  intelliquery: IntelliQueryDiagram,
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [diagramOpen, setDiagramOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const Diagram = DiagramMap[project.id]

  const toggleDiagram = () => {
    if (!hasOpened) setHasOpened(true)
    setDiagramOpen((o) => !o)
  }

  const accent = project.accentColor

  return (
    <div
      className="w-full h-full rounded-2xl overflow-auto flex flex-col"
      style={{
        background: '#1c1917',
        border: `1px solid ${accent}28`,
        boxShadow: `0 0 48px ${accent}10, 0 2px 0 ${accent}20 inset`,
      }}
    >
      {/* Top accent stripe */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, ${accent}cc, ${accent}20, transparent)` }}
      />

      <div className="flex flex-col gap-7 p-7 md:p-10 flex-1">
        {/* Header */}
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase mb-2"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: accent }}
          >
            {project.subtitle}
          </p>
          <h3
            className="text-2xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#fafaf9' }}
          >
            {project.title}
          </h3>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {project.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 text-center"
              style={{
                background: `${accent}09`,
                border: `1px solid ${accent}22`,
              }}
            >
              <div
                className="text-xl md:text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: accent }}
              >
                {s.value}
              </div>
              <div
                className="text-[10px] uppercase tracking-wider mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif", color: '#78716c' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p
          className="leading-relaxed text-sm md:text-base max-w-3xl"
          style={{ fontFamily: "'Inter', sans-serif", color: '#a8a29e', fontWeight: 300 }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                background: `${accent}0a`,
                border: `1px solid ${accent}30`,
                color: accent,
                letterSpacing: '0.02em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Architecture toggle */}
        <div>
          <button
            onClick={toggleDiagram}
            className="flex items-center gap-2 text-xs tracking-wide uppercase px-4 py-2.5 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              background: `${accent}0e`,
              border: `1px solid ${accent}45`,
              color: accent,
            }}
            aria-expanded={diagramOpen}
          >
            <motion.span
              animate={{ rotate: diagramOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown size={13} />
            </motion.span>
            {diagramOpen ? 'Hide' : 'View'} Architecture
          </button>

          <AnimatePresence>
            {diagramOpen && hasOpened && Diagram && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden mt-4"
              >
                <Suspense
                  fallback={
                    <div
                      className="w-full h-40 rounded-xl flex items-center justify-center text-sm"
                      style={{ background: '#111', color: '#78716c', fontFamily: "'Inter', sans-serif" }}
                    >
                      Loading diagram…
                    </div>
                  }
                >
                  <Diagram />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
