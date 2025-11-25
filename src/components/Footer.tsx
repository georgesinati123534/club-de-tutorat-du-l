import { Separator } from '@/components/ui/separator'
import { GraduationCap } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <GraduationCap size={24} weight="bold" className="text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold">Club de Tutorat</p>
              <p className="text-sm text-primary-foreground/70">Lycée Bonaparte</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} Club de Tutorat - Lycée Bonaparte
            </p>
            <p className="text-sm text-primary-foreground/70">
              Ensemble pour l'excellence académique
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
