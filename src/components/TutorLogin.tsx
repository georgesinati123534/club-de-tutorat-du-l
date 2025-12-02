import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react'
import { Tutor } from '@/lib/types'
import { toast } from 'sonner'

type TutorLoginProps = {
  onBack: () => void
  onTutorFound: (tutor: Tutor) => void
  tutors: Tutor[]
}

export default function TutorLogin({ onBack, onTutorFound, tutors }: TutorLoginProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const foundTutor = tutors.find(tutor => 
      tutor.firstName.toLowerCase() === firstName.toLowerCase() &&
      tutor.lastName.toLowerCase() === lastName.toLowerCase() &&
      (tutor.email?.toLowerCase() === email.toLowerCase() || (!tutor.email && !email))
    )

    if (foundTutor) {
      onTutorFound(foundTutor)
    } else {
      toast.error('Aucun profil trouvé avec ces informations')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-12 py-12 min-h-[80vh]">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Retour
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Modifier mon profil</CardTitle>
          <CardDescription className="text-base">
            Entrez vos informations pour accéder à votre profil de tuteur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="search-firstName">Prénom *</Label>
              <Input
                id="search-firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="search-lastName">Nom *</Label>
              <Input
                id="search-lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="search-email">Adresse e-mail</Label>
              <Input
                id="search-email"
                type="email"
                placeholder="votre.email@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                L'adresse e-mail que vous avez utilisée lors de votre inscription
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <MagnifyingGlass size={20} className="mr-2" weight="bold" />
              Rechercher mon profil
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
