import { SectionHeading } from '../components/SectionHeading'
import { Art } from '../components/visuals/Art'
import { useLanguage } from '../i18n/LanguageContext'

const artById = {
  cloud: 'cloud',
  premise: 'premise',
  remote: 'remote',
} as const

export function Deployment() {
  const { t } = useLanguage()

  return (
    <section className="section" id="deployment">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.deployment.eyebrow}
          title={t.deployment.title}
          sub={t.deployment.sub}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {t.deployment.items.map((model) => (
            <article key={model.id} className="surface-card rounded-xl p-5 sm:p-6">
              <div className="max-h-32 overflow-hidden">
                <Art kind={artById[model.id as keyof typeof artById]} />
              </div>
              <h3 className="mt-3 text-xl font-semibold text-navy-900">{model.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-navy-600">{model.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
