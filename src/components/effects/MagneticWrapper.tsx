import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

interface MagneticWrapperProps {
  children: ReactNode
  strength?: number
  radius?: number
  className?: string
}

/**
 * Wraps any child in a motion.div that physically pulls toward the cursor.
 * On mobile / reduced-motion the effect is skipped (no-op passthrough).
 */
export function MagneticWrapper({
  children,
  strength = 0.3,
  radius = 120,
  className,
}: MagneticWrapperProps) {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticEffect({ strength, radius })

  return (
    <motion.div
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
