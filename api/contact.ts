/**
 * POST /api/contact (Vercel Serverless Function)
 * Sends contact-form messages to CONTACT_EMAIL via Resend (https://resend.com).
 *
 * Env vars (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  (required) Resend API key
 *   CONTACT_EMAIL   (required) inbox that receives messages
 *   CONTACT_FROM    (optional) verified sender, defaults to Resend's test sender
 *
 * Spam protection: hidden "website" honeypot field. If it is filled in we
 * pretend success and drop the message.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'

const LIMITS = { name: 100, email: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function parseBody(body: unknown): Record<string, unknown> {
  if (!body) return {}
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return typeof body === 'object' ? (body as Record<string, unknown>) : {}
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = parseBody(req.body)

  // Honeypot: real users never see this field.
  if (str(body.website)) return res.status(200).json({ ok: true })

  // Strip line breaks from name to keep the subject header clean.
  const name = str(body.name).replace(/[\r\n]+/g, ' ')
  const email = str(body.email)
  const message = str(body.message)

  if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Please fill in all fields' })
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address' })
  if (name.length > LIMITS.name || message.length > LIMITS.message)
    return res.status(400).json({ ok: false, error: 'Message is too long' })
  if (message.length < 10) return res.status(400).json({ ok: false, error: 'Message is too short' })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL
  if (!apiKey || !to) {
    console.error('contact: RESEND_API_KEY or CONTACT_EMAIL is not set')
    return res.status(500).json({ ok: false, error: 'Contact form is not configured yet' })
  }
  const from = process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>'

  const text = `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\n\n${message}`
  const html = `<div style="font-family:system-ui,sans-serif;line-height:1.5">
  <h2 style="margin:0 0 12px">New message from your portfolio</h2>
  <p><strong>Name:</strong> ${escapeHtml(name)}<br/><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p style="white-space:pre-wrap;border-left:3px solid #7dd3fc;padding-left:12px">${escapeHtml(message)}</p>
</div>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text,
        html,
      }),
    })
    if (!r.ok) {
      console.error('contact: Resend error', r.status, await r.text())
      return res.status(502).json({ ok: false, error: 'Email service error' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact: request failed', err)
    return res.status(502).json({ ok: false, error: 'Email service unavailable' })
  }
}
