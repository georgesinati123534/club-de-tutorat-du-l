import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, GraduationCap, Calendar, CheckCircle, Star } from '@phosphor-icons/react'
import { Match, Tutee } from '@/lib/types'

type MatchResultsProps = {
  tutee: Tutee
  matches: Match[]
  onBack: () => void
}

export default function MatchResults({ tutee, matches, onBack }: MatchResultsProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Retour
      </Button>

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-primary mb-2">
          Tuteurs Disponibles
        </h2>
        <p className="text-lg text-muted-foreground">
          Pour {tutee.firstName} {tutee.lastName} ({tutee.class})
        </p>
      </div>

      {matches.length === 0 ? (
        <Alert className="bg-muted">
          <AlertDescription className="text-base">
            <p className="font-semibold mb-2">Aucun tuteur disponible pour le moment</p>
            <p>
              Il n'y a actuellement aucun tuteur correspondant à vos critères (matières et disponibilités).
              Vous pouvez réessayer plus tard ou modifier vos disponibilités pour élargir les possibilités.
            </p>
            <p className="mt-4">
              Vous souhaitez devenir tuteur vous-même ? 
              <Button variant="link" className="px-2" onClick={onBack}>
                Inscrivez-vous ici
              </Button>
            </p>
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Alert className="mb-8 bg-accent/10 border-accent">
            <CheckCircle size={20} className="text-accent-foreground" weight="bold" />
            <AlertDescription>
              <strong>{matches.length} tuteur{matches.length > 1 ? 's trouvé' : ' trouvé'}s !</strong> 
              {' '}Voici les tuteurs compatibles avec vos besoins et disponibilités.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <Card 
                key={match.tutor.id} 
                className="hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                {index === 0 && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" className="bg-accent text-accent-foreground">
                      <Star size={14} className="mr-1" weight="fill" />
                      Meilleur Match
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={24} className="text-primary" weight="bold" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">
                        {match.tutor.firstName} {match.tutor.lastName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {match.tutor.class}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle size={16} weight="bold" />
                      Matières en commun ({match.commonSubjects.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {match.commonSubjects.map(subject => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Calendar size={16} weight="bold" />
                      Créneaux communs ({match.commonSlots.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {match.commonSlots.slice(0, 6).map((slot, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {slot.day} {slot.time}
                        </Badge>
                      ))}
                      {match.commonSlots.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{match.commonSlots.length - 6}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Score de compatibilité</span>
                      <span className="font-semibold text-primary">
                        {match.compatibilityScore} pts
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-8">
            <AlertDescription>
              <strong>Prochaine étape :</strong> Contactez le Club de Tutorat pour finaliser 
              la mise en relation avec le tuteur de votre choix.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  )
}
