import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { Background } from './components/Background'
import { CommandPalette } from './components/CommandPalette'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    // reducedMotion="user" disables transform/layout animations for users who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Background />
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <Analytics />
      <SpeedInsights />
    </MotionConfig>
  )
}
