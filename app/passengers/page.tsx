"use client"

import { useState } from "react"
import buses from "@/public/buses.json"
import { useRouter } from "next/navigation"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// Interface definitions kept for type safety
interface SearchResult {
  from: string
  to: string
  passengers: number
  date: string
}

interface Bus {
  id: number
  name: string
  type: string
  departure: string
  arrival: string
  duration: string
  seats: number
  price: number
  rating: number
  amenities: string[]
  from: string
  to: string
}

export default function HeroSection() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [searchedResult, setSearchedResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = () => {
    if (!from || !to || !date) {
      setError("Please fill all the fields")
      return
    }
    if (from === to) {
      setError("Origin and destination cannot be the same")
      return
    }
    setError("")
    setSearchedResult({ from, to, passengers, date })
  }

  const busData = buses as { buses: Bus[] }
  const allCities = Array.from(new Set([...busData.buses.map((bus) => bus.from), ...busData.buses.map((bus) => bus.to)]))

  const filteredBuses = searchedResult ? busData.buses.filter((bus) => {
    return (
      bus.from?.toLowerCase() === from.toLowerCase() &&
      bus.to?.toLowerCase() === to.toLowerCase()
    )
  }) : []

  const HandleBooking = (bus: Bus) => {
    if (bus.seats === 0) {
      alert("No seats are available right now.")
      return
    }
    if (passengers > bus.seats) {
      alert("Not enough seats available.")
      return
    }
    const totalPrice = bus.price * passengers
    router.push(`/passengers/myticket?busId=${bus.id}&from=${from}&to=${to}&date=${date}&passengers=${passengers}&price=${totalPrice}`)
  }

  return (
    <div className="bg-background min-h-screen font-sans">
      
      {/* --- HERO & SEARCH PANEL --- */}
      <section className="relative bg-primary pt-20 pb-32 px-6 md:px-12 overflow-hidden">
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground tracking-tighter mb-4 uppercase">
            Your Gateway to <span className="opacity-80">Kolkata</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Book local buses, explore heritage routes, and track your journey in real-time.
          </p>
        </div>

        {/* SEARCH CARD */}
        <div className="relative z-20 max-w-5xl mx-auto bg-card p-4 md:p-6 rounded-3xl shadow-2xl border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* FROM */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">From</label>
              <select 
                className="w-full bg-secondary/50 border border-transparent focus:border-primary rounded-2xl px-4 py-3.5 text-sm font-bold outline-none transition-all appearance-none"
                value={from} onChange={(e) => setFrom(e.target.value)}
              >
                <option value="">Select Origin</option>
                {allCities.map((city) => <option value={city} key={city}>{city}</option>)}
              </select>
            </div>

            {/* TO */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">To</label>
              <select 
                className="w-full bg-secondary/50 border border-transparent focus:border-primary rounded-2xl px-4 py-3.5 text-sm font-bold outline-none transition-all appearance-none"
                value={to} onChange={(e) => setTo(e.target.value)}
              >
                <option value="">Select Destination</option>
                {allCities.filter((city) => city !== from).map((city) => <option value={city} key={city}>{city}</option>)}
              </select>
            </div>

            {/* DATE & PASSENGERS (Combined for desktop) */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-secondary/50 border border-transparent focus:border-primary rounded-2xl px-3 py-3.5 text-sm font-bold outline-none"
                  value={date} onChange={(e) => setDate(e.target.value)} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">Seats</label>
                <input 
                  type="number" min="1" 
                  className="w-full bg-secondary/50 border border-transparent focus:border-primary rounded-2xl px-3 py-3.5 text-sm font-bold outline-none"
                  value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}
                />
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <div className="flex items-end">
              <button 
                onClick={handleSearch} 
                className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-tighter"
              >
                Search Buses
              </button>
            </div>
          </div>
          {error && <p className="text-destructive text-[11px] font-bold mt-3 ml-2 uppercase tracking-tight">{error}</p>}
        </div>
      </section>

      {/* --- RESULTS SECTION --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-12 pb-20 relative z-30">
        {searchedResult && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-background p-4 rounded-2xl border border-border shadow-sm">
               <h2 className="text-xl font-black tracking-tighter">AVAILABLE BUSES</h2>
               <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full uppercase">
                 {filteredBuses.length} Results found
               </span>
            </div>

            {filteredBuses.length > 0 ? (
              <div className="grid gap-4">
                {filteredBuses.map((bus) => (
                  <div key={bus.id} className="group bg-card border border-border p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-5 w-full md:w-auto">
                      <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {bus.id}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-none mb-1">{bus.name}</h3>
                        <div className="flex gap-2">
                           <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{bus.type}</span>
                           <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{bus.seats} Seats Left</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto md:gap-12 mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-border">
                      <div className="text-left md:text-right">
                        <p className="text-2xl font-black text-foreground leading-none">₹{bus.price}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Per Ticket</p>
                      </div>
                      <button 
                        onClick={() => HandleBooking(bus)}
                        className="bg-foreground text-background px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border-2 border-dashed border-border p-16 rounded-3xl text-center">
                <p className="text-muted-foreground font-bold italic">No buses currently operating on this route.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}