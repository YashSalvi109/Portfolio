import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { ArrowUpRight, ExternalLink, MapPin, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../../data/profile'
import { realLink, shouldShow, SHOW_TODOS, TodoBadge, Txt } from '../../lib/todo'
import { Accent, Section } from '../Section'

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

function TiltCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduced = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, var(--glow), transparent 60%)`

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10)
    rx.set((0.5 - py) * 10)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileTap={{ scale: 0.99 }}
      aria-haspopup="dialog"
      className="card group relative flex h-full w-full flex-col overflow-hidden p-6 text-left transition-colors hover:border-accent/40"
    >
      <motion.div aria-hidden="true" style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between gap-3">
        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">{project.category}</span>
        <ArrowUpRight size={18} className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden="true" />
      </div>
      <h3 className="relative mt-5 text-xl font-semibold leading-snug text-ink">{project.title}</h3>
      <p className="relative mt-1 text-sm font-medium text-accent">
        {project.organisation}
        {project.role && <span className="text-muted"> · {project.role}</span>}
      </p>
      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <ul className="relative mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((t) => (
          <li key={t} className="chip">{t}</li>
        ))}
      </ul>
      <span className="relative mt-5 text-xs font-semibold text-muted group-hover:text-accent">View details →</span>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const link = realLink(project.link)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        // simple focus trap
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-ink"
        >
          <X size={18} />
        </button>

        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">{project.category}</span>
        <h3 id="project-modal-title" className="mt-4 pr-10 text-2xl font-bold tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-1 font-medium text-accent">
          {project.organisation}
          {project.role && <span className="text-muted"> · {project.role}</span>}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          {shouldShow(project.period) && <Txt>{project.period}</Txt>}
          {shouldShow(project.location) && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} aria-hidden="true" /> <Txt>{project.location}</Txt>
            </span>
          )}
        </p>

        <p className="mt-5 leading-relaxed text-ink/90">{project.summary}</p>

        <ul className="mt-5 space-y-3">
          {project.details.map((d, i) => (
            <li key={i} className="relative pl-5 text-sm leading-relaxed text-muted">
              <span aria-hidden="true" className="absolute top-2 left-0 h-1.5 w-1.5 rounded-full bg-accent" />
              <Txt>{d}</Txt>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>

        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-7">
            View project <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : (
          SHOW_TODOS && (
            <p className="mt-7">
              <TodoBadge>{project.link}</TodoBadge>
            </p>
          )
        )}
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)

  if (projects.length === 0) return null

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section id="projects" eyebrow="Projects & Leadership" title={<>Selected <Accent>work</Accent></>}>
      {categories.length > 2 && (
        <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === c ? 'text-on-accent' : 'border border-line text-muted hover:text-ink'
              }`}
            >
              {filter === c && (
                <motion.span layoutId="project-filter" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
              )}
              {c}
            </button>
          ))}
        </div>
      )}

      <motion.ul layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
            >
              <TiltCard project={p} onOpen={() => setSelected(p)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </Section>
  )
}
