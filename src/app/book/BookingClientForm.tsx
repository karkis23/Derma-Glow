'use client'

import { useState, useTransition, useRef } from 'react'
import { createAppointment } from './actions'
import { Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'

interface Service {
  id: string
  name: string
  duration_minutes: number
  price: number
}

interface BookedSlot {
  date: string
  time: string
}

// Generate next 14 days for the calendar selection
const generateDates = () => {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    // skip sundays (0)
    if (d.getDay() !== 0) {
      dates.push(d)
    }
  }
  return dates
}

// Generate time slots 9 AM to 4 PM
const generateTimeSlots = () => {
  const slots = []
  for (let h = 9; h <= 16; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`)
    slots.push(`${h.toString().padStart(2, '0')}:30`)
  }
  return slots
}

export default function BookingClientForm({ services, bookedSlots }: { services: Service[], bookedSlots: BookedSlot[] }) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [visitType, setVisitType] = useState<'in_person' | 'teleconsultation'>('in_person')
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  const availableDates = generateDates()
  const availableSlots = generateTimeSlots()

  const handleNext = () => {
    if (step === 1 && !selectedService) {
      setErrorMsg('Please select a service before proceeding.')
      return
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      setErrorMsg('Please select both a date and a time.')
      return
    }
    setErrorMsg('')
    setStep(step + 1)
  }

  const handleBack = () => setStep(step - 1)

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!formRef.current) return
    
    // Explicitly grab form data and run server action ONLY when explicitly called
    const formData = new FormData(formRef.current)
    startTransition(async () => {
      const res = await createAppointment(formData)
      if (res?.error) setErrorMsg(res.error)
    })
  }

  return (
    <form 
      ref={formRef} 
      className="space-y-6 text-charcoal"
      onSubmit={(e) => {
         // Block all automatic form submissions! e.g., hitting ENTER in an input field.
         // We will only manually submit when the user forcefully clicks the "Confirm" button.
         e.preventDefault()
      }}
    >
      
      {/* STEPS INDICATOR */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= num ? 'bg-teal text-white shadow-md' : 'bg-gray-200 text-gray-400'
            }`}>
              {step > num ? <CheckCircle2 size={16} /> : num}
            </div>
            {num < 3 && (
              <div className={`w-16 h-1 flex-1 ${step > num ? 'bg-teal' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
           {errorMsg}
        </div>
      )}

      {/* STEP 1: SERVICE */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-2xl font-serif text-charcoal mb-6">What brings you in?</h2>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
            {services.map(service => (
              <label 
                key={service.id}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedService === service.id 
                    ? 'border-teal bg-teal/5 shadow-sm' 
                    : 'border-white/50 bg-white/30 hover:bg-white/60 hover:border-teal/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="mt-1">
                    <input 
                      type="radio" 
                      name="validate_service_id" 
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={() => setSelectedService(service.id)}
                      className="w-4 h-4 text-teal focus:ring-teal border-gray-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Clock size={14} /> {service.duration_minutes} minutes
                    </p>
                  </div>
                </div>
                <div className="font-medium text-lg">
                  ₹{service.price}
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: DATE & TIME */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
           <h2 className="text-2xl font-serif text-charcoal mb-6">Select a Date & Time</h2>
           
           <div className="mb-8">
             <label className="block text-sm font-medium mb-3">Available Dates</label>
             <div className="flex gap-3 overflow-x-auto pb-4 snap-x custom-scrollbar">
                {availableDates.map(d => {
                  const dateStr = d.toISOString().split('T')[0]
                  const isSelected = selectedDate === dateStr
                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => setSelectedDate(dateStr)}
                      className={`flex-shrink-0 w-20 flex flex-col items-center justify-center p-3 rounded-2xl border-2 snap-start transition-all ${
                        isSelected ? 'border-teal bg-teal text-white shadow-md shadow-teal/20' : 'border-white bg-white/50 hover:border-teal/50'
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="text-2xl font-bold font-serif my-1">{d.getDate()}</span>
                      <span className="text-xs">{d.toLocaleDateString('en-US', { month: 'short' })}</span>
                    </button>
                  )
                })}
             </div>
           </div>

           {selectedDate && (
             <div className="animate-in fade-in slide-in-from-bottom-2">
               <label className="block text-sm font-medium mb-3">Morning & Afternoon Slots</label>
               <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                 {availableSlots.map(time => {
                   const isSelected = selectedTime === time
                   // Check if time is already booked for this specific date
                   const isBooked = bookedSlots.some(s => s.date === selectedDate && s.time.slice(0, 5) === time)
                   
                   return (
                     <button
                       key={time}
                       type="button"
                       disabled={isBooked}
                       onClick={() => setSelectedTime(time)}
                       className={`py-2 px-1 text-sm rounded-xl font-medium border transition-all ${
                         isBooked ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50 line-through' :
                         isSelected ? 'bg-charcoal text-white border-charcoal shadow-md' : 'bg-white/60 border-white hover:border-charcoal/30 text-charcoal'
                       }`}
                     >
                       {time}
                     </button>
                   )
                 })}
               </div>
             </div>
           )}
        </div>
      )}

      {/* STEP 3: DETAILS */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
           <h2 className="text-2xl font-serif text-charcoal mb-6">Final Details</h2>

           <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Visit Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex flex-col items-center p-4 border-2 rounded-2xl cursor-pointer transition-colors ${visitType === 'in_person' ? 'border-teal bg-teal/5' : 'border-white/50 bg-white/30 hover:border-teal/30'}`}>
                    <input type="radio" value="in_person" checked={visitType === 'in_person'} onChange={() => setVisitType('in_person')} className="sr-only" />
                    <span className="font-semibold">In-Clinic</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">New York Office</span>
                  </label>
                  <label className={`flex flex-col items-center p-4 border-2 rounded-2xl cursor-pointer transition-colors ${visitType === 'teleconsultation' ? 'border-teal bg-teal/5' : 'border-white/50 bg-white/30 hover:border-teal/30'}`}>
                    <input type="radio" value="teleconsultation" checked={visitType === 'teleconsultation'} onChange={() => setVisitType('teleconsultation')} className="sr-only" />
                    <span className="font-semibold">Telehealth</span>
                    <span className="text-xs text-gray-500 mt-1 text-center">Video Call</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">Additional Notes (Optional)</label>
                <p className="text-xs text-gray-500 mb-2">Let us know if you have specific skin concerns or allergies.</p>
                <textarea 
                  id="notes" 
                  name="notes" 
                  rows={4}
                  className="w-full rounded-2xl border-none outline-none ring-1 ring-charcoal/20 focus:ring-2 focus:ring-teal bg-white/50 backdrop-blur-sm p-4 resize-none"
                  placeholder="I've been experiencing breakouts on my chin..."
                ></textarea>
              </div>

              <div className="bg-rose-gold/10 p-5 rounded-2xl border border-rose-gold/20 flex flex-col gap-2">
                 <h4 className="font-serif text-lg text-charcoal">Summary</h4>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-600">Treatment:</span>
                   <span className="font-semibold truncate max-w-[200px] text-right">{services.find(s => s.id === selectedService)?.name}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-600">When:</span>
                   <span className="font-semibold">{new Date(selectedDate).toLocaleDateString()} at {selectedTime}</span>
                 </div>
              </div>
           </div>
        </div>
      )}
      
      {/* Hidden inputs to guarantee data passes correctly during manual JS submit */}
      <input type="hidden" name="service_id" value={selectedService} />
      <input type="hidden" name="date" value={selectedDate} />
      <input type="hidden" name="time" value={selectedTime} />
      <input type="hidden" name="type" value={visitType} />

      {/* NAVIGATION BUTTONS */}
      <div className="flex justify-between mt-10 pt-6 border-t border-charcoal/10">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            disabled={isPending}
            className="px-6 py-3 rounded-xl font-medium text-charcoal hover:bg-white/50 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <ArrowLeft size={18} /> Back
          </button>
        ) : <div></div>}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="bg-teal hover:bg-teal-light text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Continue <ArrowRight size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isPending}
            className="bg-charcoal hover:bg-black text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70"
          >
            {isPending ? 'Booking...' : 'Confirm Reservation'} <CheckCircle2 size={18} />
          </button>
        )}
      </div>
    </form>
  )
}
