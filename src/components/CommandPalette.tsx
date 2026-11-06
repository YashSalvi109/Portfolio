import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, CornerDownLeft, Download, Mail, Moon, Search } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
import { scrollToSection, sections } from '../lib/sections'
import { GitHubIcon, LinkedInIcon } from './Icons'

type Item = { id: string; label: string; group: 'Navigate' | 'Actions' | 'Links'; icon: ReactNode; run: () => void; keywords?: string }

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const { toggle } = useTheme()
  const listId = useId()

  const items = useMemo<Item[]>(
    () => [
      ...sections.map<Item>((s) => ({
        id: `go-${s.id}`,
        label: `Go to ${s.label}`,
        group: 'Navigate',
        icon: <ArrowRight size={16} />,
        run: () => scrollToSection(s.id),
      })),
      { id: 'theme', label: 'Toggle light / dark theme', group: 'Actions', icon: <Moon size={16} />, run: toggle, keywords: 'mode dark light' },
      {
        id: 'cv',
        label: 'Download CV',
        group: 'Actions',
        icon: <Download size={16} />,
        keywords: 'resume',
        run: () => {
          const a = document.createElement('a')
          a.href = profile.resume.url
          a.download = profile.resume.fileName
          a.click()
        },
      },
      {
        id: 'copy',
        label: 'Copy email address',
        group: 'Actions',
        icon: <Copy size={16} />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => flash('Email copied'),
            () => flash(profile.email),
          )
        },
      },
      { id: 'mail', label: 'Send an email', group: 'Links', icon: <Mail size={16} />, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: 'li', label: 'Open LinkedIn', group: 'Links', icon: <LinkedInIcon className="h-4 w-4" />, run: () => window.open(profile.links.linkedin, '_blank', 'noopener') },
      { id: 'gh', label: 'Open GitHub', group: 'Links', icon: <GitHubIcon className="h-4 w-4" />, run: () => window.open(profile.links.github, '_blank', 'noopener') },
    ],
    [toggle],
  )

  function flash(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 1800)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => `${i.label} ${i.group} ${i.keywords ?? ''}`.toLowerCase().includes(q))
  }, [items, query])

  // Global shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  // Open / close side effects: focus management + scroll lock
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement
      setQuery('')
      setIndex(0)
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      lastFocus.current?.focus?.()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const run = (item: Item) => {
    // Keep the palette open for copy so the toast is visible; close otherwise.
    if (item.id !== 'copy') setOpen(false)
    // Let the dialog unmount (and restore scroll) before navigating.
    setTimeout(item.run, item.id.startsWith('go-') ? 60 : 0)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (i + 1) % Math.max(filtered.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filtered[index]
      if (item) run(item)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus inside the dialog
    }
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section or run an action…"
                className="h-14 w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none focus-visible:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={filtered[index] ? `${listId}-${filtered[index].id}` : undefined}
                aria-autocomplete="list"
              />
              <kbd className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted">Esc</kbd>
            </div>

            <ul ref={listRef} id={listId} role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”</li>}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null
                lastGroup = item.group
                const selected = i === index
                return (
                  <li key={item.id} role="presentation">
                    {header && (
                      <div role="presentation" className="px-3 pt-3 pb-1.5 text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
                        {header}
                      </div>
                    )}
                    <div
                      id={`${listId}-${item.id}`}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(item)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        selected ? 'bg-accent-soft text-ink' : 'text-muted'
                      }`}
                    >
                      <span className={selected ? 'text-accent' : ''}>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {selected && <CornerDownLeft size={14} className="text-muted" aria-hidden="true" />}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-muted">
              <span>↑ ↓ to navigate · ↵ to select</span>
              <span role="status" aria-live="polite" className="font-medium text-accent">
                {toast}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
