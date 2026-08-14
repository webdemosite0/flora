import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FloraProvider } from './store/FloraContext'
import { useReducedMotion } from './lib/hooks'

import { LoadingScreen } from './components/LoadingScreen'
import { ScrollProgress } from './components/ScrollProgress'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { MobileMenu } from './components/MobileMenu'
import { SearchOverlay } from './components/SearchOverlay'
import { ProductModal } from './components/ProductModal'

import { Hero } from './components/Hero'
import { IntroSection } from './components/IntroSection'
import { CoffeeCollection } from './components/CoffeeCollection'
import { MenuSection } from './components/MenuSection'
import { CoffeeOrigins } from './components/CoffeeOrigins'
import { ProcessStory } from './components/ProcessStory'
import { BrewingExperience } from './components/BrewingExperience'
import { CoffeeCustomizer } from './components/CoffeeCustomizer'
import { CoffeeBean3D } from './components/CoffeeBean3D'
import { CafeExperience } from './components/CafeExperience'
import { LocationSection } from './components/LocationSection'
import { Testimonials } from './components/Testimonials'
import { Gallery } from './components/Gallery'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'

export default function App() {
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), reduced ? 350 : 1300)
    return () => window.clearTimeout(t)
  }, [reduced])

  // Hold the page still behind the loading screen.
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <FloraProvider>
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>

      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[140] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-xs focus:tracking-widest focus:text-cream focus:uppercase"
      >
        Skip to menu
      </a>

      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <MobileMenu />
      <SearchOverlay />
      <ProductModal />

      {/*
        The page itself is never hidden behind an animation — the loading screen
        simply sits on top of it and fades away. If frames are throttled (a
        background tab, say) the content is still there when the visitor looks.
      */}
      <main>
        <Hero />
        <IntroSection />
        <CoffeeCollection />
        <MenuSection />
        <CoffeeOrigins />
        <ProcessStory />
        <BrewingExperience />
        <CoffeeCustomizer />
        <CoffeeBean3D />
        <CafeExperience />
        <LocationSection />
        <Testimonials />
        <Gallery />
        <Newsletter />
      </main>

      <Footer />
    </FloraProvider>
  )
}
