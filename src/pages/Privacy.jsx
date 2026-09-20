import LegalPage from '../components/LegalPage.jsx'
import { content } from '../data/content.js'

export default function Privacy() {
  return <LegalPage pageKey="privacy" data={content.legalPages.privacy} />
}
