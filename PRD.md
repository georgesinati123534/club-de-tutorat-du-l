# Planning Guide

Un site web de tutorat scolaire qui connecte les élèves tuteurs et tutorés du Lycée Bonaparte pour faciliter l'entraide académique et améliorer la réussite scolaire.

**Experience Qualities**:
1. **Accessible** - Le site doit être immédiatement compréhensible pour tous les lycéens, avec une navigation claire et des formulaires simples
2. **Confiant** - L'interface inspire la confiance académique avec un design professionnel qui reflète le sérieux de l'établissement
3. **Encourageant** - L'expérience motive les élèves à participer au programme de tutorat avec une présentation chaleureuse et accueillante

**Complexity Level**: Light Application (multiple features with basic state)
  - Le site gère des formulaires d'inscription, un système de matching, et l'affichage de profils, mais reste centré sur quelques fonctionnalités clés sans nécessiter de comptes utilisateurs complexes

## Essential Features

### Page d'accueil
- **Functionality**: Présente le Club de Tutorat, ses fondateurs, le logo du lycée, et les informations essentielles
- **Purpose**: Créer une première impression professionnelle et orienter les visiteurs vers l'action appropriée
- **Trigger**: Arrivée sur le site
- **Progression**: Chargement de la page → Lecture de la présentation → Visualisation des fondateurs → Clic sur "Devenir tuteur" ou "Se faire tutorer"
- **Success criteria**: Les visiteurs comprennent immédiatement le but du club et peuvent choisir leur parcours en moins de 10 secondes

### Inscription tuteur
- **Functionality**: Formulaire collectant prénom, nom, classe, matières enseignées, moyenne (≥16/20), disponibilités
- **Purpose**: Recruter des tuteurs qualifiés et structurer leurs profils pour le matching
- **Trigger**: Clic sur "Devenir tuteur"
- **Progression**: Clic CTA → Formulaire affiché → Remplissage des champs → Validation moyenne ≥16 → Sélection matières/disponibilités → Soumission → Confirmation
- **Success criteria**: Formulaire validé avec contrainte de moyenne respectée, profil tuteur créé et disponible pour matching

### Inscription tutoré
- **Functionality**: Formulaire pour élèves cherchant de l'aide (coordonnées, matières, disponibilités)
- **Purpose**: Identifier les besoins d'accompagnement et permettre le matching
- **Trigger**: Clic sur "Se faire tutorer"
- **Progression**: Clic CTA → Formulaire affiché → Remplissage coordonnées → Sélection matières/disponibilités → Soumission → Matching automatique → Affichage tuteurs compatibles
- **Success criteria**: Profil tutoré créé, algorithme de matching exécuté, liste de tuteurs compatibles présentée

### Système de matching automatique
- **Functionality**: Associe tuteurs et tutorés selon matières et disponibilités communes
- **Purpose**: Faciliter la mise en relation et optimiser l'organisation du tutorat
- **Trigger**: Soumission du formulaire tutoré
- **Progression**: Soumission → Analyse des matières demandées → Vérification disponibilités → Calcul compatibilité → Tri par pertinence → Affichage résultats
- **Success criteria**: Un tuteur peut être assigné à plusieurs tutorés, les matches affichent les créneaux communs, interface permet de voir les profils compatibles

### Section contact
- **Functionality**: Informations de contact du club et formulaire de message
- **Purpose**: Permettre aux élèves et parents de poser des questions
- **Trigger**: Clic sur lien contact ou scroll vers section dédiée
- **Progression**: Accès section contact → Lecture informations → Envoi message optionnel
- **Success criteria**: Coordonnées du club clairement visibles et formulaire fonctionnel

## Edge Case Handling
- **Aucun tuteur disponible** - Message encourageant à devenir tuteur ou à réessayer plus tard
- **Moyenne insuffisante** - Validation en temps réel avec message constructif expliquant le critère de 16/20
- **Aucune disponibilité commune** - Suggestion de tuteurs avec disponibilités proches ou possibilité d'élargir les créneaux
- **Matières multiples** - Interface permettant sélection multiple intuitive avec tags visuels
- **Données incomplètes** - Validation champ par champ avec indications claires des informations manquantes

## Design Direction
Le design doit évoquer l'excellence académique du Lycée Bonaparte tout en restant accessible et chaleureux pour encourager la participation - un équilibre entre sérieux institutionnel et convivialité estudiantine, avec une interface épurée qui met en avant le contenu et facilite l'action.

## Color Selection
Palette triadic inspirée des couleurs académiques françaises traditionnelles, évoquant le prestige du Lycée Bonaparte avec un bleu profond principal, complémenté par un bordeaux élégant et un or subtil pour les accents.

- **Primary Color**: Bleu marine profond (oklch(0.35 0.08 250)) - Évoque le sérieux académique, la confiance et l'excellence éducative
- **Secondary Colors**: Bordeaux académique (oklch(0.38 0.12 15)) pour les éléments importants et crème ivoire (oklch(0.97 0.01 85)) pour les fonds doux
- **Accent Color**: Or Bonaparte (oklch(0.75 0.15 75)) - Pour les CTA et éléments de prestige, rappelant l'histoire napoléonienne
- **Foreground/Background Pairings**:
  - Background (Ivoire #F9F8F5 oklch(0.97 0.01 85)): Texte bleu marine #2C3E5F (oklch(0.35 0.08 250)) - Ratio 9.5:1 ✓
  - Card (Blanc #FFFFFF oklch(1 0 0)): Texte bleu marine #2C3E5F - Ratio 10.2:1 ✓
  - Primary (Bleu marine #2C3E5F): Texte ivoire #F9F8F5 - Ratio 9.5:1 ✓
  - Secondary (Bordeaux #5D3239 oklch(0.38 0.12 15)): Texte ivoire #F9F8F5 - Ratio 8.8:1 ✓
  - Accent (Or #D4A859 oklch(0.75 0.15 75)): Texte bleu foncé #1A2332 (oklch(0.25 0.08 250)) - Ratio 7.2:1 ✓
  - Muted (Gris clair #E8E6E1 oklch(0.93 0.01 85)): Texte bleu marine #2C3E5F - Ratio 8.1:1 ✓

## Font Selection
Une typographie classique et lisible qui reflète le caractère académique avec Playfair Display pour les titres (élégant, rappelle les institutions d'enseignement historiques) et Inter pour le corps de texte (moderne, lisible, professionnel).

- **Typographic Hierarchy**:
  - H1 (Titre principal): Playfair Display Bold/48px/tight letter spacing/-0.02em - Pour "Club de Tutorat"
  - H2 (Sections): Playfair Display SemiBold/36px/tight letter spacing - Pour "Devenir Tuteur", "Nos Fondateurs"
  - H3 (Sous-sections): Inter SemiBold/24px/normal letter spacing - Pour les catégories de formulaires
  - Body (Texte courant): Inter Regular/16px/1.6 line-height - Pour descriptions et contenus
  - Labels (Formulaires): Inter Medium/14px/normal - Pour les champs de saisie
  - Buttons (CTA): Inter SemiBold/16px/uppercase/0.05em letter spacing - Pour les boutons d'action

## Animations
Les animations doivent renforcer la clarté du parcours utilisateur avec des transitions douces qui guident l'œil sans distraire, créant une sensation de fluidité académique et de professionnalisme.

- **Purposeful Meaning**: Les animations expriment la progression logique (formulaire → soumission → résultats) et la transformation (élève → tuteur/tutoré), avec des mouvements qui évoquent la connexion entre personnes
- **Hierarchy of Movement**: 
  - Primaire: Transitions de page et apparition des résultats de matching (300ms ease-out)
  - Secondaire: Hover des boutons CTA et cartes de profils (200ms)
  - Tertiaire: Validation de champs et micro-feedbacks (150ms)

## Component Selection
- **Components**: 
  - Card (profils tuteurs, présentation fondateurs) - avec ombre subtile et border radius cohérent
  - Button (CTA principaux) - variant primary pour actions principales, outline pour secondaires
  - Form + Input + Label (formulaires inscription) - avec validation inline
  - Select (choix classe, matières) - multi-select pour matières
  - Checkbox (disponibilités horaires) - groupés par jour
  - Badge (matières enseignées/demandées) - variant secondary avec couleurs académiques
  - Alert (messages validation) - pour feedback moyenne insuffisante
  - Separator (sections de page) - pour structurer visuellement
  - Tabs (navigation tuteur/tutoré) - alternative possible aux pages séparées
  - Avatar (photos fondateurs si disponibles) - rond, style académique
  
- **Customizations**: 
  - Carte profil tuteur custom avec layout spécifique (photo, matières, disponibilités, moyenne)
  - Section héro custom avec logo Bonaparte et présentation du club
  - Grille de disponibilités custom (jours × créneaux horaires)
  
- **States**: 
  - Buttons: hover avec légère élévation (shadow-md → shadow-lg), active avec scale(0.98)
  - Inputs: focus avec ring couleur primary, error avec border-destructive
  - Cards: hover avec subtle translate-y et shadow enhancement pour profils cliquables
  
- **Icon Selection**: 
  - GraduationCap (tuteurs, excellence académique)
  - BookOpen (matières, apprentissage)
  - Calendar (disponibilités)
  - Users (section matching/communauté)
  - CheckCircle (validation, succès)
  - Plus (ajouter matière/disponibilité)
  - Envelope (contact)
  
- **Spacing**: 
  - Container padding: px-6 md:px-12
  - Section gaps: gap-16 (sections principales) / gap-8 (sous-sections)
  - Card padding: p-6
  - Form fields: gap-4
  - Grid layouts: gap-6 pour cartes de profils
  
- **Mobile**: 
  - Navigation: burger menu avec drawer pour accès sections
  - Formulaires: inputs full-width, labels au-dessus
  - Grille profils: 1 colonne mobile → 2 col tablet → 3 col desktop
  - Hero: stack vertical avec CTA full-width sur mobile
  - Disponibilités: scroll horizontal sur grille jours/heures si nécessaire
