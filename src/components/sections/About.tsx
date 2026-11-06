import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { about, profile } from '../../data/profile'
import { Accent, Section } from '../Section'

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString('en-GB')}
      {suffix}
    </span>
  )
}

export function About() {
  return (
    <Section id="about" eyebrow="About" title={<>Insight that drives <Accent>decisions</Accent></>}>
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}

          <dl className="grid gap-4 pt-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold tracking-wider text-ink uppercase">Sectors</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {about.sectors.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wider text-ink uppercase">Brands supported</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {about.clients.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </dd>
            </div>
          </dl>
          <p className="text-sm">{profile.availability}</p>
        </motion.div>

        <ul className="grid grid-cols-2 gap-4 self-start">
          {about.stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card group relative overflow-hidden p-5 transition-colors hover:border-accent/40 sm:p-6"
            >
              <div aria-hidden="true" className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[var(--glow)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <p className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
