import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

export function WhyUs() {
  const { t } = useLanguage()

  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item) => (
            <li
              key={item}
              className="surface-card rounded-xl px-4 py-4 text-base font-medium text-navy-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
