import { Tutor, Tutee, Match, TimeSlot, Subject } from './types'

export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
export const TIME_SLOTS = ['12h-14h', '17h-18h', '18h-19h']

export const SUBJECTS = [
  'Mathématiques',
  'Physique-Chimie',
  'SVT',
  'Français',
  'Philosophie',
  'Histoire-Géographie',
  'Anglais',
  'Espagnol',
  'Allemand',
  'SES',
  'NSI',
  'SI'
]

export const CLASSES = [
  'Seconde',
  'Première',
  'Terminale'
]

export function areSlotsEqual(slot1: TimeSlot, slot2: TimeSlot): boolean {
  return slot1.day === slot2.day && slot1.time === slot2.time
}

export function findCommonSlots(slots1: TimeSlot[], slots2: TimeSlot[]): TimeSlot[] {
  return slots1.filter(slot1 => 
    slots2.some(slot2 => areSlotsEqual(slot1, slot2))
  )
}

export function findCommonSubjects(subjects1: Subject[], subjects2: Subject[]): Subject[] {
  return subjects1.filter(subject => subjects2.includes(subject))
}

export function calculateCompatibility(tutor: Tutor, tutee: Tutee): number {
  const commonSubjects = findCommonSubjects(tutor.subjects, tutee.subjects)
  const commonSlots = findCommonSlots(tutor.availability, tutee.availability)
  
  if (commonSubjects.length === 0 || commonSlots.length === 0) {
    return 0
  }
  
  const subjectScore = commonSubjects.length * 10
  const slotScore = commonSlots.length * 5
  const averageBonus = tutor.average >= 18 ? 5 : 0
  
  return subjectScore + slotScore + averageBonus
}

export function findMatches(tutee: Tutee, tutors: Tutor[]): Match[] {
  const matches: Match[] = []
  
  for (const tutor of tutors) {
    const commonSubjects = findCommonSubjects(tutor.subjects, tutee.subjects)
    const commonSlots = findCommonSlots(tutor.availability, tutee.availability)
    
    if (commonSubjects.length > 0 && commonSlots.length > 0) {
      matches.push({
        tutor,
        commonSubjects,
        commonSlots,
        compatibilityScore: calculateCompatibility(tutor, tutee)
      })
    }
  }
  
  return matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore)
}
