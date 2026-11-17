import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
import { useLanguage } from '../i18n/LanguageContext'
import { Logo } from './Logo'
import { ShareButton } from './ShareButton'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const solutionLinks = [
    { href: '/#hospital', label: t.footer.hospital },
    { href: '/#appointments', label: t.footer.appointments },
    { href: '/#pharmacy', label: t.footer.pharmacy },
    { href: '/#custom', label: t.footer.custom },
  ]
  const companyLinks = [
    { href: '/#deployment', label: t.footer.deployment },
    { href: '/#about', label: t.footer.about },
    { href: '/#contact', label: t.footer.contact },
    { href: brand.mainSiteUrl, label: t.footer.tokenly, external: true },
    { to: '/privacy', label: t.footer.privacy },
    { to: '/terms', label: t.footer.terms },
  ]

  function renderLink(link: {
    label: string
    href?: string
    to?: string
    external?: boolean
  }) {
    if (link.to) {
      return (
        <Link key={link.to} to={link.to} className="hover:text-navy-900">
          {link.label}
        </Link>
      )
    }
    if (link.external && link.href) {
      return (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-navy-900"
        >
          {link.label}
        </a>
      )
    }
    return (
      <a key={link.href} href={link.href} className="hover:text-navy-900">
        {link.label}
      </a>
    )
  }

  return (
    <footer className="relative w-full border-t border-slate-200">
      <div className="wrap flex flex-col gap-10 py-10 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-base leading-relaxed text-navy-600">{t.footer.blurb}</p>
            <div className="mt-5">
              <ShareButton />
            </div>
          </div>

          <nav aria-label={t.footer.solutions} className="flex flex-col gap-2 text-base text-navy-600">
            <p className="font-semibold text-navy-900">{t.footer.solutions}</p>
            {solutionLinks.map(renderLink)}
          </nav>

          <nav aria-label={t.footer.company} className="flex flex-col gap-2 text-base text-navy-600">
            <p className="font-semibold text-navy-900">{t.footer.company}</p>
            {companyLinks.map(renderLink)}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-navy-600">
          <a href={brand.mailto} className="hover:text-navy-900">
            {brand.email}
          </a>
          <span className="text-navy-500" aria-hidden>
            ·
          </span>
          <a href={`tel:+${brand.whatsapp}`} className="hover:text-navy-900">
            {brand.phoneDisplay}
          </a>
          <span className="text-navy-500" aria-hidden>
            ·
          </span>
          <a
            href={brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-navy-900"
          >
            WhatsApp
          </a>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-sm text-navy-500 sm:flex-row sm:items-center sm:justify-between sm:text-base">
          <p>
            © {year} {brand.legalName}. {t.footer.rights}
          </p>
          <p className="sm:text-right">{t.footer.tag}</p>
        </div>
      </div>
    </footer>
  )
}
