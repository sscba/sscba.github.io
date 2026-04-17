import { useState, useEffect, useRef, useCallback } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&?!'

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)]
}

interface UseScrambleTextOptions {
  /** The real text to reveal */
  text: string
  /** Set to true to start the scramble animation */
  trigger: boolean
  /** Milliseconds between each character locking in (default: 38) */
  lockSpeed?: number
  /** Milliseconds between each scramble frame (default: 30) */
  frameSpeed?: number
}

interface UseScrambleTextReturn {
  displayed: string
  isDone: boolean
  /** Array marking which char positions are locked (showing real char) */
  locked: boolean[]
}

/**
 * Scrambles text with random characters, then sequentially "locks in"
 * each character from left-to-right to reveal the real text.
 */
export function useScrambleText({
  text,
  trigger,
  lockSpeed = 38,
  frameSpeed = 30,
}: UseScrambleTextOptions): UseScrambleTextReturn {
  const [displayed, setDisplayed] = useState(text)
  const [locked, setLocked] = useState<boolean[]>(() => text.split('').map(() => false))
  const [isDone, setIsDone] = useState(false)

  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lockRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lockedCountRef = useRef(0)
  const hasRun = useRef(false)

  const clear = useCallback(() => {
    if (frameRef.current) clearInterval(frameRef.current)
    if (lockRef.current) clearInterval(lockRef.current)
    frameRef.current = null
    lockRef.current = null
  }, [])

  useEffect(() => {
    if (!trigger || hasRun.current) return
    hasRun.current = true
    lockedCountRef.current = 0

    const lockedArr = text.split('').map(() => false)
    setLocked(lockedArr.slice())
    setIsDone(false)

    // Scramble frame: randomly shuffle unlocked character positions
    frameRef.current = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            return lockedArr[i] ? ch : randomChar()
          })
          .join(''),
      )
    }, frameSpeed)

    // Lock frame: lock one character at a time from left to right
    lockRef.current = setInterval(() => {
      const idx = lockedCountRef.current
      if (idx >= text.length) {
        clear()
        setDisplayed(text)
        setIsDone(true)
        return
      }
      lockedArr[idx] = true
      lockedCountRef.current++
      setLocked(lockedArr.slice())
    }, lockSpeed)

    return clear
  }, [trigger, text, frameSpeed, lockSpeed, clear])

  return { displayed, isDone, locked }
}
