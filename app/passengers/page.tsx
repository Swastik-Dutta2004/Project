"use client"

import { useState } from "react"
import buses from "@/public/buses.json"

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
  to: string   // add this
  // remove: from, to
}

export default function HeroSection() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [searchedResult, setSearchedResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("price");
  const [sortDir, setSortDir] = useState("asc")

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


  const sortedBuses = [...(buses as Bus[])].sort((a, b) => {
    let diff = 0;

    if (sortBy === "price") diff = a.price - b.price;
    if (sortBy === "rating") diff = a.rating - b.rating;
    if (sortBy === "seats") diff = a.seats - b.seats;
    if (sortBy === "departure") diff = a.departure.localeCompare(b.departure);

    return sortDir === "asc" ? diff : -diff;
  });

  const filterBuses = sortedBuses.filter((bus) => {
    bus.from.toLowerCase() === from.toLowerCase() &&
      bus.to.toLowerCase() === to.toLowerCase()
  })


  return (
    <div>
      <input placeholder="From" onChange={(e) => setFrom(e.target.value)} />
      <input placeholder="To" onChange={(e) => setTo(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <button onClick={handleSearch}>
        Search Buses
      </button>

      <p>{error}</p>

      {searchedResult && (
        <div>
          <h2>Available Buses</h2>
          {filterBuses.map((bus) => (
            <div key={bus.id}>
              <p>{bus.name}</p>
              <p>{bus.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}