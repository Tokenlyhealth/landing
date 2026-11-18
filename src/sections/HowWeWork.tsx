import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

export function HowWeWork() {
  const { t } = useLanguage()

  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} sub={t.process.sub} />

        <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <li
            className="pointer-events-none absolute top-7 right-4 left-4 hidden h-px bg-accent-100 lg:block"
            aria-hidden
          />
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="relative min-w-0">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-lg border border-accent-100 bg-white text-lg font-semibold text-accent-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-navy-600">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
