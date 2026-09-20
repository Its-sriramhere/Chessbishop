import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Splash from './components/Splash'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import ChessCursor from './effects/ChessCursor'
import PostHeroAurora from './effects/PostHeroAurora'
import FloatingAssistant from './components/FloatingAssistant'
import NextPageBadge from './components/NextPageBadge'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import GalleryCarousel from './pages/GalleryCarousel'
import GalleryDetail from './pages/GalleryDetail'
import Career from './pages/Career'
import CoachApply from './pages/CoachApply'
import Contact from './pages/Contact'

const PAGE_TITLES: Record<string, string> = {
  '/home': 'Chessbishop – Master The Game',
  '/about': 'About – Chessbishop',
  '/gallery': 'Gallery – Chessbishop',
  '/gallery/carousel': 'Gallery Carousel – Chessbishop',
  '/career': 'Career – Chessbishop',
  '/career/apply': 'Coach Application – Chessbishop',
  '/contact': 'Contact – Chessbishop',
}

function ShellMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const title = PAGE_TITLES[pathname]
    if (title) document.title = title
  }, [pathname])

  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}

function Shell() {
  return (
    <div style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="bg-page" aria-hidden="true" />
      <PostHeroAurora />
      <ChessCursor />
      <FloatingAssistant />
      <NextPageBadge />
      <Navbar />
      <main style={{ flex: 1 }} id="main">
        <PageTransition>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/carousel" element={<GalleryCarousel />} />
            <Route path="/gallery/:slug" element={<GalleryDetail />} />
            <Route path="/career" element={<Career />} />
            <Route path="/career/apply" element={<CoachApply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ShellMeta />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/*" element={<Shell />} />
      </Routes>
    </BrowserRouter>
  )
}