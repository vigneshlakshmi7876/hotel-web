import { useState, type FormEvent } from 'react'

type FormBackend = 'netlify' | 'formspree'

function resolveBackend(): FormBackend | null {
  const v = import.meta.env.VITE_FORM_BACKEND
  if (v === 'netlify' || v === 'formspree') return v
  return null
}

export function ContactForm() {
  const backend = resolveBackend()
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  const action =
    backend === 'formspree' && formspreeId
      ? `https://formspree.io/f/${formspreeId}`
      : backend === 'netlify'
        ? '/'
        : undefined

  function validate(): boolean {
    if (!name.trim()) {
      setError('Please enter your name.')
      return false
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email.')
      return false
    }
    if (!message.trim()) {
      setError('Please enter a message.')
      return false
    }
    setError(null)
    return true
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (!backend || !action) {
      e.preventDefault()
      setError(
        'Set VITE_FORM_BACKEND to netlify or formspree (and VITE_FORMSPREE_FORM_ID for Formspree).',
      )
      return
    }
    if (!validate()) {
      e.preventDefault()
    }
  }

  const netlifyProps =
    backend === 'netlify'
      ? {
          'data-netlify': 'true' as const,
          'data-netlify-honeypot': 'bot-field' as const,
        }
      : {}

  const fieldClass =
    'w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 dark:border-white/15 dark:bg-white/[0.08] dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/30'

  return (
    <form
      name="contact"
      method="post"
      action={action ?? '#'}
      onSubmit={onSubmit}
      className="glass-card mx-auto flex max-w-lg flex-col gap-5 rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] border border-neutral-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#101012] md:p-8"
      {...netlifyProps}
    >
      {backend === 'netlify' ? (
        <>
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don&apos;t fill this out: <input name="bot-field" />
            </label>
          </p>
        </>
      ) : null}

      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-bold text-neutral-900 dark:text-white">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-bold text-neutral-900 dark:text-white">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-bold text-neutral-900 dark:text-white">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={fieldClass}
        />
      </div>

      {error ? (
        <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
      >
        Send
      </button>
    </form>
  )
}
