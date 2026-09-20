import LegalPage from '../components/LegalPage.jsx'
import { content } from '../data/content.js'

export default function Legal() {
  return <LegalPage pageKey="legal" data={content.legalPages.legal} />
}
