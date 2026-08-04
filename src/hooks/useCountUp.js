import { useEffect, useState } from 'react'

/**
 * Animates a numeric count-up from 0 to `target` once `start` is true.
 * Triggers a "bounce" flag for one animation cycle on completion.
 */
export function useCountUp(target, start, duration = 1200) {
  const [value, setValue] = useState(0)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    if (!start) return

    let startTime = null
    let frame

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setValue(Math.floor(progress * target))

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setValue(target)
        setBounce(true)
        setTimeout(() => setBounce(false), 400)
      }
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [start, target, duration])

  return [value, bounce]
}
