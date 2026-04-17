import { useEffect, useRef } from 'react'

/**
 * Thin wrapper around setInterval with proper React cleanup.
 * Callback is always fresh (no stale closure issues).
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Keep ref up-to-date with latest callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
