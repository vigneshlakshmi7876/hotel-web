import { useEffect, useId, useState } from 'react'
import { ThemePicker } from './ThemePicker'
import { ThemeToggle } from './ThemeToggle'
import { type SectionId, scrollToSection, useActiveSection } from '../hooks/useActiveSection'

const NAV: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'about', label: 'About us' },
  { id: 'specials', label: 'Specials' },
  { id: 'reviews', label: 'Customer review' },
  { id: 'contact', label: 'Contact' },
]

function navLinkClass(isActive: boolean, mobile = false) {
  const squircle = mobile
    ? 'rounded-2xl rounded-tr-md rounded-bl-md'
    : 'rounded-xl rounded-tr-sm rounded-bl-sm'

  const base = [
    mobile ? 'w-full px-4 py-3.5 text-left text-base' : 'px-3.5 py-2 text-sm xl:px-4',
    squircle,
    'font-semibold transition duration-200',
  ].join(' ')

  if (isActive) {
    return [
      base,
      mobile
        ? 'border border-red-500/25 bg-gradient-to-r from-red-600/10 to-emerald-600/10 text-neutral-900 dark:border-red-400/20 dark:from-red-500/15 dark:to-emerald-600/10 dark:text-white'
        : 'bg-gradient-to-r from-red-600 via-red-500 to-emerald-700 text-white shadow-md shadow-red-600/25',
    ].join(' ')
  }

  return [
    base,
    mobile
      ? 'text-neutral-700 hover:bg-white/50 dark:text-neutral-200 dark:hover:bg-white/8'
      : 'text-neutral-600 hover:bg-white/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/8 dark:hover:text-white',
  ].join(' ')
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export function SectionScrollNav() {
  const active = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  function go(id: SectionId) {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/45 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-black/35">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            go('home')
          }}
          className="text-lg font-bold tracking-tight"
        >
          <span className="text-neutral-500 dark:text-neutral-400">The </span>
          <span className="text-red-500">Scarlet</span>
          <span className="text-neutral-900 dark:text-white"> Grand</span>
        </a>

        {/* Desktop nav — glass squircle track */}
        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex items-center gap-0.5 rounded-2xl rounded-tr-md rounded-bl-md border border-neutral-200/50 bg-white/50 px-1.5 py-1.5 dark:border-white/10 dark:bg-white/5">
            {NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(id)
                }}
                className={navLinkClass(active === id)}
                aria-current={active === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden text-sm font-medium text-red-500/90 dark:text-red-400/95 lg:inline">
            Sign in / Register
          </span>
          <ThemePicker className="dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15" />
          <ThemeToggle className="dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl rounded-tr-sm rounded-bl-sm border border-neutral-300/70 bg-white/50 text-neutral-800 transition hover:bg-white/70 lg:hidden dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen ? (
        <div
          id={menuId}
          className="border-t border-white/25 bg-white/55 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-black/45 lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1.5">
            {NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(id)
                }}
                className={navLinkClass(active === id, true)}
                aria-current={active === id ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
            <p className="mt-2 px-4 text-sm font-medium text-red-500 dark:text-red-400">Sign in / Register</p>
          </div>
        </div>
      ) : null}
    </header>
  )
}
