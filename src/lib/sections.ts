import { projects } from '../data/profile'

export type SectionId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'contact'

const all: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/** Sections that actually render. Projects disappears when the data is empty. */
export const sections = all.filter((s) => s.id !== 'projects' || projects.length > 0)

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'home' ? location.pathname : `#${id}`)
  // Move focus for keyboard / screen-reader users without a second scroll jump.
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
