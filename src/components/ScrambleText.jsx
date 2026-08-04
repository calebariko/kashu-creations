import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$'

export default function ScrambleText({ children, className = '', triggerOnMount = false }) {
  const text = children
  const spanRef = useRef(null)
  const hasRun = useRef(false)
  const [inViewRef, inView] = useInView(0.3)

  const runScramble = () => {
    if (hasRun.current || !spanRef.current) return
    hasRun.current = true

    const el = spanRef.current
    const duration = 800
    const frameRate = 30
    const totalFrames = Math.floor(duration / frameRate)
    const obj = { progress: 0 }

    gsap.to(obj, {
      progress: text.length,
      duration: duration / 1000,
      ease: 'none',
      onUpdate: () => {
        const progress = Math.floor(obj.progress)
        let out = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            out += ' '
          } else if (i < progress) {
            out += text[i]
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        el.textContent = out
      },
      onComplete: () => {
        el.textContent = text
      },
    })
    // eslint-disable-next-line
  }

  useEffect(() => {
    if (triggerOnMount) runScramble()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inView) runScramble()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <span
      ref={(node) => {
        spanRef.current = node
        inViewRef.current = node
      }}
      className={className}
    >
      {text}
    </span>
  )
}
