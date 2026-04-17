import { useState } from 'react'
import { useInterval } from '@/hooks/useInterval'

interface TickerItem {
  label: string
  getValue: () => string
  unit?: string
}

const BASE_TPS = 4021
const BASE_LATENCY = 12
const BASE_HEAP = 512
const BASE_KAFKA = 189432
const BASE_RECON = 99.94

const ITEMS: TickerItem[] = [
  { label: 'SYS.UPTIME',     getValue: () => '99.999%' },
  { label: 'AVG.LATENCY',    getValue: () => `${BASE_LATENCY + Math.floor(Math.random() * 5)}ms` },
  { label: 'TX.RATE',        getValue: () => `${(BASE_TPS + Math.floor(Math.random() * 200)).toLocaleString()}/s` },
  { label: 'HEAP.USED',      getValue: () => `${BASE_HEAP + Math.floor(Math.random() * 30)}MB` },
  { label: 'KAFKA.OFFSET',   getValue: () => `${(BASE_KAFKA + Math.floor(Math.random() * 1000)).toLocaleString()}` },
  { label: 'RECON.MATCH',    getValue: () => `${(BASE_RECON + Math.random() * 0.05).toFixed(3)}%` },
  { label: 'ACTIVE.NODES',   getValue: () => '12' },
  { label: 'MSG.QUEUE',      getValue: () => `${Math.floor(Math.random() * 50 + 5)}` },
]

const COPPER = '#c2773a'

export function TickerTape() {
  const [values, setValues] = useState<string[]>(() => ITEMS.map((item) => item.getValue()))

  // Refresh values with jitter every 3 seconds
  useInterval(() => {
    setValues(ITEMS.map((item) => item.getValue()))
  }, 3000)

  const tickerContent = ITEMS.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-2 mx-6 shrink-0">
      <span style={{ color: COPPER, fontFamily: "'Fira Code', monospace", fontSize: '0.65rem', letterSpacing: '0.1em' }}>
        {item.label}
      </span>
      <span style={{ color: '#a8a29e', fontFamily: "'Fira Code', monospace", fontSize: '0.65rem' }}>
        {values[i]}
      </span>
      <span style={{ color: '#3d3733', fontSize: '0.6rem' }}>◆</span>
    </span>
  ))

  return (
    <div
      className="w-full overflow-hidden py-2"
      style={{
        borderTop: '1px solid rgba(194,119,58,0.18)',
        borderBottom: '1px solid rgba(194,119,58,0.18)',
        background: 'rgba(12,10,9,0.6)',
      }}
      aria-hidden="true"
    >
      {/* Two copies side-by-side so the scroll loops seamlessly */}
      <div className="ticker-tape-track flex">
        <span className="inline-flex shrink-0">{tickerContent}</span>
        <span className="inline-flex shrink-0" aria-hidden>{tickerContent}</span>
      </div>
    </div>
  )
}
