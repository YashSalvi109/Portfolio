import { useEffect, useState } from 'react'

/**
 * Cycles through words with a type / pause / delete effect.
 * With reduced motion, swaps whole words every few seconds instead.
 */
export function useTypewriter(words: string[], reduced: boolean) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduced ? words[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const word = words[index % words.length]

    if (reduced) {
      setText(word)
      const t = setTimeout(() => setIndex((i) => i + 1), 3000)
      return () => clearTimeout(t)
    }

    let delay = deleting ? 40 : 85
    if (!deleting && text === word) delay = 1800
    if (deleting && text === '') delay = 300

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, reduced])

  return text
}
