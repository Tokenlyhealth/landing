import { Link } from 'react-router-dom'
import { brand } from '../config/brand'

type LogoProps = {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${brand.name} home`}
    >
      <img
        src="/logo-mark.png"
        alt=""
        width={32}
        height={26}
        className="h-[26px] w-8 object-contain"
        decoding="async"
        aria-hidden="true"
      />
      <span className="text-xl font-semibold tracking-[-0.02em] text-navy-900">{brand.name}</span>
    </Link>
  )
}
