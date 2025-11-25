import { Card, CardContent } from '@/components/ui/card'
import { EnvelopeSimple, MapPin, Phone } from '@phosphor-icons/react'

export default function ContactSection() {
  return (
    <div className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nous Contacter
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Une question ? N'hésitez pas à nous contacter. L'équipe du Club de Tutorat 
            est à votre disposition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <EnvelopeSimple size={32} className="text-primary" weight="duotone" />
              </div>
              <h3 className="font-bold text-xl mb-2">Email</h3>
              <p className="text-muted-foreground mb-2">Écrivez-nous à</p>
              <a 
                href="mailto:tutorat@lycee-bonaparte.fr" 
                className="text-primary hover:underline font-medium"
              >
                tutorat@lycee-bonaparte.fr
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-secondary" weight="duotone" />
              </div>
              <h3 className="font-bold text-xl mb-2">Adresse</h3>
              <p className="text-muted-foreground mb-2">Lycée Bonaparte</p>
              <p className="text-foreground font-medium">
                Salle B204<br />
                Tous les mercredis 16h-18h
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-accent-foreground" weight="duotone" />
              </div>
              <h3 className="font-bold text-xl mb-2">Permanence</h3>
              <p className="text-muted-foreground mb-2">Bureau du club</p>
              <p className="text-foreground font-medium">
                Lundi - Vendredi<br />
                12h30 - 13h30
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-8 text-center">
            <h3 className="font-bold text-2xl mb-4 text-primary">
              Lycée Bonaparte
            </h3>
            <p className="text-foreground/80 text-lg mb-6">
              Établissement d'excellence au service de la réussite de nos élèves depuis 1892
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} weight="bold" />
                <span>23 Avenue de la République, 75011 Paris</span>
              </div>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-2">
                <Phone size={16} weight="bold" />
                <span>01 23 45 67 89</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
