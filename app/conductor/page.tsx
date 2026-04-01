"use client"

import { getBuses, savedBuses } from "@/lib/busStorage"
import { useState } from "react"

export default function ConductorPage() {
    const [name, setName] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [price, setPrice] = useState("")
    const [seats, setSeats] = useState("")

    const handleAddBus = () => {
        const existing = getBuses()

        const newBus = {
            id: Date.now(),
            name,
            from,
            to,
            type: "AC seated",
            departure: "08:00 AM",
            arrival: "04:00 PM",
            duration: "8h",
            seats: Number(seats),
            price: Number(price),
            rating: 4,
            amenities: []
        }

        const update = [...existing, newBus]
        savedBuses(update)

        alert("Bus add sucessfully👍")

        setName(""),
        setFrom(""),
        setTo(""),
        setPrice(""),
        setSeats("")
    }

    return (
        <div>
            <h1>Conductor Dashboard</h1>

            <input placeholder="Bus Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
            <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
            <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input placeholder="Seats" value={seats} onChange={(e) => setSeats(e.target.value)} />

            <button onClick={handleAddBus}>
                Add Bus
            </button>
        </div>
    )
}