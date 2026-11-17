import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { brand } from '../config/brand'
import { useLanguage } from '../i18n/LanguageContext'
import { Backdrop } from './Backdrop'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
  const location = useLocation()
  const { t, locale } = useLanguage()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = locale === 'ta' ? t.seo.title : brand.seo.title
    }
  }, [locale, location.pathname, t.seo.title])

  return (
    <div className="relative flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Backdrop />
      <Navbar />
      <main id="main" className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
