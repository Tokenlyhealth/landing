import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { brand } from '../config/brand'
import translations from './translations.json'

export type Locale = keyof typeof translations

type Dictionary = (typeof translations)[Locale]

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
  locales: Locale[]
}

const STORAGE_KEY = brand.localeStorageKey
const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ta') return stored
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? 'en' : readStoredLocale(),
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'ta' ? 'ta' : 'en'
    if (locale !== 'ta' || document.getElementById('font-noto-tamil')) return
    const link = document.createElement('link')
    link.id = 'font-noto-tamil'
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap'
    document.head.appendChild(link)
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
      locales: Object.keys(translations) as Locale[],
    }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
