import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories } from '@/data/skills'

const COPPER = '#c2773a'

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' as const }}
          className="mb-16 text-center"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Inter', sans-serif", color: COPPER }}
          >
            02 / Skills
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: '#fafaf9' }}
          >
            Technical <em style={{ color: COPPER, fontStyle: 'italic' }}>Arsenal</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.07, ease: 'easeOut' as const }}
              className="rounded-xl p-6 transition-all duration-300"
              style={{
                background: '#1c1917',
                border: '1px solid rgba(194,119,58,0.15)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(194,119,58,0.4)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(194,119,58,0.08)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(194,119,58,0.15)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              <h3
                className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif", color: COPPER }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      background: 'rgba(194,119,58,0.06)',
                      border: '1px solid rgba(194,119,58,0.2)',
                      color: '#a8a29e',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.color = '#fafaf9'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(194,119,58,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.color = '#a8a29e'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(194,119,58,0.2)'
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-3.5 h-3.5 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    {item.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
