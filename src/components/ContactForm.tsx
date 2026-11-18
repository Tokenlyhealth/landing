import { useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import { brand } from '../config/brand'
import { useLanguage } from '../i18n/LanguageContext'
import { Button } from './Button'

type FormState = {
  name: string
  organization: string
  phone: string
  email: string
  solution: string
  description: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  name: '',
  organization: '',
  phone: '',
  email: '',
  solution: '',
  description: '',
}

export function ContactForm() {
  const { t } = useLanguage()
  const form = t.contact.form
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const update =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      if (status !== 'submitting') {
        setStatus('idle')
        setStatusMessage('')
      }
    }

  function validate(next: FormState): FormErrors {
    const nextErrors: FormErrors = {}
    if (!next.name.trim() || next.name.trim().length < 2) nextErrors.name = form.errors.name
    if (!next.organization.trim()) nextErrors.organization = form.errors.organization
    if (!/^[6-9]\d{9}$/.test(next.phone.replace(/\s+/g, ''))) nextErrors.phone = form.errors.phone
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) nextErrors.email = form.errors.email
    if (!next.solution) nextErrors.solution = form.errors.solution
    if (!next.description.trim() || next.description.trim().length < 20) {
      nextErrors.description = form.errors.description
    }
    return nextErrors
  }

  function buildMessage(next: FormState) {
    return [
      `New consultation request from ${next.name}`,
      `Organisation: ${next.organization}`,
      `Phone: ${next.phone}`,
      `Email: ${next.email}`,
      `Solution: ${next.solution}`,
      '',
      next.description.trim(),
    ].join('\n')
  }

  function enquiryMessage(next: FormState) {
    const lines = [
      next.name.trim() && `Name: ${next.name.trim()}`,
      next.organization.trim() && `Organisation: ${next.organization.trim()}`,
      next.phone.trim() && `Phone: ${next.phone.trim()}`,
      next.email.trim() && `Email: ${next.email.trim()}`,
      next.solution && `Solution: ${next.solution}`,
      next.description.trim(),
    ].filter((line): line is string => Boolean(line))

    if (lines.length === 0) {
      return `Hello ${brand.name},\n\nI would like to discuss software for our organisation.`
    }

    return [`Enquiry for ${brand.productName}`, ...lines].join('\n')
  }

  function onEmailClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    const message = enquiryMessage(values)
    const compose = new URL('https://mail.google.com/mail/')
    compose.searchParams.set('view', 'cm')
    compose.searchParams.set('fs', '1')
    compose.searchParams.set('to', brand.email)
    compose.searchParams.set('su', `${brand.productName} enquiry`)
    compose.searchParams.set('body', message)

    const popup = window.open(compose.toString(), '_blank', 'noopener,noreferrer')
    if (!popup) {
      setStatus('error')
      setStatusMessage(`${form.errors.emailFail} ${brand.email}`)
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setStatusMessage(form.errors.fix)
      return
    }

    setStatus('submitting')
    setStatusMessage('')
    const message = buildMessage(values)
    const popup = window.open(
      `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )

    if (!popup) {
      setStatus('error')
      setStatusMessage(form.errors.sendFail)
      return
    }

    setStatus('success')
    setStatusMessage(form.successWhatsapp)
  }

  const fieldClass =
    'mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-base font-medium text-navy-900 transition placeholder:text-navy-500 focus:border-accent-600 focus:bg-white focus:ring-2 focus:ring-accent-100'
  const errorClass = 'mt-1.5 text-sm font-medium text-rose-700'

  return (
    <form onSubmit={onSubmit} className="surface-card rounded-xl p-5 sm:p-6" noValidate>
      <p className="mb-4 text-sm text-navy-500">{form.requiredNote}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-base font-semibold text-navy-800">
            {form.name}
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name ? (
            <p id="name-error" className={errorClass}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="organization" className="text-base font-semibold text-navy-800">
            {form.organization}
          </label>
          <input
            id="organization"
            name="organization"
            autoComplete="organization"
            value={values.organization}
            onChange={update('organization')}
            className={fieldClass}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? 'organization-error' : undefined}
          />
          {errors.organization ? (
            <p id="organization-error" className={errorClass}>
              {errors.organization}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="text-base font-semibold text-navy-800">
            {form.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            value={values.phone}
            onChange={update('phone')}
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone ? (
            <p id="phone-error" className={errorClass}>
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-base font-semibold text-navy-800">
            {form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email ? (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="solution" className="text-base font-semibold text-navy-800">
            {form.solution}
          </label>
          <select
            id="solution"
            name="solution"
            value={values.solution}
            onChange={update('solution')}
            className={fieldClass}
            aria-invalid={Boolean(errors.solution)}
            aria-describedby={errors.solution ? 'solution-error' : undefined}
          >
            <option value="">{form.solutionPlaceholder}</option>
            {form.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.solution ? (
            <p id="solution-error" className={errorClass}>
              {errors.solution}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="text-base font-semibold text-navy-800">
            {form.description}
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={values.description}
            onChange={update('description')}
            placeholder={form.descriptionPlaceholder}
            className={`${fieldClass} resize-y`}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description ? (
            <p id="description-error" className={errorClass}>
              {errors.description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center [&>*]:max-w-full">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? form.submitting : form.submit}
        </Button>
        <Button
          href={brand.whatsappUrl}
          variant="secondary"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          {form.whatsapp}
        </Button>
        <Button href={brand.mailto} variant="ghost" size="lg" onClick={onEmailClick}>
          {form.emailUs}
        </Button>
      </div>

      {statusMessage ? (
        <p
          className={`mt-3 text-base ${status === 'error' ? 'text-rose-700' : 'text-accent-700'}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  )
}
