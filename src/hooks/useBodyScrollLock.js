import { useEffect } from 'react'

// Module-level counter shared by every component that calls this hook.
// Using a counter (instead of each component setting overflow directly)
// means two simultaneous locks (e.g. drawer + modal both open) can never
// clobber each other's cleanup - the body only unlocks once nothing is
// asking for it to be locked anymore.
let lockCount = 0

export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return

    lockCount += 1
    document.body.style.overflow = 'hidden'

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.style.overflow = ''
      }
    }
  }, [isLocked])
}
