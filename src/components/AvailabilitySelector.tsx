import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { DAYS, TIME_SLOTS } from '@/lib/matching'
import { TimeSlot } from '@/lib/types'
import { cn } from '@/lib/utils'

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
  const isSlotSelected = (day: string, time: string) => {
    return selectedSlots.some(s => s.day === day && s.time === time)
  }

  return (
    <div className={cn("space-y-3", className)}>
      <Label>Disponibilités * (sélectionnez vos créneaux)</Label>
      
      <div className="overflow-x-auto rounded-lg border border-border">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-px bg-border">
            <div className="bg-muted p-3 font-semibold text-sm sticky left-0 z-10"></div>
            {DAYS.map(day => (
              <div key={day} className="bg-muted p-3 text-center font-semibold text-sm">
                {day.substring(0, 3)}
              </div>
            ))}
          </div>

          {TIME_SLOTS.map(time => (
            <div key={time} className="grid grid-cols-8 gap-px bg-border">
              <div className="bg-background p-3 font-medium text-sm sticky left-0 z-10 border-r border-border">
                {time}
              </div>
              {DAYS.map(day => {
                const selected = isSlotSelected(day, time)
                return (
                  <div 
                    key={`${day}-${time}`} 
                    className={cn(
                      "bg-background p-3 flex items-center justify-center cursor-pointer transition-colors hover:bg-accent/50",
                      selected && "bg-primary/10 hover:bg-primary/20"
                    )}
                    onClick={() => onToggleSlot(day, time)}
                  >
                    <Checkbox
                      checked={selected}
                      onCheckedChange={() => {}}
                      className="pointer-events-none"
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedSlots.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedSlots.length} créneau{selectedSlots.length > 1 ? 'x' : ''} sélectionné{selectedSlots.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
