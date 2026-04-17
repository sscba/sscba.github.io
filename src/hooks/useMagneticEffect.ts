import { useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

interface UseMagneticEffectOptions {
  /** How far the element travels toward the cursor (0–1, default 0.3) */
  strength?: number
  /** Cursor activation radius in px from element centre (default 120) */
  radius?: number
  /** Spring damping (default 15) */
  damping?: number
  /** Spring stiffness (default 150) */
  stiffness?: number
}

/**
 * Returns spring-animated x/y offsets and mouse event handlers.
 * Attach the handlers to the element you want to pull toward the cursor.
 * Bind the returned x/y to a framer-motion style.
 */
export function useMagneticEffect({
  strength = 0.3,
  radius = 120,
  damping = 15,
  stiffness = 150,
}: UseMagneticEffectOptions = {}) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { damping, stiffness })
  const y = useSpring(rawY, { damping, stiffness })

  const elementRef = useRef<HTMLElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        rawX.set(dx * strength)
        rawY.set(dy * strength)
      }
    },
    [rawX, rawY, strength, radius],
  )

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { x, y, onMouseMove, onMouseLeave, elementRef }
}
