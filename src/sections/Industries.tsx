import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

export function Industries() {
  const { t } = useLanguage()

  return (
    <section className="section pt-4 sm:pt-6" id="industries">
      <div className="wrap">
        <SectionHeading eyebrow={t.industries.eyebrow} title={t.industries.title} />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {t.industries.items.map((industry) => (
            <li
              key={industry}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-base font-medium text-navy-800"
            >
              {industry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
