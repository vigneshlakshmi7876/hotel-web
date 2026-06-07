import { RESTAURANT } from '../lib/location'

type StaticLocationMapProps = {
  apiKey?: string
  width?: number
  height?: number
  zoom?: number
}

export function StaticLocationMap({
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  width = 640,
  height = 320,
  zoom = 15,
}: StaticLocationMapProps) {
  const { lat, lng, label } = RESTAURANT
  const mapsHref = `https://www.google.com/maps?q=${lat},${lng}`

  const staticSrc =
    apiKey &&
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&scale=2&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${encodeURIComponent(apiKey)}`

  return (
    <a
      href={mapsHref}
      target="_blank"
      rel="noreferrer"
      className="block overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
    >
      {staticSrc ? (
        <img
          src={staticSrc}
          width={width}
          height={height}
          alt={`Map preview near ${label}`}
          loading="lazy"
          decoding="async"
          className="mx-auto max-h-[min(40vh,320px)] w-full max-w-full object-cover"
        />
      ) : (
        <div className="flex min-h-40 items-center justify-center px-4 text-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
          Set{' '}
          <code className="mx-1 rounded border border-neutral-200 bg-neutral-50 px-1.5 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-zinc-950 dark:text-neutral-200">
            VITE_GOOGLE_MAPS_API_KEY
          </code>{' '}
          to show a static map preview.
        </div>
      )}
    </a>
  )
}
