import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
    to?: undefined
  }

type ButtonAsAnchor = CommonProps & {
  href: string
  to?: undefined
  target?: string
  rel?: string
  type?: undefined
  disabled?: undefined
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type ButtonAsLink = CommonProps & {
  to: string
  href?: undefined
  type?: undefined
  disabled?: undefined
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

function isLink(props: ButtonProps): props is ButtonAsLink {
  return 'to' in props && typeof props.to === 'string'
}

function isAnchor(props: ButtonProps): props is ButtonAsAnchor {
  return typeof props.href === 'string'
}

const base =
  'inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg text-center leading-snug font-semibold whitespace-normal transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'border border-accent-700 bg-accent-600 text-white hover:bg-accent-700',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  ghost: 'text-navy-600 hover:bg-black/[0.03] hover:text-navy-900',
  inverse: 'border border-white/20 bg-white/8 text-white hover:bg-white/14',
}

const sizes: Record<Size, string> = {
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', className = '' } = props
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  if (isLink(props)) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if (isAnchor(props)) {
    return (
      <a
        href={props.href}
        className={classes}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
      >
        {children}
      </a>
    )
  }

  const { type = 'button', ...rest } = props as ButtonAsButton
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
