import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SkipLink } from '@/components/layout/SkipLink'
import { CursorHighlight } from '@/components/ui/CursorHighlight'
import { useLenis } from '@/hooks/useLenis'
import { scrollToSection } from '@/lib/scroll'
import { About } from '@/sections/About/About'
import { Contact } from '@/sections/Contact/Contact'
import { Education } from '@/sections/Education/Education'
import { Experience } from '@/sections/Experience/Experience'
import { Hero } from '@/sections/Hero/Hero'
import { SECTION_LIST } from '@/sections/ids'
import { Projects } from '@/sections/Projects/Projects'
import { Skills } from '@/sections/Skills/Skills'

export default function App() {
  // Rolagem suave só em desktop com mouse; no toque o navegador já faz melhor.
  useLenis()

  // Link direto para uma seção (#projetos etc.): a grade de projetos carrega depois,
  // então a rolagem espera o layout assentar.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!SECTION_LIST.includes(id)) return
    const timer = window.setTimeout(() => scrollToSection(id), 450)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <CursorHighlight />
        <Navbar />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
