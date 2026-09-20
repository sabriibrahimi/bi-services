import { ViteReactSSG } from 'vite-react-ssg'
import routes from './routes.jsx'
import { basePath } from './config/deployment.js'

import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/archivo/wght.css'
import './styles/tokens.css'
import './styles/base.css'

// `basename` keeps every <Link to="/fr/..."> correct when the site is served
// from a sub-path, such as a GitHub Pages project site. React Router wants it
// without the trailing slash, and omitted entirely at the root.
const basename = basePath === '/' ? undefined : basePath.replace(/\/$/, '')

export const createRoot = ViteReactSSG({ routes, basename })
