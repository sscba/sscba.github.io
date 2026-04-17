import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Minus, Maximize2 } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'

const COPPER = '#c2773a'

type LogLevel = 'INFO' | 'WARN' | 'DEBUG'

interface LogEntry {
  id: number
  time: string
  level: LogLevel
  msg: string
}

const SECTION_LOGS: Record<string, { level: LogLevel; msg: string }> = {
  home: { level: 'INFO', msg: 'GET / 200 OK — serving portfolio bundle' },
  about: { level: 'INFO', msg: 'SELECT * FROM engineer WHERE name="Shiv" LIMIT 1' },
  skills: { level: 'DEBUG', msg: 'Loading technical_arsenal.json... 6 categories mounted' },
  projects: { level: 'INFO', msg: 'Fetching project history from recon_engine.db...' },
  contact: { level: 'WARN', msg: 'Awaiting incoming connection on port 8080...' },
}

const LEVEL_COLORS: Record<LogLevel, string> = {
  INFO: '#10b981',
  WARN: '#d97706',
  DEBUG: '#8b5cf6',
}

let logIdCounter = 0

export function LogTailTerminal() {
  const activeSection = useActiveSection()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [minimized, setMinimized] = useState(false)
  const [visible, setVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Delay entrance so it doesn't distract from Hero
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  // Push new log when section changes
  useEffect(() => {
    if (!activeSection || !visible) return
    const logData = SECTION_LOGS[activeSection]
    if (!logData) return

    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

    setLogs((prev) => [
      ...prev.slice(-20), // keep last 20 max
      { id: logIdCounter++, time, level: logData.level, msg: logData.msg },
    ])
  }, [activeSection, visible])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current && !minimized) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, minimized])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"
    >
      <AnimatePresence initial={false} mode="wait">
        {!minimized ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-72 md:w-80 rounded-xl overflow-hidden shadow-2xl pointer-events-auto"
            style={{
              background: 'rgba(12,10,9,0.92)',
              backdropFilter: 'blur(12px)',
              border: `1px solid rgba(194,119,58,0.35)`,
            }}
          >
            {/* Title bar */}
            <div
              className="px-3 py-2 flex items-center justify-between border-b"
              style={{ borderColor: 'rgba(194,119,58,0.2)', background: 'rgba(28,25,23,0.6)' }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={12} color={COPPER} />
                <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.65rem', color: COPPER }}>
                  system.log
                </span>
              </div>
              <button
                onClick={() => setMinimized(true)}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors"
                aria-label="Minimize terminal"
              >
                <Minus size={14} />
              </button>
            </div>

            {/* Log output */}
            <div
              ref={scrollRef}
              className="p-3 overflow-y-auto"
              style={{
                height: 130,
                fontFamily: "'Fira Code', monospace",
                fontSize: '0.65rem',
                lineHeight: 1.6,
              }}
            >
              {logs.length === 0 && (
                <span className="text-neutral-500">Waiting for logs...</span>
              )}
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-1"
                >
                  <span style={{ color: '#78716c' }}>[{log.time}] </span>
                  <span style={{ color: LEVEL_COLORS[log.level] }}>{log.level} </span>
                  <span style={{ color: '#fafaf9' }}>{log.msg}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setMinimized(false)}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl pointer-events-auto transition-transform hover:scale-110"
            style={{
              background: '#1c1917',
              border: `1.5px solid ${COPPER}`,
              boxShadow: `0 0 16px rgba(194,119,58,0.3)`,
            }}
            aria-label="Open terminal"
          >
            <Maximize2 size={16} color={COPPER} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
