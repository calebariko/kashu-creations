import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function TypewriterText({ children, className = '', speed = 60 }) {
  const text = children
  const hasStarted = useRef(false)
  const [inViewRef, inView] = useInView(0.3)
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView || hasStarted.current) return
    hasStarted.current = true

    const obj = { i: 0 }
    gsap.to(obj, {
      i: text.length,
      duration: (text.length * speed) / 1000,
      ease: 'none',
      onUpdate: () => setDisplay(text.slice(0, Math.floor(obj.i))),
      onComplete: () => setDone(true),
    })
  }, [inView, text, speed])

  return (
    <span ref={inViewRef} className={className}>
      {display}
      {(inView && !done) || done ? (
        <span className={done ? 'cursor-blink' : ''}>|</span>
      ) : null}
    </span>
  )
}
