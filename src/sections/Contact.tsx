import { ContactForm } from '../components/ContactForm'
import { brand } from '../config/brand'
import { useLanguage } from '../i18n/LanguageContext'

export function Contact() {
  const { t } = useLanguage()

  return (
    <section className="section" id="contact">
      <div className="wrap grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div>
          <p className="mb-2 text-sm font-semibold tracking-[0.06em] break-words text-accent-700 uppercase">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy-600">{t.contact.sub}</p>

          <dl className="mt-7 space-y-4 text-base">
            <div>
              <dt className="font-semibold text-navy-900">{t.contact.location}</dt>
              <dd className="mt-1 text-navy-600">{brand.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-900">{t.contact.email}</dt>
              <dd className="mt-1 text-navy-600">
                <a href={brand.mailto} className="text-accent-700 hover:underline">
                  {brand.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-900">{t.contact.phone}</dt>
              <dd className="mt-1 text-navy-600">
                <a href={`tel:+${brand.whatsapp}`} className="hover:underline">
                  {brand.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-900">{t.contact.whatsapp}</dt>
              <dd className="mt-1 text-navy-600">
                <a
                  href={brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 hover:underline"
                >
                  {t.contact.whatsappCta}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
