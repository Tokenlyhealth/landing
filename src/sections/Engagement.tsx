import { SectionHeading } from '../components/SectionHeading'
import { Art } from '../components/visuals/Art'
import { useLanguage } from '../i18n/LanguageContext'

const artById = {
  ready: 'ready',
  customize: 'customize',
  build: 'build',
} as const

export function Engagement() {
  const { t } = useLanguage()

  return (
    <section className="section" id="engagement">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.engagement.eyebrow}
          title={t.engagement.title}
          sub={t.engagement.sub}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {t.engagement.paths.map((path) => (
            <article key={path.id} className="surface-card rounded-xl p-5 sm:p-6">
              <div className="rounded-lg bg-accent-50/70 px-2 py-3">
                <Art kind={artById[path.id as keyof typeof artById]} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-navy-900">{path.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-navy-600">{path.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
