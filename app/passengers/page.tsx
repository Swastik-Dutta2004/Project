"use client"

import { useState } from "react"
import buses from "@/public/buses.json"
import { useRouter } from "next/navigation"
import { Bus, Mouse } from "lucide-react"

interface SearchResult {
  from: string
  to: string
  passengers: number
  date: string
}

interface Bus {
  id: number
  name: string
  type: string          // add this
  departure: string
  arrival: string       // add this
  duration: string      // add this
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

  const handleSearch = () => {
    if (!from || !to || !date) {
      setError("Fill all the fields")
      return
    }

    if (from == to) {
      setError("Same city not allowed")
      return
    }

    setError("");

    setSearchedResult({
      from,
      to,
      passengers,
      date
    })
  }

  type SortKey = "price" | "rating" | "seats" | "departure"

  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");


  const sortedBuses = [...(buses.buses as Bus[])].sort((a, b) => {
    let diff = 0;

    switch (sortBy) {
      case "price":
        diff = a.price - b.price
        break
      case "rating":
        diff = a.rating - b.rating
        break
      case "seats":
        diff = a.seats - b.seats
        break
      case "departure":
        diff = a.departure.localeCompare(b.departure)
        break
    }

    return sortDir === "asc" ? diff : -diff;
  });

  const filteredBuses = searchedResult ? sortedBuses.filter((bus) => {
    return (
      bus.from?.toLowerCase() === from.toLowerCase() &&
      bus.to?.toLowerCase() === to.toLowerCase()
    )
  }) : []

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortBy(key)
      setSortDir("asc")
    }
  }

  const router = useRouter()

  const HandleBooking = (bus: Bus) => {
    if (bus.seats === 0) {
      alert("No seats are available right now.")
      return
    }

    if (passengers > bus.seats) {
      alert("Not enough are available.")
      return
    }

    const totalPrice = bus.price * passengers

    router.push(
      `/passengers/myticket?busId=${bus.id}&from=${from}&to=${to}&date=${date}&passengers=${passengers}&price=${totalPrice}`
    )
  }

  const busData = buses as { buses: Bus[] }
  const allCities = Array.from(
    new Set([
      ...busData.buses.map((bus) => bus.from),
      ...busData.buses.map((bus) => bus.to)
    ])
  )

  return (
    <div>
      <select onChange={(e) => setFrom(e.target.value)}>
        <option value="">Selet From</option>
        {allCities.map((city) => (
          <option value={city} key={city}>
            {city}
          </option>
        ))}
      </select>

      <select onChange={(e) => setTo(e.target.value)}>
        <option value="">Select To</option>
        {allCities.filter((city) => city !== from).map((city) => (
          <option value="city" key={city}>
            {city}
          </option>
        ))}
      </select>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" min="1" value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} placeholder="passengers Numbers" />

      <p>{error}</p>
      {searchedResult && filteredBuses.length === 0 && (
        <p>No bus found</p>
      )}

      {searchedResult && filteredBuses.length > 0 && (
        <div>
          <h2>Available buses</h2>
          {filteredBuses.map((bus) => (
            <div key={bus.id}>
              <p>{bus.name}</p>
              <p>{bus.price}</p>

              <button onClick={handleSearch} className="hover:Mouse=pointer">
                Search Buses
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}