import SiteLayout from './layouts/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'
import RootRedirect from './pages/RootRedirect.jsx'
import { LANGUAGES, routeSegments } from './config/routes.js'
import { projects } from './data/projects.js'

/**
 * One route tree per language, so every page has its own prerendered,
 * language-prefixed URL. Project pages are enumerated from src/data/projects.js
 * through getStaticPaths: adding a project adds its two pages automatically.
 *
 * Pages are imported statically rather than lazily on purpose: every route is
 * prerendered, so the HTML never waits for JavaScript, and all page components
 * together weigh less than the per-route asset preloads that lazy routes make
 * the prerenderer add to every page.
 */
const routes = [
  {
    path: '/',
    element: <RootRedirect />,
  },
  ...LANGUAGES.map((lang) => ({
    path: `/${lang}`,
    element: <SiteLayout lang={lang} />,
    children: [
      { index: true, element: <Home /> },
      { path: routeSegments.services[lang], element: <Services /> },
      { path: routeSegments.projects[lang], element: <Projects /> },
      {
        path: `${routeSegments.projects[lang]}/:slug`,
        element: <ProjectDetail />,
        getStaticPaths: () =>
          projects.map(
            (project) => `/${lang}/${routeSegments.projects[lang]}/${project.slug[lang]}`
          ),
      },
      { path: routeSegments.contact[lang], element: <Contact /> },
      { path: routeSegments.legal[lang], element: <Legal /> },
      { path: routeSegments.privacy[lang], element: <Privacy /> },
      { path: '*', element: <NotFound /> },
    ],
  })),
  // Prerendered so static hosts have a /404.html to serve for unknown URLs
  // (scripts/generate-seo-files.mjs copies it into place).
  {
    path: '/404',
    element: <SiteLayout lang="fr" />,
    children: [{ index: true, element: <NotFound /> }],
  },
  // Anything outside a language prefix falls back to the French 404.
  {
    path: '*',
    element: <SiteLayout lang="fr" />,
    children: [{ path: '*', element: <NotFound /> }],
  },
]

export default routes
