import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

export function useTilt(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return // disable on mobile
    if (!ref.current) return

    VanillaTilt.init(ref.current, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.08,
      perspective: 1000,
      scale: 1.02,
      ...options,
    })

    const el = ref.current
    return () => {
      if (el.vanillaTilt) el.vanillaTilt.destroy()
    }
  }, [])

  return ref
}
