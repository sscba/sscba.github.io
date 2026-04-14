import { AnimatedBackground } from '@/components/effects/AnimatedBackground'
import { ScrollToTop } from '@/components/effects/ScrollToTop'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <>
      {/* Fixed animated dot-grid + particles */}
      <AnimatedBackground />

      {/* Sticky navigation */}
      <Navbar />

      {/* Main content — sits above the fixed bg */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  )
}
