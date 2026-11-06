import { motion } from 'framer-motion'
import { Award, ExternalLink, GraduationCap, MapPin, Trophy } from 'lucide-react'
import { certifications, education } from '../../data/profile'
import { realLink, shouldShow, SHOW_TODOS, TodoBadge, Txt } from '../../lib/todo'
import { Accent, Section } from '../Section'

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, delay: i * 0.07 },
})

export function Education() {
  return (
    <Section id="education" eyebrow="Education & Certifications" title={<>Foundations & <Accent>credentials</Accent></>}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold tracking-wider text-ink uppercase">
            <GraduationCap size={18} className="text-accent" aria-hidden="true" /> Education
          </h3>
          <ul className="space-y-4">
            {education.map((e, i) => (
              <motion.li key={e.institution} {...reveal(i)} className="card p-5 transition-colors hover:border-accent/40 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{e.degree}</p>
                    <p className="mt-0.5 text-sm font-medium text-accent">{e.institution}</p>
                  </div>
                  {e.grade && (
                    <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                      {e.grade}
                    </span>
                  )}
                </div>
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span>{e.period}</span>
                  {shouldShow(e.location) && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} aria-hidden="true" /> <Txt>{e.location}</Txt>
                    </span>
                  )}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold tracking-wider text-ink uppercase">
            <Award size={18} className="text-accent" aria-hidden="true" /> Certifications & Professional Development
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {certifications.map((c, i) => {
              const link = realLink(c.link)
              const winner = c.note?.toLowerCase() === 'winner'
              return (
                <motion.li
                  key={c.name}
                  {...reveal(i)}
                  className={`card group relative overflow-hidden p-4 transition-colors hover:border-accent/40 ${winner ? 'border-accent/40' : ''}`}
                >
                  {winner && (
                    <div aria-hidden="true" className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[var(--glow)] blur-2xl" />
                  )}
                  <div className="relative flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                      {winner ? <Trophy size={16} aria-hidden="true" /> : <Award size={16} aria-hidden="true" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">
                        {link ? (
                          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                            {c.name} <ExternalLink size={12} aria-hidden="true" />
                            <span className="sr-only">(opens in new tab)</span>
                          </a>
                        ) : (
                          c.name
                        )}
                      </p>
                      {shouldShow(c.issuer) && (
                        <p className="mt-0.5 text-xs text-muted">
                          <Txt>{c.issuer}</Txt>
                        </p>
                      )}
                      {c.note && (
                        <span className="mt-2 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-on-accent uppercase">
                          {c.note}
                        </span>
                      )}
                      {!link && SHOW_TODOS && c.link && (
                        <p className="mt-2 text-xs">
                          <TodoBadge>{c.link}</TodoBadge>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
