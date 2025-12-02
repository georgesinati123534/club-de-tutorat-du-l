export type TimeSlot = {
  day: string
  time: string
}

export type Subject = string

export type Tutor = {
  id: string
  firstName: string
  lastName: string
  class: string
  subjects: Subject[]
  availability: TimeSlot[]
  phoneNumber?: string
  email?: string
  password: string
  preferredContact?: 'email' | 'whatsapp'
  createdAt: number
}

export type Tutee = {
  id: string
  firstName: string
  lastName: string
  class: string
  email: string
  subjects: Subject[]
  availability: TimeSlot[]
  createdAt: number
}

export type Match = {
  tutor: Tutor
  commonSubjects: Subject[]
  commonSlots: TimeSlot[]
  compatibilityScore: number
}
