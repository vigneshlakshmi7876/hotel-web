import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  COLOR_MODE_STORAGE_KEY,
  COLOR_SCHEME_STORAGE_KEY,
  HOTEL_THEME_STORAGE_KEY,
  ThemeContext,
  type ColorMode,
  type ColorScheme,
} from './theme-context.ts'

function readInitialScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'scarlet-grand'
  try {
    const saved = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) as ColorScheme | null
    if (saved === 'scarlet-grand' || saved === 'saffron-garden') return saved
  } catch {
    /* private mode etc. */
  }
  return 'scarlet-grand'
}

function readInitialMode(): ColorMode {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved =
      (localStorage.getItem(COLOR_MODE_STORAGE_KEY) as ColorMode | null) ??
      (localStorage.getItem(HOTEL_THEME_STORAGE_KEY) as ColorMode | null)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* private mode etc. */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(readInitialScheme)
  const [colorMode, setColorModeState] = useState<ColorMode>(readInitialMode)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    root.dataset.theme = colorScheme
    root.classList.toggle('dark', colorMode === 'dark')
    try {
      localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, colorScheme)
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode)
      localStorage.setItem(HOTEL_THEME_STORAGE_KEY, colorMode)
    } catch {
      /* ignore */
    }
    const timer = window.setTimeout(() => {
      root.classList.remove('theme-switching')
    }, 350)
    return () => window.clearTimeout(timer)
  }, [colorScheme, colorMode])

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    setColorSchemeState(scheme)
  }, [])

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode)
  }, [])

  const toggleColorMode = useCallback(() => {
    setColorModeState((m) => (m === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      colorScheme,
      colorMode,
      setColorScheme,
      setColorMode,
      toggleColorMode,
    }),
    [colorScheme, colorMode, setColorScheme, setColorMode, toggleColorMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
