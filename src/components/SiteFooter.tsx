import type { FormEvent } from 'react'
import { type SectionId, scrollToSection } from '../hooks/useActiveSection'

function FooterAnchor({
  id,
  label,
  className,
}: {
  id: SectionId
  label: string
  className?: string
}) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(id)
      }}
    >
      {label}
    </a>
  )
}

export function SiteFooter() {
  function onNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <footer className="border-t border-neutral-200 bg-white px-4 py-14 dark:border-neutral-800 dark:bg-black md:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="text-lg font-bold tracking-tight text-red-600 dark:text-red-500">
            The Scarlet Grand
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            South Indian, North Indian, and Chinese — dine in and takeaway. Open daily with the same
            menu you see on this page.
          </p>
          <p className="mt-4 text-xs font-medium text-neutral-500 dark:text-neutral-500">
            Follow for specials (placeholder)
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            On this page
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            <li>
              <FooterAnchor
                id="home"
                label="Home"
                className="hover:text-red-600 dark:hover:text-red-400"
              />
            </li>
            <li>
              <FooterAnchor
                id="menu"
                label="Menu"
                className="hover:text-red-600 dark:hover:text-red-400"
              />
            </li>
            <li>
              <FooterAnchor
                id="about"
                label="About us"
                className="hover:text-red-600 dark:hover:text-red-400"
              />
            </li>
            <li>
              <FooterAnchor
                id="specials"
                label="Specials"
                className="hover:text-red-600 dark:hover:text-red-400"
              />
            </li>
            <li>
              <FooterAnchor
                id="reviews"
                label="Customer review"
                className="hover:text-red-600 dark:hover:text-red-400"
              />
            </li>
            <li>
              <FooterAnchor
                id="contact"
                label="Contact"
                className="hover:text-red-600 dark:hover:text-red-400"
              />
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Visit
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Lobby level · City centre
            <br />
            <span className="text-emerald-700 dark:text-emerald-400">reservations@scarletgrand.example</span>
          </p>
          <p className="mt-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Everyday · 11:00 — 23:00
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Newsletters
          </h2>
          <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Menus and weekend offers — no spam.
          </p>
          <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={onNewsletterSubmit}>
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-neutral-700 dark:bg-zinc-950 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-neutral-200 pt-8 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
        © {new Date().getFullYear()} The Scarlet Grand. Demo site — replace copy and endpoints before
        launch.
      </div>
    </footer>
  )
}
