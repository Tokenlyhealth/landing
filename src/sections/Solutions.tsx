import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { Art } from '../components/visuals/Art'
import { useLanguage } from '../i18n/LanguageContext'

const artById = {
  hospital: 'hospital',
  appointments: 'appointments',
  pharmacy: 'pharmacy',
} as const

export function Solutions() {
  const { t } = useLanguage()
  const [openId, setOpenId] = useState<string | null>(t.solutions.items[0]?.id ?? null)

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace('#', '')
      if (t.solutions.items.some((item) => item.id === id)) {
        setOpenId(id)
      }
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [t.solutions.items])

  return (
    <section className="section" id="solutions">
      <div className="wrap">
        <SectionHeading
          eyebrow={t.solutions.eyebrow}
          title={t.solutions.title}
          sub={t.solutions.sub}
          note={t.solutions.disclaimer}
        />

        <div className="mt-10 space-y-5">
          {t.solutions.items.map((item, index) => {
            const open = openId === item.id
            const artKind = artById[item.id as keyof typeof artById]
            const reverse = index % 2 === 1

            return (
              <article
                key={item.id}
                id={item.id}
                className="surface-card scroll-mt-24 overflow-hidden rounded-xl"
              >
                <div className="grid lg:grid-cols-2">
                  <div
                    className={`flex items-start bg-accent-50/60 px-5 py-6 sm:px-8 ${reverse ? 'lg:order-2' : ''}`}
                  >
                    {artKind ? <Art kind={artKind} /> : null}
                  </div>
                  <div className={`p-5 sm:p-8 ${reverse ? 'lg:order-1' : ''}`}>
                    <p className="text-sm font-semibold tracking-[0.06em] break-words text-accent-700 uppercase">
                      {item.kicker}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-navy-900 sm:text-[1.7rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-navy-600">{item.description}</p>

                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {item.highlights.map((point) => (
                        <li key={point} className="flex min-w-0 items-start gap-2.5 text-base text-navy-700">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
                            aria-hidden
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className="mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-accent-700 hover:text-accent-600"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : item.id)}
                    >
                      {open ? t.solutions.collapse : t.solutions.expand}
                      <span aria-hidden className={`transition ${open ? 'rotate-180' : ''}`}>
                        ▾
                      </span>
                    </button>

                    {open ? (
                      <div className="mt-5 space-y-5 border-t border-slate-200 pt-5">
                        {item.capabilities.map((capability) => (
                          <div key={capability.title}>
                            <h4 className="text-base font-semibold text-navy-900">
                              {capability.title}
                            </h4>
                            {'note' in capability && capability.note ? (
                              <p className="mt-1 text-sm font-medium text-accent-700">
                                {capability.note}
                              </p>
                            ) : null}
                            <ul className="mt-2 space-y-1.5">
                              {capability.points.map((point) => (
                                <li
                                  key={point}
                                  className="flex min-w-0 items-start gap-2.5 text-base text-navy-700"
                                >
                                  <span
                                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600"
                                    aria-hidden
                                  />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
