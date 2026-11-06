import { AnimatePresence, motion } from 'framer-motion'
import { Command, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToSection, sections } from '../lib/sections'
import { ThemeToggle } from './ThemeToggle'

const ids = sections.map((s) => s.id)
const navItems = sections.filter((s) => s.id !== 'home')
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#home" onClick={go('home')} className="group flex items-center gap-2.5" aria-label={`${profile.name}, back to top`}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-navy to-accent text-sm font-bold text-white shadow-[0_0_20px_-4px_var(--glow)]">
            YS
          </span>
          <span className="hidden font-semibold tracking-tight sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active === s.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-accent/25 bg-accent-soft"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pr-2 pl-3 text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink sm:flex"
            aria-label="Open command palette"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
          >
            Quick jump
            <kbd className="flex items-center gap-0.5 rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-sans text-[10px]">
              {isMac ? <Command size={10} /> : 'Ctrl'} K
            </kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface/60 text-muted lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 pb-4">
              {navItems.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={go(s.id)}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      active === s.id ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface-2'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onOpenPalette()
                  }}
                  className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-muted hover:bg-surface-2"
                >
                  Quick jump…
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
