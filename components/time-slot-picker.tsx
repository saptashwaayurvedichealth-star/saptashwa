'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface TimeSlotPickerProps {
  selectedDate: string
  selectedTime: string
  onTimeSelect: (time: string) => void
}

export default function TimeSlotPicker({ selectedDate, selectedTime, onTimeSelect }: TimeSlotPickerProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)

  // Generate time slots from 9:00 AM to 6:00 PM (30 min intervals)
  const generateTimeSlots = (): string[] => {
    const slots: string[] = []
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        slots.push(timeString)
      }
    }
    return slots
  }

  useEffect(() => {
    if (selectedDate) {
      checkAvailability()
    }
  }, [selectedDate])

  const checkAvailability = async () => {
    if (!selectedDate) return

    setLoading(true)
    try {
      const res = await fetch(`/api/appointments/availability?date=${selectedDate}`)
      const data = await res.json()
      
      const bookedTimes = data.bookedTimes || []
      const allSlots = generateTimeSlots()
      
      const slotsWithAvailability = allSlots.map(time => ({
        time,
        available: !bookedTimes.includes(time)
      }))
      
      setTimeSlots(slotsWithAvailability)
    } catch (error) {
      console.error('Failed to check availability:', error)
      // If error, show all slots as available
      const allSlots = generateTimeSlots()
      setTimeSlots(allSlots.map(time => ({ time, available: true })))
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number)
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
  }

  if (!selectedDate) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="mx-auto mb-2" size={32} />
        <p className="text-sm">Please select a date first</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">Checking availability...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">Available Time Slots</h4>
        <span className="text-xs text-gray-500">
          {timeSlots.filter(s => s.available).length} slots available
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1">
        {timeSlots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            onClick={() => slot.available && onTimeSelect(slot.time)}
            disabled={!slot.available}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedTime === slot.time
                ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                : slot.available
                ? 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
              }
            `}
          >
            <div className="flex items-center justify-center gap-1">
              {selectedTime === slot.time && <CheckCircle size={14} />}
              <span>{formatTime(slot.time)}</span>
            </div>
            {!slot.available && (
              <div className="text-xs mt-0.5">Booked</div>
            )}
          </button>
        ))}
      </div>
      {timeSlots.filter(s => s.available).length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No available slots for this date</p>
          <p className="text-xs mt-1">Please select another date</p>
        </div>
      )}
    </div>
  )
}
