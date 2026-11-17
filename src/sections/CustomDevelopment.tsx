import { Button } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { Art } from '../components/visuals/Art'
import { useLanguage } from '../i18n/LanguageContext'

export function CustomDevelopment() {
  const { t } = useLanguage()

  return (
    <section className="section" id="custom">
      <div className="wrap">
        <div className="surface-card overflow-hidden rounded-xl lg:grid lg:grid-cols-2">
          <div className="flex items-center bg-accent-50/60 px-5 py-6 sm:px-8">
            <Art kind="custom" />
          </div>
          <div className="p-5 sm:p-8">
            <SectionHeading
              eyebrow={t.custom.eyebrow}
              title={t.custom.title}
              sub={t.custom.sub}
            />

            <h3 className="mt-8 text-lg font-semibold text-navy-900">{t.custom.examplesTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {t.custom.examples.map((example) => (
                <li
                  key={example}
                  className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-base font-medium text-navy-800"
                >
                  {example}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="#contact" size="lg">
                {t.custom.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
