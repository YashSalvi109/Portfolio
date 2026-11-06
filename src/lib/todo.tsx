/**
 * Placeholder handling for profile.ts.
 *   "TODO: …"        → the whole value is a placeholder
 *   "…[TODO: …]…"    → an inline placeholder inside a sentence
 * In dev, placeholders render as amber badges. In production they are removed.
 */
export const SHOW_TODOS = import.meta.env.DEV

export const isTodo = (s?: string | null): boolean => !s || /^\s*TODO:/i.test(s)

/** True when the value should be rendered (real value, or a TODO while in dev). */
export const shouldShow = (s?: string | null): boolean => !!s && (!isTodo(s) || SHOW_TODOS)

/** A real (non-placeholder) URL, or undefined. */
export const realLink = (s?: string | null): string | undefined => (s && !isTodo(s) ? s : undefined)

export function TodoBadge({ children }: { children: string }) {
  return (
    <mark
      title="Placeholder: visible in dev only, hidden in production"
      className="rounded-md bg-amber-400/15 px-1.5 py-0.5 text-[0.85em] font-medium text-amber-700 ring-1 ring-amber-500/40 dark:text-amber-300"
    >
      {children.replace(/^\[|\]$/g, '')}
    </mark>
  )
}

/** Renders text, handling whole-value and inline TODO placeholders. */
export function Txt({ children }: { children: string }) {
  if (isTodo(children)) return SHOW_TODOS ? <TodoBadge>{children}</TodoBadge> : null
  const parts = children.split(/(\[TODO:[^\]]*\])/)
  if (parts.length === 1) return <>{children}</>
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (SHOW_TODOS ? <TodoBadge key={i}>{` ${p}`}</TodoBadge> : null) : <span key={i}>{p}</span>,
      )}
    </>
  )
}
