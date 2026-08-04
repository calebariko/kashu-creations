import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function GlitchText({ children, className = '', as: Tag = 'span', style = {} }) {
  const ref = useRef(null)
  const [glitching, setGlitching] = useState(false)

  const trigger = () => {
    setGlitching(true)
    gsap.fromTo(
      ref.current,
      { x: 0 },
      {
        x: 2,
        duration: 0.04,
        repeat: 8,
        yoyo: true,
        ease: 'power1.inOut',
        onComplete: () => setGlitching(false),
      }
    )
  }

  useEffect(() => {
    const timeout = setTimeout(trigger, 600)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag
      ref={ref}
      data-text={children}
      onMouseEnter={trigger}
      className={`glitch-text ${glitching ? 'glitching' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}
