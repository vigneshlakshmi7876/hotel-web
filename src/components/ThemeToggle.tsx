import { useTheme } from '../theme/useTheme'

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const headerBtnClass =
  'border-neutral-300/80 bg-white/90 text-neutral-800 shadow-sm hover:border-neutral-400 hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/15'

export function ThemeToggle({ className = '', showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { colorMode, toggleColorMode } = useTheme()
  const isDark = colorMode === 'dark'

  return (
    <button
      type="button"
      onClick={toggleColorMode}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={[
        showLabel
          ? 'inline-flex h-11 w-full items-center justify-between gap-3 rounded-xl rounded-tr-sm rounded-bl-sm border px-4 text-sm font-semibold transition'
          : 'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition',
        headerBtnClass,
        className,
      ].join(' ')}
    >
      {showLabel ? (
        <>
          <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </>
      ) : (
        (isDark ? <SunIcon /> : <MoonIcon />)
      )}
    </button>
  )
}
