import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'
import { scrollToSection } from '../lib/sections'
import { GitHubIcon, LinkedInIcon } from './Icons'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)" className="grid h-9 w-9 place-items-center rounded-full hover:text-accent">
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)" className="grid h-9 w-9 place-items-center rounded-full hover:text-accent">
            <GitHubIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp size={14} aria-hidden="true" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
