import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  HOTEL_THEME_STORAGE_KEY,
  ThemeContext,
  type HotelTheme,
} from './theme-context.ts'

function readInitialTheme(): HotelTheme {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = localStorage.getItem(HOTEL_THEME_STORAGE_KEY) as HotelTheme | null
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* private mode etc. */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HotelTheme>(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    root.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(HOTEL_THEME_STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
    const timer = window.setTimeout(() => {
      root.classList.remove('theme-switching')
    }, 350)
    return () => window.clearTimeout(timer)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
