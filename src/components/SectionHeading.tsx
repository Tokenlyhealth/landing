type SectionHeadingProps = {
  eyebrow: string
  title: string
  sub?: string
  note?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  note,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm font-semibold tracking-[0.06em] break-words text-accent-700 uppercase sm:text-base">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 text-lg leading-relaxed text-navy-600">{sub}</p> : null}
      {note ? <p className="mt-2 text-base text-navy-500">{note}</p> : null}
    </div>
  )
}
