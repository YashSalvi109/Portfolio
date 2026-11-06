import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { skillGroups } from '../../data/profile'
import { Accent, Section } from '../Section'

const tabs = ['All', ...skillGroups.map((g) => g.name)]
const unique = (arr: string[]) => Array.from(new Set(arr))

export function Skills() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const skills = active === 0 ? unique(skillGroups.flatMap((g) => g.skills)) : skillGroups[active - 1].skills

  // Roving focus for the tablist (Left/Right/Up/Down/Home/End)
  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = active
    if (e.key in keys) next = (active + keys[e.key] + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>A toolkit across <Accent>research & strategy</Accent></>}
      intro="Choose a category to explore."
    >
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div
          role="tablist"
          aria-label="Skill categories"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {tabs.map((t, i) => {
            const selected = i === active
            const count = i === 0 ? unique(skillGroups.flatMap((g) => g.skills)).length : skillGroups[i - 1].skills.length
            return (
              <button
                key={t}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                id={`skill-tab-${i}`}
                aria-selected={selected}
                aria-controls="skill-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative flex shrink-0 items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium whitespace-nowrap transition-colors ${
                  selected ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 -z-10 rounded-xl border border-accent/30 bg-accent-soft"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span>{t}</span>
                <span className={`text-xs tabular-nums ${selected ? 'text-accent' : 'text-muted/70'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        <div
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${active}`}
          className="card min-h-[260px] p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              className="flex flex-wrap gap-2.5"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.025 } }, hidden: {} }}
            >
              {skills.map((s) => (
                <motion.li
                  key={s}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -3 }}
                  className="cursor-default rounded-full border border-line bg-surface-2/70 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-accent hover:shadow-[0_6px_20px_-8px_var(--glow)]"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
