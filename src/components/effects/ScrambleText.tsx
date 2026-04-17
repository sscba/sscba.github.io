import { CSSProperties, ElementType } from 'react'
import { useScrambleText } from '@/hooks/useScrambleText'

const COPPER = '#c2773a'

interface ScrambleTextProps {
  /** The real text to reveal */
  text: string
  /** Trigger the animation (e.g. set to `true` on mount or inView) */
  trigger: boolean
  className?: string
  style?: CSSProperties
  /** Rendered as a block element (default: span) */
  as?: ElementType
  /** Show "// " prefix in copper before the text */
  prefix?: boolean
  /** Milliseconds between each character locking in */
  lockSpeed?: number
}

/**
 * Renders text with a scramble-decrypt reveal animation.
 * Locked characters render in their real color; scrambling chars are dimmer + monospace.
 */
export function ScrambleText({
  text,
  trigger,
  className,
  style,
  as: Tag = 'span',
  prefix = false,
  lockSpeed = 38,
}: ScrambleTextProps) {
  const { displayed, locked } = useScrambleText({ text, trigger, lockSpeed })

  return (
    <Tag className={className} style={style}>
      {prefix && (
        <span
          style={{
            fontFamily: "'Fira Code', monospace",
            color: COPPER,
            marginRight: '0.4em',
            fontSize: '0.75em',
            verticalAlign: 'middle',
          }}
        >
          //&nbsp;
        </span>
      )}
      {displayed.split('').map((ch, i) => {
        const isLocked = locked[i] || text[i] === ' '
        return (
          <span
            key={i}
            style={{
              fontFamily: isLocked ? 'inherit' : "'Fira Code', monospace",
              color: isLocked ? 'inherit' : '#78716c',
              transition: 'color 0.12s ease',
              display: 'inline-block',
              whiteSpace: ch === ' ' ? 'pre' : undefined,
            }}
          >
            {ch}
          </span>
        )
      })}
    </Tag>
  )
}
