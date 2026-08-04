import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function SplitReveal({ children, className = '', style = {}, stagger = 0.08 }) {
  const words = children.split(' ')
  const containerRef = useRef(null)
  const [inViewRef, inView] = useInView(0.3)

  useEffect(() => {
    if (!inView || !containerRef.current) return
    const wordEls = containerRef.current.querySelectorAll('.split-word-inner')
    gsap.fromTo(
      wordEls,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger }
    )
  }, [inView, stagger])

  return (
    <span
      ref={(node) => {
        containerRef.current = node
        inViewRef.current = node
      }}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span
            className="split-word-inner"
            style={{ display: 'inline-block', opacity: 0, transform: 'translateY(40px)' }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  )
}
