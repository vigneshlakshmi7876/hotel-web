import { lazy, Suspense, useRef } from 'react'
import { ContactForm } from './ContactForm'
import { useLatchInView } from '../hooks/useLatchInView'
import { RESTAURANT } from '../lib/location'

const LiveMapPanel = lazy(() => import('./maps/LiveMapPanel'))

const mapsHref = `https://www.google.com/maps?q=${RESTAURANT.lat},${RESTAURANT.lng}`

function MapPlaceholder({ message }: { message: string }) {
  return (
    <div className="flex h-[min(40vh,320px)] min-h-72 items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-4 text-center text-sm font-medium text-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-400">
      {message}
    </div>
  )
}

/** Form + map block — used on the landing page `#contact` and on the legacy `/contact` route. */
export function ContactSection() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''
  const mapSectionRef = useRef<HTMLDivElement>(null)
  const inView = useLatchInView(mapSectionRef)

  return (
    <>
      <div className="mx-auto max-w-lg">
        <ContactForm />
      </div>

      <div
        ref={mapSectionRef}
        className="glass-card mx-auto mt-16 max-w-3xl space-y-4 rounded-[2rem] rounded-tr-[1rem] rounded-bl-[1rem] border border-neutral-200/80 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#101012] md:p-8"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">Find us</h2>
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-red-600 transition hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Get directions →
          </a>
        </div>

        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{RESTAURANT.label}</p>

        {!apiKey ? (
          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transition hover:border-red-300 dark:border-neutral-800 dark:bg-black dark:hover:border-red-800"
          >
            <MapPlaceholder message="Add VITE_GOOGLE_MAPS_API_KEY to show an interactive map — or open in Google Maps." />
          </a>
        ) : inView ? (
          <Suspense fallback={<MapPlaceholder message="Loading map…" />}>
            <LiveMapPanel apiKey={apiKey} />
          </Suspense>
        ) : (
          <MapPlaceholder message="Scroll here to load the map." />
        )}
      </div>
    </>
  )
}
