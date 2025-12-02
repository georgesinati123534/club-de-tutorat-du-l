import { Button } from '@/components/ui/button'
import { GraduationCap, BookOpen, Users } from '@phosphor-icons/react'

type HeroProps = {
  onBecomeTutor: () => void
  onFindTutor: () => void
}

export default function Hero({ onBecomeTutor, onFindTutor }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <GraduationCap size={48} weight="bold" className="text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
            Club de Tutorat
          </h1>
          
          <p className="text-2xl md:text-3xl text-secondary font-semibold mb-4">
            Lycée Bonaparte
          </p>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            Ensemble, cultivons l'excellence académique. Notre club connecte les élèves tuteurs 
            et tutorés pour favoriser l'entraide et la réussite de tous.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-base font-semibold tracking-wide shadow-lg hover:shadow-xl transition-shadow"
              onClick={onBecomeTutor}
            >
              <GraduationCap size={20} className="mr-2" weight="bold" />
              DEVENIR TUTEUR
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base font-semibold tracking-wide border-2 hover:bg-primary/5"
              onClick={onFindTutor}
            >
              <BookOpen size={20} className="mr-2" weight="bold" />
              SE FAIRE TUTORER
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Users size={32} className="text-accent-foreground" weight="duotone" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Matching Automatique</h3>
              <p className="text-muted-foreground text-center">
                Trouvez le tuteur idéal selon vos besoins
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <BookOpen size={32} className="text-accent-foreground" weight="duotone" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Toutes les Matières</h3>
              <p className="text-muted-foreground text-center">
                De la Sixième à la Terminale
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
