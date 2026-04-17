import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedBackground } from '@/components/effects/AnimatedBackground'
import { ScrollToTop } from '@/components/effects/ScrollToTop'
import { PipelineDivider } from '@/components/effects/PipelineDivider'
import { CandlestickLoader } from '@/components/effects/CandlestickLoader'
import { LogTailTerminal } from '@/components/effects/LogTailTerminal'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* First-session cinematic loader */}
      <CandlestickLoader onComplete={() => setLoaded(true)} />

      {/* Main site — fades in after loader completes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Fixed animated dot-grid + particles */}
        <AnimatedBackground />

        {/* Sticky navigation */}
        <Navbar />

        {/* Main content — sits above the fixed bg */}
        <main className="relative" style={{ zIndex: 1 }}>
          <Hero />
          <PipelineDivider label="hero → about" />
          <About />
          <PipelineDivider label="about → skills" />
          <Skills />
          <PipelineDivider label="skills → projects" />
          <Projects />
          <PipelineDivider label="projects → contact" />
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
        <LogTailTerminal />
      </motion.div>
    </>
  )
}
