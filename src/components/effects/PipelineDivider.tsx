import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInterval } from '@/hooks/useInterval'

const PACKET_COLORS = ['#10b981', '#c2773a', '#c2773a', '#d97706'] // weighted toward copper

interface Packet {
  id: number
  color: string
  duration: number // seconds
  size: number
}

interface PipelineDividerProps {
  label?: string
}

let packetCounter = 0

export function PipelineDivider({ label }: PipelineDividerProps) {
  const [packets, setPackets] = useState<Packet[]>([])
  const [metrics, setMetrics] = useState({ tps: 4021, latency: 12 })
  const [boosted, setBoosted] = useState(false)
  const boostTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const spawnPacket = useCallback(() => {
    const newPacket: Packet = {
      id: packetCounter++,
      color: PACKET_COLORS[Math.floor(Math.random() * PACKET_COLORS.length)],
      duration: boosted ? 0.9 + Math.random() * 0.4 : 1.8 + Math.random() * 0.8,
      size: 4 + Math.random() * 3,
    }
    setPackets((prev) => [...prev.slice(-12), newPacket]) // cap at 12 visible packets
  }, [boosted])

  // Normal spawn rate: 1 packet/sec. Boost: 3/sec
  useInterval(spawnPacket, boosted ? 320 : 900)

  // Update metrics with live-ish jitter every 3s
  useInterval(() => {
    setMetrics({
      tps: 4000 + Math.floor(Math.random() * 200),
      latency: 10 + Math.floor(Math.random() * 5),
    })
  }, 3000)

  const handleMouseEnter = () => {
    setBoosted(true)
    if (boostTimer.current) clearTimeout(boostTimer.current)
    boostTimer.current = setTimeout(() => setBoosted(false), 2000)
  }

  // Clean up on unmount
  useEffect(() => () => {
    if (boostTimer.current) clearTimeout(boostTimer.current)
  }, [])

  const removePacket = (id: number) => {
    setPackets((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div
      className="relative w-full py-3 px-6 flex items-center gap-4 cursor-crosshair select-none"
      onMouseEnter={handleMouseEnter}
      aria-hidden="true"
    >
      {/* Left label */}
      {label && (
        <span
          className="text-[10px] tracking-[0.2em] uppercase shrink-0"
          style={{ fontFamily: "'Fira Code', monospace", color: '#57534e' }}
        >
          {label}
        </span>
      )}

      {/* Pipeline track */}
      <div className="relative flex-1 h-px overflow-visible" style={{ background: 'rgba(194,119,58,0.18)' }}>
        <AnimatePresence>
          {packets.map((pkt) => (
            <motion.div
              key={pkt.id}
              initial={{ left: '-2%', opacity: 0 }}
              animate={{ left: '102%', opacity: [0, 1, 1, 0] }}
              exit={{}}
              transition={{ duration: pkt.duration, ease: 'linear' }}
              onAnimationComplete={() => removePacket(pkt.id)}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: pkt.size,
                height: pkt.size,
                borderRadius: '50%',
                background: pkt.color,
                boxShadow: `0 0 ${pkt.size * 2}px ${pkt.color}, 0 0 ${pkt.size * 4}px ${pkt.color}44`,
                pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Right metrics */}
      <span
        className="text-[10px] tracking-[0.1em] shrink-0"
        style={{ fontFamily: "'Fira Code', monospace", color: '#57534e' }}
      >
        TX/s:&nbsp;
        <span style={{ color: '#78716c' }}>{metrics.tps.toLocaleString()}</span>
        &nbsp;•&nbsp;LAT:&nbsp;
        <span style={{ color: '#78716c' }}>{metrics.latency}ms</span>
      </span>
    </div>
  )
}
