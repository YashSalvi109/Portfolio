import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}

/** Standard section shell: accessible landmark + animated heading. */
export function Section({ id, eyebrow, title, intro, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 outline-none sm:py-28 ${className}`}>
      <div className="container-page">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  )
}

/** Serif-italic accent word for headings. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="font-serif text-[1.12em] font-normal italic text-accent">{children}</span>
}
