import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle, Trash } from '@phosphor-icons/react'
import { SUBJECTS, CLASSES_TUTOR } from '@/lib/matching'
import { Tutor, TimeSlot } from '@/lib/types'
import { toast } from 'sonner'
import AvailabilitySelector from '@/components/AvailabilitySelector'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type TutorEditProps = {
  tutor: Tutor
  onBack: () => void
  onSave: (tutor: Tutor) => void
  onDelete: (tutorId: string) => void
}

export default function TutorEdit({ tutor, onBack, onSave, onDelete }: TutorEditProps) {
  const [firstName, setFirstName] = useState(tutor.firstName)
  const [lastName, setLastName] = useState(tutor.lastName)
  const [selectedClass, setSelectedClass] = useState(tutor.class)
  const [phoneNumber, setPhoneNumber] = useState(tutor.phoneNumber || '')
  const [email, setEmail] = useState(tutor.email || '')
  const [preferredContact, setPreferredContact] = useState<'email' | 'whatsapp'>(tutor.preferredContact || 'email')
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(tutor.subjects)
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>(tutor.availability)

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

    const updatedTutor: Tutor = {
      ...tutor,
      firstName,
      lastName,
      class: selectedClass,
      subjects: selectedSubjects,
      availability: selectedSlots,
      phoneNumber: phoneNumber.trim() || undefined,
      email: email.trim() || undefined,
      preferredContact,
    }

    onSave(updatedTutor)
    toast.success('Profil mis à jour avec succès')
  }

  const handleDelete = () => {
    onDelete(tutor.id)
    toast.success('Profil supprimé avec succès')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Retour
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Modifier mon profil</CardTitle>
          <CardDescription className="text-base">
            Mettez à jour vos informations de tuteur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">Prénom *</Label>
                <Input
                  id="edit-firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Nom *</Label>
                <Input
                  id="edit-lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phoneNumber">Numéro de téléphone</Label>
              <Input
                id="edit-phoneNumber"
                type="tel"
                placeholder="06 12 34 56 78"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Vous allez recevoir un message d'un tutoré lorsqu'il vous choisit
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Adresse e-mail</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="votre.email@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Pour être contacté(e) par les tutorés
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-preferredContact">Méthode de communication préférée *</Label>
              <select
                id="edit-preferredContact"
                value={preferredContact}
                onChange={(e) => setPreferredContact(e.target.value as 'email' | 'whatsapp')}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="email">E-mail</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Comment souhaitez-vous être contacté par les tutorés ?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-class">Classe *</Label>
              <select
                id="edit-class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Sélectionner...</option>
                {CLASSES_TUTOR.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
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

            <AvailabilitySelector
              selectedSlots={selectedSlots}
              onToggleSlot={toggleSlot}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" size="lg" className="flex-1">
                <CheckCircle size={20} className="mr-2" weight="bold" />
                Enregistrer les modifications
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive" size="lg" className="flex-1 sm:flex-none">
                    <Trash size={20} className="mr-2" weight="bold" />
                    Supprimer mon profil
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr(e) ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Votre profil de tuteur sera définitivement supprimé et vous ne serez plus visible aux tutorés.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
