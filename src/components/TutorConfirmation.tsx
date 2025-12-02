import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowLeft, ChatCircle } from '@phosphor-icons/react'
import { Tutor } from '@/lib/types'

type TutorConfirmationProps = {
  tutor: Tutor
  onBack: () => void
}

export default function TutorConfirmation({ tutor, onBack }: TutorConfirmationProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 min-h-[80vh] flex flex-col items-center justify-center">
      <div className="w-full space-y-8">
        <div className="flex justify-center">
          <div className="bg-accent/20 rounded-full p-6">
            <CheckCircle size={64} weight="fill" className="text-accent" />
          </div>
        </div>

        <Card className="border-2 border-accent/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Inscription réussie !</CardTitle>
            <CardDescription className="text-base mt-2">
              Merci de rejoindre le Club de Tutorat, {tutor.firstName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <ChatCircle size={24} weight="fill" className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Prochaines étapes</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Votre profil est maintenant visible aux élèves recherchant de l'aide. 
                    Lorsqu'un tutoré vous sélectionnera, vous recevrez un message{tutor.phoneNumber && ' par SMS'} 
                    avec ses coordonnées.
                  </p>
                </div>
              </div>

              {tutor.phoneNumber && (
                <div className="bg-background rounded-md p-4 border border-border">
                  <p className="text-sm">
                    <span className="font-medium">Numéro de contact :</span> {tutor.phoneNumber}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Vos informations :</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Classe</span>
                  <span className="font-medium">{tutor.class}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Matières</span>
                  <span className="font-medium text-right">{tutor.subjects.join(', ')}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Disponibilités</span>
                  <span className="font-medium">{tutor.availability.length} créneaux</span>
                </div>
              </div>
            </div>

            <Button onClick={onBack} size="lg" className="w-full mt-6">
              <ArrowLeft size={20} className="mr-2" />
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
