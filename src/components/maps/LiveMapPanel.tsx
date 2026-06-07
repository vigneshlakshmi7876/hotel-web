import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { RESTAURANT } from '../../lib/location'

type LiveMapPanelProps = {
  apiKey: string
  mapId?: string
}

/** Default export for `React.lazy` — keeps Maps JS API out of the main bundle. */
export default function LiveMapPanel({
  apiKey,
  mapId = import.meta.env.VITE_GOOGLE_MAP_ID || 'DEMO_MAP_ID',
}: LiveMapPanelProps) {
  const position = { lat: RESTAURANT.lat, lng: RESTAURANT.lng }

  return (
    <div className="h-72 w-full overflow-hidden rounded-lg border border-slate-200 dark:border-neutral-700">
      <APIProvider apiKey={apiKey}>
        <Map
          className="h-full w-full"
          defaultCenter={position}
          defaultZoom={15}
          mapId={mapId}
          gestureHandling="greedy"
        >
          <AdvancedMarker position={position} />
        </Map>
      </APIProvider>
    </div>
  )
}
