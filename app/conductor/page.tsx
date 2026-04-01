"use client"

import { getBuses, savedBuses } from "@/lib/busStorage"
import { useEffect, useState } from "react"

export default function ConductorPage() {
    const [name, setName] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [price, setPrice] = useState("")
    const [seats, setSeats] = useState("")
    const [buslist, setBuslist] = useState<any[]>([])

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

        const updated = [...existing, newBus]
        savedBuses(updated)

        alert("Bus add sucessfully👍")

        setName(""),
            setFrom(""),
            setTo(""),
            setPrice(""),
            setSeats("")
    }

    useEffect(() => {
        const data = getBuses()
        setBuslist(data)
    }, [])


    const handleDelete = (id: number) => {
        const updated = buslist.filter((bus) => bus.id !== id)
        setBuslist(updated)
        savedBuses(updated)
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

            <h2>All buses</h2>

            {buslist.length === 0 ? (
                <p>No available buses</p>
            ) : (
                buslist.map((bus) =>
                    <div key={bus.id}>
                        <p>{bus.name}</p>
                        <p>{bus.from} → {bus.to}</p>
                        <p>₹{bus.price}</p>
                        <p>Seats: {bus.seats}</p>
                    </div>
                )
            )}
        </div>
    )
}