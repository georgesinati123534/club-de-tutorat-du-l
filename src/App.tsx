import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import Hero from '@/components/Hero'
import TutorForm from '@/components/TutorForm'
import TuteeForm from '@/components/TuteeForm'
import MatchResults from '@/components/MatchResults'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { Tutor, Tutee, Match } from '@/lib/types'
import { findMatches } from '@/lib/matching'

type View = 'home' | 'tutor-form' | 'tutee-form' | 'results'

function App() {
  const [view, setView] = useState<View>('home')
  const [tutors, setTutors] = useKV<Tutor[]>('tutors', [])
  const [currentMatches, setCurrentMatches] = useState<Match[]>([])
  const [currentTutee, setCurrentTutee] = useState<Tutee | null>(null)

  const handleTutorSubmit = (tutor: Tutor) => {
    setTutors((current) => [...(current ?? []), tutor])
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTuteeSubmit = (tutee: Tutee) => {
    const matches = findMatches(tutee, tutors ?? [])
    setCurrentTutee(tutee)
    setCurrentMatches(matches)
    setView('results')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      
      {view === 'home' && (
        <>
          <Hero
            onBecomeTutor={() => setView('tutor-form')}
            onFindTutor={() => setView('tutee-form')}
          />
          <AboutSection />
          <ContactSection />
        </>
      )}

      {view === 'tutor-form' && (
        <TutorForm
          onBack={handleBackToHome}
          onSubmit={handleTutorSubmit}
        />
      )}

      {view === 'tutee-form' && (
        <TuteeForm
          onBack={handleBackToHome}
          onSubmit={handleTuteeSubmit}
        />
      )}

      {view === 'results' && currentTutee && (
        <MatchResults
          tutee={currentTutee}
          matches={currentMatches}
          onBack={handleBackToHome}
        />
      )}

      <Footer />
    </div>
  )
}

export default App