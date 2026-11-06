import { AnimatePresence, motion } from 'framer-motion'
import { Check, CircleAlert, CircleCheck, Copy, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { contact, profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon } from '../Icons'
import { Accent, Section } from '../Section'

type Status = 'idle' | 'sending' | 'success' | 'error'

const mailto = (name = '', message = '') =>
  `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${name || 'your website'}`)}&body=${encodeURIComponent(message)}`

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [draft, setDraft] = useState({ name: '', message: '' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setDraft({ name: data.name, message: data.message })
    setStatus('sending')
    setError('')
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok)
        throw new Error(json.error || (res.status === 404 ? 'the form service isn’t available here' : `error ${res.status}`))
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: the mailto link is still there */
    }
  }

  const links = [
    { href: profile.links.linkedin, label: 'LinkedIn', sub: 'yash-salvi-09', icon: <LinkedInIcon className="h-5 w-5" /> },
    { href: profile.links.github, label: 'GitHub', sub: 'YashSalvi109', icon: <GitHubIcon className="h-5 w-5" /> },
  ]

  // Accent the last word of the heading, e.g. "Let’s *talk*".
  const words = contact.heading.split(' ')
  const lastWord = words.pop()

  return (
    <Section id="contact" eyebrow="Contact" title={<>{words.join(' ')} <Accent>{lastWord}</Accent></>} intro={contact.blurb}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Direct links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="card flex items-center gap-4 p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Mail size={20} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted">Email</p>
              <a href={`mailto:${profile.email}`} className="block truncate font-semibold text-ink hover:text-accent">
                {profile.email}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted hover:border-accent/50 hover:text-accent"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center gap-4 p-5 transition-colors hover:border-accent/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">{l.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-muted">{l.label}</span>
                <span className="block truncate font-semibold text-ink group-hover:text-accent">{l.sub}</span>
              </span>
              <span className="sr-only">(opens in new tab)</span>
              <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">→</span>
            </a>
          ))}

          <p className="flex items-center gap-2 px-1 text-sm text-muted">
            <MapPin size={14} className="text-accent" aria-hidden="true" /> {profile.location}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card relative overflow-hidden p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="ok"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[340px] flex-col items-center justify-center text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent-soft text-accent">
                  <CircleCheck size={28} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-muted">Thanks for reaching out. I’ll reply as soon as I can.</p>
                <button type="button" className="btn btn-ghost mt-6" onClick={() => setStatus('idle')}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4" noValidate={false}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">Name</span>
                    <input name="name" required maxLength={100} autoComplete="name" className="field" placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
                    <input name="email" type="email" required maxLength={200} autoComplete="email" className="field" placeholder="you@company.com" />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink">Message</span>
                  <textarea name="message" required minLength={10} maxLength={5000} rows={6} className="field resize-y" placeholder="How can I help?" />
                </label>

                {/* Honeypot: hidden from people, irresistible to bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Leave this field empty
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
                  </label>
                </div>

                <div aria-live="polite">
                  {status === 'error' && (
                    <div role="alert" className="flex gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
                      <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <p>
                        Sorry, the message couldn’t be sent{error ? ` (${error})` : ''}.{' '}
                        <a href={mailto(draft.name, draft.message)} className="font-semibold underline underline-offset-2">
                          Email me directly instead
                        </a>
                        .
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" /> Send message
                      </>
                    )}
                  </button>
                  <a href={mailto()} className="text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
                    or open your email app
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  )
}
