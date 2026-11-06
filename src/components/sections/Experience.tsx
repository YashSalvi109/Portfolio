import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { experience, type Experience as Exp } from '../../data/profile'
import { shouldShow, Txt } from '../../lib/todo'
import { Accent, Section } from '../Section'

// Newest first.
const items = [...experience].sort((a, b) => b.start.localeCompare(a.start))

function Dot({ current, compact }: { current?: boolean; compact?: boolean }) {
  return (
    <span aria-hidden="true" className="absolute top-6 left-[11px] -translate-x-1/2 sm:left-[15px]">
      {current && <span className="absolute inset-0 -m-1.5 animate-ping rounded-full bg-accent/40" />}
      <span
        className={`relative block rounded-full border-2 border-bg ${
          compact ? 'h-2.5 w-2.5 bg-muted/60' : 'h-3.5 w-3.5 bg-accent shadow-[0_0_12px_var(--glow)]'
        }`}
      />
    </span>
  )
}

function FullEntry({ item, defaultOpen }: { item: Exp; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className="card overflow-hidden transition-colors hover:border-accent/40">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold text-ink">{item.role}</h3>
            {item.current && (
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">Current</span>
            )}
          </div>
          <p className="mt-0.5 font-medium text-accent">{item.company}</p>
          {item.focus && <p className="mt-1 text-sm text-muted">{item.focus}</p>}
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span>{item.period}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} aria-hidden="true" /> {item.location}
            </span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <Txt>{item.summary}</Txt>
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted"
          aria-hidden="true"
        >
          <ChevronDown size={16} />
        </motion.span>
        <span className="sr-only">{open ? 'Hide details' : 'Show details'}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-5 pt-4 pb-6 sm:px-6">
              <ul className="space-y-3">
                {item.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="relative pl-5 text-sm leading-relaxed text-muted"
                  >
                    <span aria-hidden="true" className="absolute top-2 left-0 h-1.5 w-1.5 rounded-full bg-accent" />
                    <Txt>{h}</Txt>
                  </motion.li>
                ))}
              </ul>
              {item.tags && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Key methods">
                  {item.tags.map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CompactEntry({ item }: { item: Exp }) {
  return (
    <div className="rounded-xl border border-dashed border-line px-4 py-3 sm:px-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <p className="text-sm">
          <span className="font-semibold text-ink">{item.role}</span>
          <span className="text-muted"> · {item.company}</span>
        </p>
        <p className="shrink-0 text-xs text-muted">
          {item.period} · {item.location}
        </p>
      </div>
      {shouldShow(item.summary) && (
        <p className="mt-1.5 text-sm text-muted">
          <Txt>{item.summary}</Txt>
        </p>
      )}
    </div>
  )
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const firstFull = items.findIndex((i) => i.source === 'cv')

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>Where I’ve <Accent>made an impact</Accent></>}
      intro="Select a role to see the detail."
    >
      <ol ref={listRef} className="relative space-y-6 pl-8 sm:pl-12">
        {/* track + animated progress line */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-line sm:left-[15px]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gradient-to-b from-accent via-accent to-navy sm:left-[15px]"
        />

        {items.map((item, i) => {
          const compact = item.source === 'linkedin'
          return (
            <motion.li
              key={`${item.company}-${item.start}`}
              className="relative"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="absolute top-0 -left-8 h-full sm:-left-12">
                <Dot current={item.current} compact={compact} />
              </span>
              {compact ? <CompactEntry item={item} /> : <FullEntry item={item} defaultOpen={i === firstFull} />}
            </motion.li>
          )
        })}
      </ol>
    </Section>
  )
}
