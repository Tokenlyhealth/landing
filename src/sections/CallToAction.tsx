import { Button } from '../components/Button'
import { useLanguage } from '../i18n/LanguageContext'

export function CallToAction() {
  const { t } = useLanguage()

  return (
    <section className="section" aria-labelledby="mid-cta-title">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-xl bg-navy-900 px-6 py-12 text-white sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute -top-16 -right-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(13_122_79/0.35),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(17_150_95/0.18),transparent_70%)]"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2 id="mid-cta-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">{t.cta.sub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#contact" size="lg">
                {t.cta.primary}
              </Button>
              <Button href="#contact" variant="inverse" size="lg">
                {t.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
