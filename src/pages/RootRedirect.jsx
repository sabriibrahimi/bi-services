import { Navigate } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { DEFAULT_LANGUAGE, path } from '../config/routes.js'
import { absoluteUrl } from '../utils/links.js'
import { withBase } from '../config/deployment.js'

const target = path('home', DEFAULT_LANGUAGE)
// The meta refresh and the fallback link are raw URLs rather than router
// links, so they need the base path applied by hand.
const href = withBase(target)

/**
 * "/" belongs to no language. The prerendered page carries a meta refresh and a
 * canonical pointing at the French home page, so crawlers and visitors without
 * JavaScript land correctly; React Router redirects immediately for everyone
 * else. Hosts that support redirect rules use public/_redirects instead.
 */
export default function RootRedirect() {
  return (
    <>
      <Head>
        <html lang={DEFAULT_LANGUAGE} />
        <title>BI SERVICES Sàrl — Pose et rénovation de sols</title>
        <meta httpEquiv="refresh" content={`0; url=${href}`} />
        <link rel="canonical" href={absoluteUrl(target)} />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <p style={{ padding: '2rem' }}>
        <a href={href}>BI SERVICES Sàrl</a>
      </p>
      <Navigate to={target} replace />
    </>
  )
}
