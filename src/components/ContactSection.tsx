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
                href="mailto:secretariat@lycee-bonaparte.fr" 
                className="text-primary hover:underline font-medium"
              >
                secretariat@lycee-bonaparte.fr
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
                Al Intisar Street<br />
                PO BOX: 6110<br />
                Doha – Qatar
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
      </div>
    </div>
  )
}
