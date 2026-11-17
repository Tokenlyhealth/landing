import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

export function Problems() {
  const { t } = useLanguage()

  return (
    <section className="section" id="problems">
      <div className="wrap">
        <SectionHeading eyebrow={t.problems.eyebrow} title={t.problems.title} />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.problems.items.map((item) => (
            <li
              key={item}
              className="surface-card flex items-start gap-3 rounded-xl px-4 py-4 text-base font-medium text-navy-800"
            >
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-600" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
