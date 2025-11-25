import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle } from '@phosphor-icons/react'
import { SUBJECTS, CLASSES } from '@/lib/matching'
import { Tutee, TimeSlot } from '@/lib/types'
import { toast } from 'sonner'
import AvailabilitySelector from '@/components/AvailabilitySelector'

type TuteeFormProps = {
  onBack: () => void
  onSubmit: (tutee: Tutee) => void
}

export default function TuteeForm({ onBack, onSubmit }: TuteeFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([])

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    )
  }

  const toggleSlot = (day: string, time: string) => {
    const slot = { day, time }
    setSelectedSlots(prev => {
      const exists = prev.some(s => s.day === day && s.time === time)
      if (exists) {
        return prev.filter(s => !(s.day === day && s.time === time))
      } else {
        return [...prev, slot]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedSubjects.length === 0) {
      toast.error('Veuillez sélectionner au moins une matière')
      return
    }
    
    if (selectedSlots.length === 0) {
      toast.error('Veuillez sélectionner au moins une disponibilité')
      return
    }

    const tutee: Tutee = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      class: selectedClass,
      subjects: selectedSubjects,
      availability: selectedSlots,
      createdAt: Date.now()
    }

    onSubmit(tutee)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Retour
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Se Faire Tutorer</CardTitle>
          <CardDescription className="text-base">
            Trouvez le tuteur idéal pour vous accompagner dans votre réussite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="prenom.nom@lycee-bonaparte.fr"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Classe *</Label>
                <select
                  id="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Sélectionner...</option>
                  {CLASSES.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Matières souhaitées * (sélectionnez-en au moins une)</Label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map(subject => (
                  <Badge
                    key={subject}
                    variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                    className="cursor-pointer hover:opacity-80 transition-opacity px-3 py-2"
                    onClick={() => toggleSubject(subject)}
                  >
                    {selectedSubjects.includes(subject) && (
                      <CheckCircle size={14} className="mr-1" weight="fill" />
                    )}
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <AvailabilitySelector
              selectedSlots={selectedSlots}
              onToggleSlot={toggleSlot}
            />

            <Button type="submit" size="lg" className="w-full">
              <CheckCircle size={20} className="mr-2" weight="bold" />
              TROUVER UN TUTEUR
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
