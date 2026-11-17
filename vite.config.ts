import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { brand, structuredData } from './src/config/brand.ts'

function injectBrand(): Plugin {
  return {
    name: 'inject-brand',
    transformIndexHtml(html) {
      const replacements: Record<string, string> = {
        '%BRAND_NAME%': brand.name,
        '%BRAND_PRODUCT%': brand.productName,
        '%SITE_URL%': brand.siteUrl,
        '%CANONICAL_URL%': brand.canonicalUrl,
        '%SEO_TITLE%': brand.seo.title,
        '%SEO_DESCRIPTION%': brand.seo.description,
        '%SEO_KEYWORDS%': brand.seo.keywords,
        '%OG_TITLE%': brand.seo.ogTitle,
        '%OG_DESCRIPTION%': brand.seo.ogDescription,
        '%OG_IMAGE%': brand.seo.ogImage,
        '%OG_IMAGE_ALT%': brand.seo.ogImageAlt,
        '%TWITTER_TITLE%': brand.seo.twitterTitle,
        '%TWITTER_DESCRIPTION%': brand.seo.twitterDescription,
        '%THEME_COLOR%': brand.themeColor,
        '%JSON_LD%': JSON.stringify(structuredData()),
      }

      let next = html
      for (const [token, value] of Object.entries(replacements)) {
        next = next.split(token).join(value)
      }
      return next
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), injectBrand()],
})
