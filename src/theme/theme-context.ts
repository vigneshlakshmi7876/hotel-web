import { createContext } from 'react'

export const HOTEL_THEME_STORAGE_KEY = 'hotel-theme'

export type HotelTheme = 'light' | 'dark'

export type ThemeContextValue = {
  theme: HotelTheme
  setTheme: (t: HotelTheme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
