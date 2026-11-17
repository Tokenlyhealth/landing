import { useLanguage, type Locale } from '../i18n/LanguageContext'
import translations from '../i18n/translations.json'

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, locales } = useLanguage()

  return (
    <div
      className={`inline-flex rounded-lg border border-slate-300 bg-white p-0.5 text-base ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((code) => {
        const active = locale === code
        const label = translations[code as Locale].langShort
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`min-h-9 rounded-md px-2.5 py-1.5 font-semibold transition ${
              active
                ? 'bg-navy-900 text-white'
                : 'text-navy-600 hover:bg-slate-50 hover:text-navy-900'
            }`}
            aria-pressed={active}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
