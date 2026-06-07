import { Navigate } from 'react-router-dom'

/** Legacy path — contact form lives on the landing page at `#contact`. */
export default function ContactPage() {
  return <Navigate to={{ pathname: '/', hash: '#contact' }} replace />
}
