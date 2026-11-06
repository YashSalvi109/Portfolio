import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const read = (): Theme =>
  typeof document !== 'undefined' && !document.documentElement.classList.contains('dark') ? 'light' : 'dark'

/** Dark by default; choice persisted in localStorage and synced across components. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    const sync = () => setTheme(read())
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = read() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    window.dispatchEvent(new Event('themechange'))
  }, [])

  return { theme, toggle }
}
