import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Download, MapPin, Send } from 'lucide-react'
import { profile } from '../../data/profile'
import { useTypewriter } from '../../hooks/useTypewriter'
import { scrollToSection } from '../../lib/sections'
import { GitHubIcon, LinkedInIcon } from '../Icons'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease } }),
}

export function Hero() {
  const reduced = !!useReducedMotion()
  const typed = useTypewriter(profile.roles, reduced)
  const [first, ...rest] = profile.name.split(' ')

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-[100svh] items-center pt-24 pb-16 outline-none">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Text */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="chip mx-auto gap-2 lg:mx-0"
          >
            <MapPin size={12} className="text-accent" aria-hidden="true" />
            {profile.location}
            <span aria-hidden="true">·</span>
            {profile.headline}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 text-5xl leading-[1.02] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {first}{' '}
            <span className="font-serif font-normal italic bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent dark:to-sky-200">
              {rest.join(' ')}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5 flex min-h-[2.25rem] flex-wrap items-center justify-center gap-x-2 text-xl font-medium text-muted sm:text-2xl lg:justify-start"
          >
            <span className="sr-only">Areas of focus: {profile.roles.join(', ')}</span>
            <span aria-hidden="true" className="text-ink">
              {typed}
              <span className="animate-blink ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-accent" />
            </span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a href="#experience" onClick={jump('experience')} className="btn btn-primary">
              View Experience
            </a>
            <a href={profile.resume.url} download={profile.resume.fileName} className="btn btn-ghost">
              <Download size={16} aria-hidden="true" /> Download CV
            </a>
            <a href="#contact" onClick={jump('contact')} className="btn btn-ghost">
              <Send size={16} aria-hidden="true" /> Contact
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
            aria-label="Profiles"
          >
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent">
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)" className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent">
                <GitHubIcon className="h-4 w-4" />
              </a>
            </li>
          </motion.ul>
        </div>

        {/* Photo */}
        <motion.div
          className="order-1 mx-auto w-56 sm:w-72 lg:order-2 lg:w-full lg:max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
        >
          <div className="relative aspect-square">
            {/* soft glow */}
            <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)] blur-2xl" />
            {/* rotating gradient ring */}
            <div
              aria-hidden="true"
              className="animate-spin-slow absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,var(--accent),transparent_30%,var(--navy)_55%,transparent_75%,var(--accent))] opacity-90"
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-bg bg-black">
              <picture>
                <source srcSet={profile.photo.webp} type="image/webp" />
                <img
                  src={profile.photo.fallback}
                  alt={profile.photo.alt}
                  width={533}
                  height={800}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full scale-[1.35] object-cover object-[50%_18%]"
                  style={{ transformOrigin: '50% 22%' }}
                />
              </picture>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={jump('about')}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted hover:text-accent sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: reduced ? 0 : [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
