import { type RefObject, useEffect, useState } from 'react'

/**
 * Latches to `true` the first time the element intersects the viewport (with optional margin).
 */
export function useLatchInView(
  ref: RefObject<Element | null>,
  rootMargin = '120px',
): boolean {
  const [latched, setLatched] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setLatched(true)
          obs.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, rootMargin])

  return latched
}
