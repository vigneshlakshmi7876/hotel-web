import { lazy, Suspense, useRef, useState } from 'react'
import { ContactForm } from './ContactForm'
import { StaticLocationMap } from './StaticLocationMap'
import { useLatchInView } from '../hooks/useLatchInView'

const LiveMapPanel = lazy(() => import('./maps/LiveMapPanel'))

/** Form + map block — used on the landing page `#contact` and on the legacy `/contact` route. */
export function ContactSection() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''
  const mapSectionRef = useRef<HTMLDivElement>(null)
  const inView = useLatchInView(mapSectionRef)
  const [wantLive, setWantLive] = useState(false)

  const showLive = wantLive && inView && Boolean(apiKey)

  return (
    <>
      <div className="mx-auto max-w-lg">
        <ContactForm />
      </div>

      <div
        ref={mapSectionRef}
        className="glass-card mx-auto mt-16 max-w-3xl space-y-6 rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] border border-neutral-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#101012] md:p-8"
      >
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Find us</h2>
        <StaticLocationMap />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setWantLive(true)}
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Show live map
          </button>
          {!apiKey ? (
            <span className="text-sm font-medium text-red-700 dark:text-red-400">
              Add <code className="font-mono">VITE_GOOGLE_MAPS_API_KEY</code> for the live map.
            </span>
          ) : null}
          {wantLive && !inView ? (
            <span className="text-sm text-emerald-800 dark:text-emerald-400">
              Scroll this section into view to load the map script.
            </span>
          ) : null}
        </div>

        {showLive ? (
          <Suspense
            fallback={
              <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-neutral-300 text-sm font-medium text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                Loading interactive map…
              </div>
            }
          >
            <LiveMapPanel apiKey={apiKey} />
          </Suspense>
        ) : null}
      </div>
    </>
  )
}
