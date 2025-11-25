import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DAYS, TIME_SLOTS } from '@/lib/matching'
import { TimeSlot } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Plus, X } from '@phosphor-icons/react'

type AvailabilitySelectorProps = {
  selectedSlots: TimeSlot[]
  onToggleSlot: (day: string, time: string) => void
  className?: string
}

export default function AvailabilitySelector({ 
  selectedSlots, 
  onToggleSlot,
  className 
}: AvailabilitySelectorProps) {
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const handleAddSlot = () => {
    if (selectedDay && selectedTime) {
      const exists = selectedSlots.some(s => s.day === selectedDay && s.time === selectedTime)
      if (!exists) {
        onToggleSlot(selectedDay, selectedTime)
      }
      setSelectedDay('')
      setSelectedTime('')
    }
  }

  const handleRemoveSlot = (day: string, time: string) => {
    onToggleSlot(day, time)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Label>Disponibilités * (ajoutez vos créneaux)</Label>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 space-y-2">
          <Label htmlFor="day-select" className="text-xs text-muted-foreground">Jour</Label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Sélectionner un jour...</option>
            {DAYS.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor="time-select" className="text-xs text-muted-foreground">Heure</Label>
          <select
            id="time-select"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Sélectionner une heure...</option>
            {TIME_SLOTS.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="sm:pt-7">
          <Button
            type="button"
            onClick={handleAddSlot}
            disabled={!selectedDay || !selectedTime}
            className="w-full sm:w-auto"
          >
            <Plus size={20} weight="bold" />
            Ajouter
          </Button>
        </div>
      </div>

      {selectedSlots.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {selectedSlots.length} créneau{selectedSlots.length > 1 ? 'x' : ''} sélectionné{selectedSlots.length > 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSlots.map((slot, index) => (
              <Badge
                key={`${slot.day}-${slot.time}-${index}`}
                variant="secondary"
                className="pl-3 pr-2 py-2 gap-2"
              >
                <span>{slot.day} {slot.time}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(slot.day, slot.time)}
                  className="hover:bg-muted-foreground/20 rounded-sm transition-colors"
                >
                  <X size={14} weight="bold" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
