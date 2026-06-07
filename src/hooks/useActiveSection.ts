import { useEffect, useState } from 'react'

export const SECTION_IDS = ['home', 'menu', 'about', 'specials', 'reviews', 'contact'] as const

export type SectionId = (typeof SECTION_IDS)[number]

function initialSectionFromHash(): SectionId {
  if (typeof window === 'undefined') return 'home'
  const h = window.location.hash.slice(1)
  return SECTION_IDS.includes(h as SectionId) ? (h as SectionId) : 'home'
}

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(initialSectionFromHash)

  useEffect(() => {
    // Header height (sticky nav) + small buffer; the section crossing this line is "active".
    const lineOffset = 96

    const computeActive = () => {
      // Bottom of page → force the last section active (short final sections never reach the line).
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActive(SECTION_IDS[SECTION_IDS.length - 1])
        return
      }

      let current: SectionId = SECTION_IDS[0]
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= lineOffset) current = id
      }
      setActive(current)
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        computeActive()
        ticking = false
      })
    }

    computeActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return active
}

export function scrollToSection(id: SectionId) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname)
    return
  }
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }
}
