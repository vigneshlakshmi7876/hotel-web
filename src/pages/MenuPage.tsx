import { Navigate } from 'react-router-dom'

/** Legacy path — full menu lives on the landing page at `#menu`. */
export default function MenuPage() {
  return <Navigate to={{ pathname: '/', hash: '#menu' }} replace />
}
