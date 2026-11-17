import { useState } from 'react'
import { brand } from '../config/brand'
import { useLanguage } from '../i18n/LanguageContext'

export function ShareButton() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  async function onShare() {
    const url = brand.canonicalUrl
    const text = t.share.message
    const title = brand.productName

    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, text, url })
        return
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      setStatus('copied')
      window.setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const label =
    status === 'copied' ? t.share.copied : status === 'error' ? t.share.failed : t.share.label

  return (
    <button
      type="button"
      onClick={() => {
        void onShare()
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none">
        <path
          d="M4 10.5v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5M10 12.5v-9M10 3.5 6.5 7M10 3.5 13.5 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  )
}
