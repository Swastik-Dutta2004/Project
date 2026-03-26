"use client"

import { useState } from "react"
import buses from "@/public/buses.json"
import { useRouter } from "next/router"

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

  const Router = useRouter()

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


  const sortedBuses = [...(buses as Bus[])].sort((a, b) => {
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

  const filterBuses = searchedResult ? sortedBuses.filter((bus) => {
    return (
      bus.from.toLowerCase() === from.toLowerCase() &&
      bus.to.toLowerCase() === to.toLowerCase()
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

const HandleBooking = (bus:Bus) => {
  if (bus.seats === 0) {
    alert("No seats are available right now.")
    return;
  }

  if (passengers > bus.seats) {
    alert("Not enough are available.")
    return;
  }

  const totalPrice = bus.price * passengers

  Router.push(`/ticket ? 
    busId = ${bus.id} 
    busTo = ${to}
    busfrom = ${from}
    busDate = ${date}
    busPassengers = ${passengers}
    busTotalPrice = ${totalPrice}
  `)
}

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
          {filterBuses.length === 0 ? (
            <p>No buses found </p>
          ) : filterBuses.map((bus) => (
            <div key={bus.id}>
              <p>{bus.name}</p>
              <p>{bus.price}</p>
            </div>
          ))
          }
        </div>
      )}
    </div>
  )
}