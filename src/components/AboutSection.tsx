import { Card, CardContent } from '@/components/ui/card'
import { Users, Target, Heart } from '@phosphor-icons/react'

export default function AboutSection() {
  const founders = [
    {
      name: 'Carl Saleh',
      role: 'Fondateur',
      class: 'Terminale'
    },
    {
      name: 'Christa Tutinji',
      role: 'Fondatrice',
      class: 'Terminale'
    },
    {
      name: 'Georges Inati',
      role: 'Fondateur',
      class: 'Terminale'
    }
  ]

  const creators = [
    {
      name: 'Raphael El Khoury',
      role: 'Développeur',
      class: 'Terminale'
    },
    {
      name: 'Anouchka Aissa',
      role: 'Contributrice',
      class: 'Terminale'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Notre Mission
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Le Club de Tutorat du Lycée Bonaparte a été créé pour promouvoir l'excellence 
            académique et l'entraide entre élèves. Notre objectif est de créer une communauté 
            solidaire où chacun peut progresser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-primary" weight="duotone" />
              </div>
              <h3 className="font-bold text-xl mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                Des tuteurs qualifiés avec un haut niveau académique pour garantir un accompagnement de qualité
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-secondary" weight="duotone" />
              </div>
              <h3 className="font-bold text-xl mb-2">Communauté</h3>
              <p className="text-muted-foreground">
                Un réseau d'entraide qui renforce les liens entre élèves et favorise la réussite collective
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="text-accent-foreground" weight="duotone" />
              </div>
              <h3 className="font-bold text-xl mb-2">Bienveillance</h3>
              <p className="text-muted-foreground">
                Un accompagnement basé sur le respect, la patience et l'encouragement mutuel
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Les Fondateurs
          </h2>
          <p className="text-lg text-foreground/80">
            Les initiateurs du Club de Tutorat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {founders.map((founder, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-1">{founder.name}</h3>
                <p className="text-accent-foreground font-semibold mb-1">{founder.role}</p>
                <p className="text-sm text-muted-foreground">{founder.class}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Les Créateurs
          </h2>
          <p className="text-lg text-foreground/80">
            Les contributeurs créatifs du projet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {creators.map((creator, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-1">{creator.name}</h3>
                <p className="text-accent-foreground font-semibold mb-1">{creator.role}</p>
                <p className="text-sm text-muted-foreground">{creator.class}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
