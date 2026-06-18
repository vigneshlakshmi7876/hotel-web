import { createContext } from 'react'

/** @deprecated use COLOR_MODE_STORAGE_KEY */
export const HOTEL_THEME_STORAGE_KEY = 'hotel-theme'

export const COLOR_SCHEME_STORAGE_KEY = 'hotel-color-scheme'
export const COLOR_MODE_STORAGE_KEY = 'hotel-color-mode'

export type ColorScheme = 'scarlet-grand' | 'saffron-garden'
export type ColorMode = 'light' | 'dark'

/** @deprecated use ColorMode */
export type HotelTheme = ColorMode

export type ThemeContextValue = {
  colorScheme: ColorScheme
  colorMode: ColorMode
  setColorScheme: (scheme: ColorScheme) => void
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const COLOR_SCHEMES: {
  id: ColorScheme
  name: string
  description: string
  swatches: [string, string]
}[] = [
  {
    id: 'scarlet-grand',
    name: 'Scarlet Grand',
    description: 'Bold red & emerald — modern city dining',
    swatches: ['#ef4444', '#10b981'],
  },
  {
    id: 'saffron-garden',
    name: 'Saffron Garden',
    description: 'Burnt saffron on charcoal — moody fine dining',
    swatches: ['#e8951e', '#141110'],
  },
]
