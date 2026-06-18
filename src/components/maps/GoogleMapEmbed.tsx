import { RESTAURANT } from '../../lib/location'

/** Google Maps iframe — works when hosted without a build-time API key. */
export function GoogleMapEmbed() {
  const src = `https://maps.google.com/maps?q=${RESTAURANT.lat},${RESTAURANT.lng}&hl=en&z=15&output=embed`

  return (
    <iframe
      title={`Map near ${RESTAURANT.label}`}
      src={src}
      className="h-[min(40vh,320px)] min-h-72 w-full rounded-2xl border border-neutral-200 dark:border-neutral-800"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
