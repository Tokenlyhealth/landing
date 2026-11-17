import { Button } from '../components/Button'
import { useLanguage } from '../i18n/LanguageContext'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative scroll-mt-24" id="top">
      <div className="wrap py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.14em] text-accent-700 uppercase">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl sm:leading-[1.12]">
            {t.hero.headline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-600 sm:text-xl">{t.hero.sub}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#contact" size="lg">
              {t.hero.ctaPrimary}
            </Button>
            <Button href="#solutions" variant="secondary" size="lg">
              {t.hero.ctaSecondary}
            </Button>
          </div>

          <p className="mt-6 text-base font-medium text-navy-700">{t.hero.support}</p>
          <p className="mt-2 text-base text-navy-500">{t.hero.served}</p>
        </div>
      </div>
    </section>
  )
}
