const email = 'vigneshwaran@tokenly.in'
const whatsapp = '919789729792'
const phoneDisplay = '+91 97897 29792'
const name = 'Tokenly'
const productName = 'Tokenly Health'
const siteUrl = 'https://health.tokenly.in'
const canonicalUrl = `${siteUrl}/`

export const brand = {
  name,
  productName,
  legalName: name,
  positioning: 'Software that works the way your business works.',
  tagline: 'Better software. Smoother everyday work.',
  location: 'Tamil Nadu, India',
  mainSiteUrl: 'https://tokenly.in',
  siteUrl,
  canonicalUrl,
  email,
  whatsapp,
  phoneDisplay,
  hasEmail: true,
  hasWhatsApp: true,
  mailto: `mailto:${email}`,
  whatsappUrl: `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Hi ${name} — I would like to discuss healthcare software for our organisation.`,
  )}`,
  localeStorageKey: 'tokenly-health-locale',
  themeColor: '#fafaf9',
  seo: {
    title: `Hospital Management, Billing & Business Software | ${productName}`,
    description:
      'Software for hospitals, clinics, pharmacies and businesses. Manage hospital billing, appointments, pharmacy inventory and custom workflows with solutions built around your needs.',
    keywords:
      'hospital management software, hospital billing software, IPD billing software, OPD billing software, pharmacy billing software, pharmacy inventory management, hospital inventory management, appointment booking software, custom business software, healthcare software development, hospital software in India, hospital billing system for small hospitals',
    ogTitle: `${productName} · Better software. Smoother everyday work.`,
    ogDescription:
      'Software for hospitals, clinics, pharmacies and businesses. Hospital billing, appointments, pharmacy inventory and custom applications — built around your workflow.',
    ogImage: `${siteUrl}/og.png`,
    ogImageAlt: `${productName} — healthcare and business software for hospitals, clinics and pharmacies`,
    twitterTitle: `${productName} · Hospital billing, appointments and pharmacy software`,
    twitterDescription:
      'Software for hospitals, clinics, pharmacies and businesses. Built around your workflow, deployed your way.',
    shareText:
      'Take a look at this healthcare and business software company. They build solutions for hospital billing, appointments, pharmacy inventory and custom business applications.',
  },
} as const

export function structuredData() {
  const organizationId = `${canonicalUrl}#organization`
  const websiteId = `${canonicalUrl}#website`
  const serviceId = `${canonicalUrl}#service`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: brand.name,
        url: brand.mainSiteUrl,
        email: brand.email,
        telephone: `+${brand.whatsapp}`,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: brand.location,
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: canonicalUrl,
        name: brand.productName,
        description: brand.seo.description,
        inLanguage: 'en-IN',
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': serviceId,
        name: brand.productName,
        url: canonicalUrl,
        image: brand.seo.ogImage,
        description: brand.seo.description,
        parentOrganization: { '@id': organizationId },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: brand.location,
        },
        email: brand.email,
        telephone: `+${brand.whatsapp}`,
        serviceType: [
          'Hospital Management and Billing Software',
          'Appointment Booking Systems',
          'Pharmacy Billing and Inventory Software',
          'Custom Business Applications',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Hospital Management and Billing Software',
        applicationCategory: 'BusinessApplication',
        description:
          'Hospital billing software for OPD, IPD, admissions, payments, historical bill search and hospital medicine inventory.',
        url: `${siteUrl}/#hospital`,
        provider: { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Appointment Booking Software',
        applicationCategory: 'BusinessApplication',
        description:
          'Appointment booking software for patient requests, front-desk schedules, rescheduling and follow-ups.',
        url: `${siteUrl}/#appointments`,
        provider: { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Pharmacy Billing and Inventory Software',
        applicationCategory: 'BusinessApplication',
        description:
          'Retail pharmacy billing and inventory software for sales, stock, purchases, batch and expiry tracking.',
        url: `${siteUrl}/#pharmacy`,
        provider: { '@id': organizationId },
      },
      {
        '@type': 'Service',
        name: 'Custom Business Software',
        description:
          'Custom websites, internal applications, dashboards, workflow automation and integrations built around existing business processes.',
        url: `${siteUrl}/#custom`,
        provider: { '@id': organizationId },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: brand.location,
        },
      },
    ],
  }
}
