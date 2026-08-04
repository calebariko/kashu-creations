import { useEffect, useRef } from 'react'

/**
 * Applies a translateY scroll-parallax effect to the returned ref element.
 * Disabled on mobile (<768px) for performance.
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return
    if (!ref.current) return

    let ticking = false

    const update = () => {
      if (!ref.current) return
      const y = window.scrollY * speed
      ref.current.style.transform = `translateY(${y}px)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
