import { useState, useEffect, useRef } from 'react'

const TITLES = [
  'Backend Software Engineer',
  'Microservices Architect',
  'Distributed Systems Expert',
  'Java Developer',
]

const TYPE_SPEED = 100
const ERASE_SPEED = 50
const PAUSE_MS = 2000

export function useTypingEffect() {
  const [displayed, setDisplayed] = useState('')
  const [isErasing, setIsErasing] = useState(false)
  const titleIndex = useRef(0)
  const charIndex = useRef(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = TITLES[titleIndex.current]

      if (!isErasing) {
        if (charIndex.current < current.length) {
          charIndex.current++
          setDisplayed(current.slice(0, charIndex.current))
          timeout = setTimeout(tick, TYPE_SPEED)
        } else {
          timeout = setTimeout(() => setIsErasing(true), PAUSE_MS)
        }
      } else {
        if (charIndex.current > 0) {
          charIndex.current--
          setDisplayed(current.slice(0, charIndex.current))
          timeout = setTimeout(tick, ERASE_SPEED)
        } else {
          titleIndex.current = (titleIndex.current + 1) % TITLES.length
          setIsErasing(false)
          timeout = setTimeout(tick, 500)
        }
      }
    }

    timeout = setTimeout(tick, TYPE_SPEED)
    return () => clearTimeout(timeout)
  }, [isErasing])

  return displayed
}
