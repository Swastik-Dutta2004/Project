"use client"

import { useState } from "react"
import busdata from "@/public/buses.json"

interface SearchResult {
  from: string
  to: string
  passengers: number
  date: string
}

export default function HeroSection(){
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [searchedResult, setSearchedResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("price");
  const [sortDir, setSortDir] = useState("asc")

  const handleSearch = () =>{
    if(!from || !to || !date){
      setError("Fill all the fields")
      return
    }

    if(from == to){
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

  const sortData = [...busdata].sort((a,b) => {
    let diff = 0;
    if (sortBy === "price") diff = a.price - b.price; 
    if (sortBy === "rating ") diff = a.rating - b.rating; 
    if (sortBy === "seats") diff = a.seats - b.seats; 
    if (sortBy === "departure") diff = a.departure.localeCompare(b.departure); 

    return sortDir === "asc" ? diff : -diff;  
    
  })
}