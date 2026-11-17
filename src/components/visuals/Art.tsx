import type { ReactNode } from 'react'

type ArtKind =
  | 'hospital'
  | 'appointments'
  | 'pharmacy'
  | 'custom'
  | 'ready'
  | 'customize'
  | 'build'
  | 'cloud'
  | 'premise'
  | 'remote'

type ArtProps = {
  kind: ArtKind
  className?: string
}

function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 280 180"
      className={`h-auto w-full ${className}`}
      aria-hidden="true"
      fill="none"
    >
      {children}
    </svg>
  )
}

function Label({
  x,
  y,
  children,
  fill = '#5b6070',
}: {
  x: number
  y: number
  children: string
  fill?: string
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontFamily="Inter, system-ui, sans-serif"
      fontSize="9"
      fontWeight="600"
    >
      {children}
    </text>
  )
}

export function Art({ kind, className }: ArtProps) {
  switch (kind) {
    case 'hospital':
      return (
        <Frame className={className}>
          <rect x="14" y="18" width="122" height="144" rx="8" fill="#fff" stroke="#e2e8f0" />
          <Label x={26} y={36}>
            OPD bill
          </Label>
          <rect x="78" y="24" width="44" height="16" rx="4" fill="#eef8f3" stroke="#0d7a4f" />
          <Label x={86} y={35} fill="#0b6b45">
            IPD
          </Label>
          <rect x="26" y="48" width="86" height="5" rx="1" fill="#e2e8f0" />
          <rect x="26" y="60" width="64" height="5" rx="1" fill="#cbd5e1" />
          <rect x="26" y="72" width="74" height="5" rx="1" fill="#0d7a4f" />
          <rect x="26" y="90" width="48" height="8" rx="2" fill="#0c0c0f" />
          <Label x={26} y={116}>
            Advance
          </Label>
          <Label x={26} y={132}>
            Balance
          </Label>
          <rect x="78" y="106" width="40" height="8" rx="2" fill="#d8f0e4" />
          <rect x="78" y="122" width="40" height="8" rx="2" fill="#0d7a4f" />
          <rect x="26" y="142" width="86" height="8" rx="2" fill="#f4f4f6" />

          <rect x="148" y="18" width="118" height="144" rx="8" fill="#fff" stroke="#e2e8f0" />
          <Label x={162} y={36} fill="#0c0c0f">
            Past bills
          </Label>
          <rect x="162" y="48" width="90" height="22" rx="4" fill="#fafaf9" stroke="#e2e8f0" />
          <rect x="162" y="76" width="90" height="22" rx="4" fill="#eef8f3" stroke="#0d7a4f" />
          <rect x="162" y="104" width="90" height="22" rx="4" fill="#fafaf9" stroke="#e2e8f0" />
          <rect x="170" y="56" width="36" height="5" rx="1" fill="#94a3b8" />
          <rect x="170" y="84" width="36" height="5" rx="1" fill="#0d7a4f" />
          <rect x="170" y="112" width="36" height="5" rx="1" fill="#94a3b8" />
          <Label x={214} y={90} fill="#0b6b45">
            Reprint
          </Label>
          <rect x="162" y="136" width="52" height="14" rx="3" fill="#0c0c0f" />
          <Label x={170} y={146} fill="#fff">
            Stock
          </Label>
        </Frame>
      )
    case 'appointments':
      return (
        <Frame className={className}>
          <rect x="16" y="20" width="150" height="140" rx="8" fill="#fff" stroke="#e2e8f0" />
          <rect x="16" y="20" width="150" height="28" rx="8" fill="#0d7a4f" />
          <rect x="16" y="38" width="150" height="10" fill="#0d7a4f" />
          <Label x={28} y={38} fill="#fff">
            Schedule
          </Label>
          {['M', 'T', 'W', 'T', 'F'].map((day, index) => (
            <Label key={day + index} x={30 + index * 26} y={62}>
              {day}
            </Label>
          ))}
          {[0, 1, 2, 3, 4].map((col) =>
            [0, 1].map((row) => {
              const booked = col === 2 && row === 0
              return (
                <rect
                  key={`${col}-${row}`}
                  x={28 + col * 26}
                  y={70 + row * 28}
                  width="18"
                  height="18"
                  rx="4"
                  fill={booked ? '#0d7a4f' : '#eef8f3'}
                />
              )
            }),
          )}
          <Label x={32} y={126}>
            10:30
          </Label>

          <rect x="178" y="36" width="86" height="108" rx="8" fill="#fff" stroke="#e2e8f0" />
          <circle cx="198" cy="58" r="8" fill="#eef8f3" stroke="#0d7a4f" />
          <Label x={214} y={62} fill="#0c0c0f">
            Booked
          </Label>
          <rect x="190" y="76" width="60" height="5" rx="1" fill="#cbd5e1" />
          <rect x="190" y="88" width="44" height="5" rx="1" fill="#0d7a4f" />
          <rect x="190" y="108" width="60" height="18" rx="4" fill="#eef8f3" stroke="#0d7a4f" />
          <Label x={200} y={120} fill="#0b6b45">
            Confirm
          </Label>
        </Frame>
      )
    case 'pharmacy':
      return (
        <Frame className={className}>
          <rect x="16" y="24" width="118" height="132" rx="8" fill="#fff" stroke="#e2e8f0" />
          <Label x={28} y={42} fill="#0c0c0f">
            Stock
          </Label>
          <rect x="28" y="52" width="28" height="52" rx="6" fill="#eef8f3" stroke="#0d7a4f" />
          <rect x="62" y="64" width="28" height="40" rx="6" fill="#fff" stroke="#cbd5e1" />
          <rect x="96" y="58" width="24" height="46" rx="6" fill="#f4f4f6" stroke="#cbd5e1" />
          <rect x="34" y="46" width="16" height="8" rx="2" fill="#0d7a4f" />
          <Label x={28} y={122}>
            Batch
          </Label>
          <Label x={28} y={138}>
            Expiry
          </Label>
          <rect x="70" y="114" width="48" height="8" rx="2" fill="#d8f0e4" />
          <rect x="70" y="130" width="48" height="8" rx="2" fill="#0d7a4f" />

          <rect x="148" y="24" width="116" height="132" rx="8" fill="#fff" stroke="#e2e8f0" />
          <Label x={162} y={42} fill="#0c0c0f">
            Sale
          </Label>
          <rect x="162" y="54" width="86" height="5" rx="1" fill="#e2e8f0" />
          <rect x="162" y="66" width="70" height="5" rx="1" fill="#cbd5e1" />
          <rect x="162" y="78" width="78" height="5" rx="1" fill="#0d7a4f" />
          <Label x={162} y={104}>
            Return
          </Label>
          <rect x="210" y="96" width="38" height="10" rx="3" fill="#f4f4f6" stroke="#cbd5e1" />
          <rect x="162" y="118" width="86" height="22" rx="4" fill="#eef8f3" stroke="#0d7a4f" />
          <Label x={176} y={133} fill="#0b6b45">
            Total
          </Label>
        </Frame>
      )
    case 'custom':
      return (
        <Frame className={className}>
          <rect x="24" y="36" width="110" height="72" rx="8" fill="#fff" stroke="#e2e8f0" />
          <rect x="36" y="50" width="86" height="8" rx="2" fill="#0c0c0f" />
          <rect x="36" y="66" width="58" height="6" rx="2" fill="#94a3b8" />
          <rect x="36" y="80" width="40" height="12" rx="3" fill="#0d7a4f" />
          <rect x="148" y="52" width="96" height="96" rx="8" fill="#fafaf9" stroke="#cbd5e1" />
          <rect x="164" y="68" width="64" height="8" rx="2" fill="#0d7a4f" />
          <rect x="164" y="84" width="48" height="6" rx="2" fill="#94a3b8" />
          <rect x="164" y="98" width="64" height="28" rx="4" fill="#eef8f3" />
          <path d="M134 72 H148" stroke="#0d7a4f" strokeWidth="1.5" />
        </Frame>
      )
    case 'ready':
      return (
        <Frame className={className}>
          <rect x="58" y="30" width="164" height="120" rx="8" fill="#fff" stroke="#e2e8f0" />
          <rect x="74" y="48" width="132" height="10" rx="2" fill="#0c0c0f" />
          <rect x="74" y="68" width="88" height="8" rx="2" fill="#d8f0e4" />
          <rect x="74" y="86" width="132" height="44" rx="4" fill="#eef8f3" />
          <path d="M86 108 l10 10 22 -24" stroke="#0d7a4f" strokeWidth="3" />
        </Frame>
      )
    case 'customize':
      return (
        <Frame className={className}>
          <rect x="40" y="36" width="200" height="108" rx="8" fill="#fff" stroke="#e2e8f0" />
          <rect x="58" y="56" width="96" height="68" rx="4" fill="#fafaf9" stroke="#cbd5e1" />
          <rect x="168" y="60" width="54" height="8" rx="4" fill="#e2e8f0" />
          <circle cx="210" cy="64" r="7" fill="#0d7a4f" />
          <rect x="168" y="84" width="54" height="8" rx="4" fill="#e2e8f0" />
          <circle cx="186" cy="88" r="7" fill="#5b6070" />
          <rect x="168" y="108" width="54" height="8" rx="4" fill="#d8f0e4" />
          <circle cx="204" cy="112" r="7" fill="#0d7a4f" />
        </Frame>
      )
    case 'build':
      return (
        <Frame className={className}>
          <rect x="36" y="28" width="208" height="124" rx="8" fill="#fafaf9" stroke="#e2e8f0" />
          <path d="M36 90 H244 M140 28 V152" stroke="#e2e8f0" />
          <rect x="58" y="48" width="64" height="28" rx="4" fill="#fff" stroke="#0d7a4f" />
          <rect x="158" y="104" width="64" height="28" rx="4" fill="#eef8f3" stroke="#0d7a4f" />
          <path d="M90 76 L190 104" stroke="#0d7a4f" strokeDasharray="4 4" />
        </Frame>
      )
    case 'cloud':
      return (
        <Frame className={className}>
          <path
            d="M86 108c0-22 16-40 40-40 6-18 24-30 44-30 26 0 46 18 50 42 18 2 32 16 32 34 0 20-16 36-36 36H116c-16 0-30-14-30-42z"
            fill="#eef8f3"
            stroke="#0d7a4f"
          />
        </Frame>
      )
    case 'premise':
      return (
        <Frame className={className}>
          <rect x="88" y="52" width="104" height="84" rx="4" fill="#fff" stroke="#cbd5e1" />
          <rect x="108" y="72" width="24" height="20" fill="#eef8f3" stroke="#0d7a4f" />
          <rect x="148" y="72" width="24" height="20" fill="#f4f4f6" stroke="#cbd5e1" />
          <rect x="108" y="100" width="24" height="20" fill="#f4f4f6" stroke="#cbd5e1" />
          <rect x="148" y="100" width="24" height="20" fill="#eef8f3" stroke="#0d7a4f" />
          <path d="M80 52 L140 22 L200 52" stroke="#0c0c0f" strokeWidth="2" />
        </Frame>
      )
    case 'remote':
      return (
        <Frame className={className}>
          <circle cx="140" cy="90" r="46" stroke="#d8f0e4" strokeWidth="10" />
          <circle cx="140" cy="90" r="18" fill="#0d7a4f" />
          <path d="M140 44 V28 M140 152 V168 M86 90 H70 M210 90 H226" stroke="#0d7a4f" strokeWidth="3" />
        </Frame>
      )
    default:
      return null
  }
}
