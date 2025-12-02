import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster, toast } from 'sonner'
import Hero from '@/components/Hero'
import TutorForm from '@/components/TutorForm'
import TutorConfirmation from '@/components/TutorConfirmation'
import TutorLogin from '@/components/TutorLogin'
import TutorEdit from '@/components/TutorEdit'
import TuteeForm from '@/components/TuteeForm'
import MatchResults from '@/components/MatchResults'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { Tutor, Tutee, Match } from '@/lib/types'
import { findMatches } from '@/lib/matching'

type View = 'home' | 'tutor-form' | 'tutor-confirmation' | 'tutor-login' | 'tutor-edit' | 'tutee-form' | 'results'

function App() {
  const [view, setView] = useState<View>('home')
  const [tutors, setTutors] = useKV<Tutor[]>('tutors', [])
  const [currentMatches, setCurrentMatches] = useState<Match[]>([])
  const [currentTutee, setCurrentTutee] = useState<Tutee | null>(null)
  const [currentTutor, setCurrentTutor] = useState<Tutor | null>(null)
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null)

  const handleTutorSubmit = (tutor: Tutor) => {
    setTutors((current) => [...(current ?? []), tutor])
    setCurrentTutor(tutor)
    setView('tutor-confirmation')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTuteeSubmit = (tutee: Tutee) => {
    const tutorList = tutors ?? []
    const matches = findMatches(tutee, tutorList)
    setCurrentTutee(tutee)
    setCurrentMatches(matches)
    setView('results')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setView('home')
    setEditingTutor(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTutorFound = (tutor: Tutor) => {
    setEditingTutor(tutor)
    setView('tutor-edit')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTutorUpdate = (updatedTutor: Tutor) => {
    setTutors((current) => 
      (current ?? []).map(t => t.id === updatedTutor.id ? updatedTutor : t)
    )
    setEditingTutor(null)
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTutorDelete = (tutorId: string) => {
    setTutors((current) => 
      (current ?? []).filter(t => t.id !== tutorId)
    )
    setEditingTutor(null)
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
            onEditProfile={() => setView('tutor-login')}
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

      {view === 'tutor-confirmation' && currentTutor && (
        <TutorConfirmation
          tutor={currentTutor}
          onBack={handleBackToHome}
        />
      )}

      {view === 'tutor-login' && (
        <TutorLogin
          onBack={handleBackToHome}
          onTutorFound={handleTutorFound}
          tutors={tutors ?? []}
        />
      )}

      {view === 'tutor-edit' && editingTutor && (
        <TutorEdit
          tutor={editingTutor}
          onBack={handleBackToHome}
          onSave={handleTutorUpdate}
          onDelete={handleTutorDelete}
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