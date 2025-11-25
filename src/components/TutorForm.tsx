import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, CheckCircle, X } from '@phosphor-icons/react'
import { SUBJECTS, CLASSES, DAYS, TIME_SLOTS } from '@/lib/matching'
import { Tutor, TimeSlot } from '@/lib/types'
import { toast } from 'sonner'

type TutorFormProps = {
  onBack: () => void
  onSubmit: (tutor: Tutor) => void
}

export default function TutorForm({ onBack, onSubmit }: TutorFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [average, setAverage] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([])
  const [showAverageError, setShowAverageError] = useState(false)

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

  const isSlotSelected = (day: string, time: string) => {
    return selectedSlots.some(s => s.day === day && s.time === time)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const avgNum = parseFloat(average)
    if (avgNum < 16) {
      setShowAverageError(true)
      return
    }
    
    if (selectedSubjects.length === 0) {
      toast.error('Veuillez sélectionner au moins une matière')
      return
    }
    
    if (selectedSlots.length === 0) {
      toast.error('Veuillez sélectionner au moins une disponibilité')
      return
    }

    const tutor: Tutor = {
      id: Date.now().toString(),
      firstName,
      lastName,
      class: selectedClass,
      subjects: selectedSubjects,
      average: avgNum,
      availability: selectedSlots,
      createdAt: Date.now()
    }

    onSubmit(tutor)
    toast.success('Inscription réussie ! Merci de rejoindre le Club de Tutorat.')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Retour
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Devenir Tuteur</CardTitle>
          <CardDescription className="text-base">
            Partagez vos connaissances et aidez vos camarades à réussir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-accent/10 border-accent">
            <AlertDescription className="text-sm">
              <strong>Conditions de participation :</strong> Moyenne générale minimum de 16/20. 
              En tant que tuteur, vous vous engagez à accompagner les élèves avec sérieux et bienveillance.
            </AlertDescription>
          </Alert>

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

              <div className="space-y-2">
                <Label htmlFor="average">Moyenne générale (/20) *</Label>
                <Input
                  id="average"
                  type="number"
                  step="0.01"
                  min="0"
                  max="20"
                  value={average}
                  onChange={(e) => {
                    setAverage(e.target.value)
                    setShowAverageError(false)
                  }}
                  required
                />
                {showAverageError && (
                  <p className="text-sm text-destructive">
                    La moyenne minimum requise est de 16/20
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Matières à enseigner * (sélectionnez-en au moins une)</Label>
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

            <div className="space-y-3">
              <Label>Disponibilités * (sélectionnez vos créneaux)</Label>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-border p-2 bg-muted text-left font-semibold text-sm">
                        Jour
                      </th>
                      {TIME_SLOTS.map(time => (
                        <th key={time} className="border border-border p-2 bg-muted text-center font-semibold text-sm">
                          {time}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map(day => (
                      <tr key={day}>
                        <td className="border border-border p-2 font-medium text-sm">
                          {day}
                        </td>
                        {TIME_SLOTS.map(time => (
                          <td key={`${day}-${time}`} className="border border-border p-2 text-center">
                            <Checkbox
                              checked={isSlotSelected(day, time)}
                              onCheckedChange={() => toggleSlot(day, time)}
                              className="mx-auto"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {selectedSlots.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedSlots.length} créneau{selectedSlots.length > 1 ? 'x' : ''} sélectionné{selectedSlots.length > 1 ? 's' : ''}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              <CheckCircle size={20} className="mr-2" weight="bold" />
              S'INSCRIRE COMME TUTEUR
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
