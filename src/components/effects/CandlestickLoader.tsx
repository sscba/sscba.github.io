import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CandlestickBar {
  height: number   // % of container
  isGreen: boolean
  wickTop: number  // % additional wick above body
  wickBottom: number
  delay: number
}

function generateCandles(count: number): CandlestickBar[] {
  return Array.from({ length: count }, (_, i) => ({
    height: 20 + Math.random() * 60,
    isGreen: Math.random() > 0.35,
    wickTop: 5 + Math.random() * 20,
    wickBottom: 5 + Math.random() * 15,
    delay: i * 0.07,
  }))
}

const CANDLES = generateCandles(12)
const SESSION_KEY = 'portfolio-loader-seen'

interface CandlestickLoaderProps {
  onComplete: () => void
}

export function CandlestickLoader({ onComplete }: CandlestickLoaderProps) {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SESSION_KEY))
  const [candlesIn, setCandlesIn] = useState(false)

  useEffect(() => {
    // Skip if already shown this session
    if (!visible) {
      onComplete()
      return
    }

    // Trigger candle entrance
    const t1 = setTimeout(() => setCandlesIn(true), 60)

    // Start exit after candles settle
    const t2 = setTimeout(() => {
      setVisible(false)
    }, 1600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onComplete])

  const handleExitComplete = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    onComplete()
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 flex flex-col items-center justify-center gap-8"
          style={{ background: '#0c0a09', zIndex: 9999 }}
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Candlestick chart */}
          <div className="flex items-end gap-2" style={{ height: 120 }}>
            {CANDLES.map((candle, i) => (
              <div key={i} className="flex flex-col items-center" style={{ gap: 0 }}>
                {/* Top wick */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={candlesIn ? { scaleY: 1, opacity: 0.5 } : {}}
                  transition={{ duration: 0.3, delay: candle.delay + 0.1, ease: 'easeOut' }}
                  style={{
                    width: 1,
                    height: candle.wickTop,
                    background: candle.isGreen ? '#10b981' : '#ef4444',
                    transformOrigin: 'bottom',
                  }}
                />
                {/* Candle body */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={candlesIn ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.45, delay: candle.delay, ease: 'easeOut' }}
                  style={{
                    width: 14,
                    height: candle.height * 0.9,
                    background: candle.isGreen ? '#10b981' : '#ef4444',
                    borderRadius: 2,
                    transformOrigin: 'bottom',
                    boxShadow: candle.isGreen
                      ? '0 0 8px rgba(16,185,129,0.4)'
                      : '0 0 8px rgba(239,68,68,0.35)',
                  }}
                />
                {/* Bottom wick */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={candlesIn ? { scaleY: 1, opacity: 0.5 } : {}}
                  transition={{ duration: 0.3, delay: candle.delay + 0.15, ease: 'easeOut' }}
                  style={{
                    width: 1,
                    height: candle.wickBottom,
                    background: candle.isGreen ? '#10b981' : '#ef4444',
                    transformOrigin: 'top',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={candlesIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.7rem',
              color: '#78716c',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Initialising portfolio&hellip;
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
