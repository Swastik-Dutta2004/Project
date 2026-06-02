"use client"

import { getBuses, savedBuses } from "@/lib/busStorage"
import { useEffect, useState } from "react"
import { Plus, Trash2, Bus, MapPin, Users, ArrowUpRight } from "lucide-react"

interface BusEntry {
    id: number
    name: string
    from: string
    to: string
    price: number
    seats: number
}

export default function ConductorPage() {
    const [name, setName] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [price, setPrice] = useState("")
    const [seats, setSeats] = useState("")
    const [buslist, setBuslist] = useState<BusEntry[]>([])

    const refreshList = () => {
        const data = getBuses()
        setBuslist(data as BusEntry[])
    }

    const handleAddBus = () => {
        if (!name || !from || !to || !price || !seats) {
            alert("Please fill all fields")
            return
        }

        const existing = getBuses() as BusEntry[]
        const newBus: BusEntry = {
            id: Date.now(),
            name,
            from,
            to,
            price: Number(price),
            seats: Number(seats),
        }

        const updated = [...existing, newBus]
        savedBuses(updated as unknown as Parameters<typeof savedBuses>[0])
        refreshList()
        alert("Bus added successfully.")
        setName("")
        setFrom("")
        setTo("")
        setPrice("")
        setSeats("")
    }

    useEffect(() => {
        const data = getBuses() as BusEntry[]
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBuslist(data)
    }, [])

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to remove this bus?")) {
            const currentBuses = getBuses() as BusEntry[]
            const updated = currentBuses.filter((bus) => bus.id !== id)
            savedBuses(updated as unknown as Parameters<typeof savedBuses>[0])
            setBuslist(updated)
        }
    }

    const totalRevenue = buslist.reduce((sum, b) => sum + (b.price * (40 - b.seats) || 0), 0)
    const totalSeats = buslist.reduce((sum, b) => sum + (b.seats || 0), 0)

    return (
        <div className="min-h-screen pb-20">
            {/* Editorial header */}
            <section className="border-b border-ink/15 bg-paper">
                <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
                    <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <span className="route-num text-2xl text-tram">№ 06</span>
                            <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                                Control Room
                            </span>
                        </div>
                        <span className="stamp text-tram border-tram">Admin</span>
                    </div>

                    <h1 className="display text-5xl md:text-7xl lg:text-[120px] leading-[0.92] tracking-tight text-ink max-w-5xl">
                        Conductor&apos;s <br />
                        <span className="italic font-light text-muted-foreground">dispatch desk.</span>
                    </h1>

                    {/* Stats strip */}
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 border-y border-ink/80 divide-x divide-ink/15">
                        {[
                            { num: buslist.length.toString().padStart(2, "0"), label: "Active fleet" },
                            { num: totalSeats.toString().padStart(3, "0"), label: "Seats available" },
                            { num: `₹${(totalRevenue / 1000).toFixed(1)}k`, label: "Revenue (today)" },
                            { num: "98.2%", label: "On-time rate" },
                        ].map((s, i) => (
                            <div key={i} className="px-4 py-5 md:px-6 md:py-7">
                                <div className="route-num text-3xl md:text-5xl leading-none">{s.num}</div>
                                <div className="mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-2">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ── LEFT: Add Bus Form ──────────────────────── */}
                <div className="lg:col-span-5">
                    <div className="sticky top-32">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="route-num text-2xl text-tram">F·02</span>
                            <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                                New entry
                            </span>
                        </div>
                        <h2 className="display text-3xl md:text-4xl leading-tight tracking-tight mb-6 text-ink">
                            Register a <br />
                            <span className="italic font-light text-muted-foreground">new bus.</span>
                        </h2>

                        <div className="bg-card border border-border rounded-2xl p-6 md:p-7 space-y-5">
                            <div>
                                <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                                    Bus name
                                </label>
                                <input
                                    className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-2.5 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
                                    placeholder="e.g. Royal Cruiser"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                                        From
                                    </label>
                                    <input
                                        className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-2.5 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
                                        placeholder="Origin"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                                        To
                                    </label>
                                    <input
                                        className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-2.5 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
                                        placeholder="Destination"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                                        Fare (₹)
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-2.5 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
                                        placeholder="0.00"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mono text-[10px] tracking-widest uppercase text-muted-foreground ml-1 block mb-2">
                                        Seats
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full bg-transparent border-b-2 border-ink/20 focus:border-ink rounded-none px-1 py-2.5 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/50"
                                        placeholder="40"
                                        value={seats}
                                        onChange={(e) => setSeats(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleAddBus}
                                className="group w-full bg-ink text-paper py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-tram hover:text-ink transition-colors duration-300 mt-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add to fleet
                                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                            </button>
                        </div>

                        <p className="mono text-[10px] tracking-widest uppercase text-muted-foreground mt-4 text-center">
                            All entries are KYC-verified within 24 hours
                        </p>
                    </div>
                </div>

                {/* ── RIGHT: Active Fleet ────────────────────── */}
                <div className="lg:col-span-7">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="route-num text-2xl text-tram">F·03</span>
                                <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                                    Active fleet
                                </span>
                            </div>
                            <h2 className="display text-3xl md:text-4xl leading-tight tracking-tight text-ink">
                                {buslist.length} bus{buslist.length !== 1 && "es"} on duty
                            </h2>
                        </div>
                    </div>

                    {buslist.length === 0 ? (
                        <div className="border-2 border-dashed border-border rounded-3xl p-20 text-center bg-card">
                            <Bus className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                            <p className="display text-2xl text-ink mb-2">Empty depot.</p>
                            <p className="text-muted-foreground text-sm">
                                Register your first bus to start the route.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {buslist.map((bus, i) => (
                                <article
                                    key={bus.id}
                                    className="group bg-card border border-border rounded-2xl p-5 md:p-6 hover:border-ink hover:shadow-lg transition-all grid grid-cols-12 items-center gap-4"
                                >
                                    <div className="col-span-2 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-xl bg-ink text-paper grid place-items-center group-hover:bg-tram group-hover:text-ink transition-colors">
                                            <Bus className="w-7 h-7" />
                                        </div>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="route-num text-2xl text-tram">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="display text-xl text-ink leading-tight">
                                                {bus.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3 mono text-[10px] tracking-widest uppercase text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {bus.from} → {bus.to}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {bus.seats} seats
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-span-3 text-right border-l border-border pl-4 hidden md:block">
                                        <div className="mono text-[10px] tracking-widest uppercase text-muted-foreground">Fare</div>
                                        <div className="display text-2xl text-ink leading-none">₹{bus.price}</div>
                                    </div>

                                    <div className="col-span-1 flex justify-end">
                                        <button
                                            onClick={() => handleDelete(bus.id)}
                                            className="p-2.5 text-muted-foreground hover:text-howrah hover:bg-howrah/10 rounded-xl transition-colors"
                                            aria-label="Delete bus"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
