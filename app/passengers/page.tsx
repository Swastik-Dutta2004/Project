"use client"

import { useEffect, useState } from "react"
import { getBuses } from "@/lib/busStorage"
import buses from "@/public/buses.json"
import { useRouter } from "next/navigation"
import { ArrowRight, Search as SearchIcon, MapPin, Calendar, Users, ArrowUpRight, Bus, Clock } from "lucide-react"

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

export default function PassengersPage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [searchedResult, setSearchedResult] = useState<SearchResult | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

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

  const [buslist, setBuslist] = useState<Bus[]>([])

  useEffect(() => {
    const data = getBuses() as unknown as Bus[]
    const Json = buses.buses as Bus[]
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBuslist([...data, ...Json])
  }, [])

  const allCities = Array.from(new Set([...buslist.map((bus) => bus.from), ...buslist.map((bus) => bus.to)]))

  const filteredBuses = searchedResult
    ? buslist.filter((bus) => {
        return (
          bus.from?.toLowerCase() === from.toLowerCase() && bus.to?.toLowerCase() === to.toLowerCase()
        )
      })
    : []

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
    router.push(
      `/passengers/myticket?busId=${bus.id}&from=${from}&to=${to}&date=${date}&passengers=${passengers}&price=${totalPrice}`
    )
  }

  return (
    <div className="min-h-screen font-sans">
      {/* ── Editorial header strip ─────────────────────────── */}
      <section className="border-b border-ink/15 bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="route-num text-2xl text-tram">№ 04</span>
            <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              The Journey Planner
            </span>
          </div>

          <h1 className="display text-5xl md:text-7xl lg:text-[120px] leading-[0.92] tracking-tight text-ink max-w-5xl">
            Tell us{" "}
            <span className="italic font-light text-muted-foreground">where</span>,{" "}
            <br className="hidden md:block" />
            <span className="inline-block">
              we&apos;ll find the{" "}
              <span className="relative">
                <span className="relative z-10">bus</span>
                <span className="absolute inset-x-0 bottom-1 h-3 md:h-5 bg-tram -z-0 -rotate-2" />
              </span>
              .
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-ink/80 leading-relaxed">
            Real-time availability across 412 routes. AC, non-AC, tram, mini — every bus in
            the network, on one board.
          </p>
        </div>

        {/* Search "boarding pass" */}
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 -mb-16 md:-mb-20 relative z-10">
          <div className="bg-ink text-paper rounded-2xl overflow-hidden paper-grain">
            <div className="relative z-10 p-5 md:p-7">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-paper/15">
                <div className="flex items-center gap-3">
                  <span className="route-num text-2xl text-tram">F·01</span>
                  <span className="mono text-[10px] tracking-[0.3em] uppercase opacity-60">
                    Search Parameters
                  </span>
                </div>
                <span className="stamp text-tram border-tram">Open</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                {/* From */}
                <div className="md:col-span-4">
                  <label className="mono text-[10px] tracking-widest uppercase opacity-60 flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3 h-3" /> From
                  </label>
                  <select
                    className="w-full bg-paper/10 border border-paper/20 focus:border-tram rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-colors appearance-none cursor-pointer"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    <option value="" className="text-ink">Select origin stop</option>
                    {allCities.map((city) => (
                      <option key={city} value={city} className="text-ink">{city}</option>
                    ))}
                  </select>
                </div>

                {/* Swap icon visual */}
                <div className="hidden md:flex md:col-span-1 items-end justify-center pb-2">
                  <div className="w-10 h-10 rounded-full border border-paper/20 grid place-items-center">
                    <ArrowRight className="w-4 h-4 text-tram" />
                  </div>
                </div>

                {/* To */}
                <div className="md:col-span-3">
                  <label className="mono text-[10px] tracking-widest uppercase opacity-60 flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3 h-3" /> To
                  </label>
                  <select
                    className="w-full bg-paper/10 border border-paper/20 focus:border-tram rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-colors appearance-none cursor-pointer"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  >
                    <option value="" className="text-ink">Select destination stop</option>
                    {allCities.filter((city) => city !== from).map((city) => (
                      <option key={city} value={city} className="text-ink">{city}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="md:col-span-2">
                  <label className="mono text-[10px] tracking-widest uppercase opacity-60 flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3 h-3" /> Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-paper/10 border border-paper/20 focus:border-tram rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-colors text-paper [color-scheme:dark]"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Seats */}
                <div className="md:col-span-1">
                  <label className="mono text-[10px] tracking-widest uppercase opacity-60 flex items-center gap-1.5 mb-2">
                    <Users className="w-3 h-3" /> Seats
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full bg-paper/10 border border-paper/20 focus:border-tram rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-colors"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                  />
                </div>

                {/* CTA */}
                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full bg-tram text-ink rounded-xl py-3.5 font-medium hover:bg-paper transition-colors flex items-center justify-center gap-1.5 group"
                  >
                    <SearchIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {error && (
                <p className="mt-4 mono text-[10px] tracking-widest uppercase text-howrah border-l-2 border-howrah pl-3">
                  ⚠ {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────── */}
      <section className="pt-28 md:pt-32 pb-20 px-5 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {!searchedResult ? (
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-center gap-3 mb-5">
                  <span className="route-num text-2xl text-tram">§ 04.1</span>
                  <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    Quick Suggestions
                  </span>
                </div>
                <h2 className="display text-4xl md:text-5xl leading-tight tracking-tight mb-4 text-ink">
                  Popular <br />
                  <span className="italic font-light text-muted-foreground">routes.</span>
                </h2>
                <p className="text-ink/70 leading-relaxed max-w-md">
                  The most-booked routes this week. Tap one to prefill the search above.
                </p>
              </div>

              <div className="col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { from: "Howrah", to: "Esplanade", rides: "8.2k", time: "35 min" },
                  { from: "Salt Lake", to: "Airport", rides: "5.1k", time: "55 min" },
                  { from: "Gariahat", to: "Dakshineswar", rides: "3.4k", time: "1h 12m" },
                  { from: "Park St", to: "Sector V", rides: "4.7k", time: "48 min" },
                ].map((r, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setFrom(r.from)
                      setTo(r.to)
                    }}
                    className="group text-left bg-card border border-border rounded-2xl p-5 hover:border-ink hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="mono text-[10px] tracking-widest text-muted-foreground">
                        Route · {String(i + 1).padStart(3, "0")}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-ink group-hover:rotate-45 transition-all" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="display text-xl text-ink">{r.from}</span>
                      <ArrowRight className="w-4 h-4 text-tram" />
                      <span className="display text-xl text-ink">{r.to}</span>
                    </div>
                    <div className="flex items-center gap-4 mono text-[10px] tracking-widest uppercase text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.time}</span>
                      <span>{r.rides} rides/wk</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-end justify-between flex-wrap gap-4 pb-5 border-b border-ink/20">
                <div>
                  <div className="mono text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                    {filteredBuses.length} result{filteredBuses.length !== 1 && "s"} ·{" "}
                    {searchedResult.date}
                  </div>
                  <h2 className="display text-3xl md:text-5xl leading-tight tracking-tight text-ink">
                    {searchedResult.from}{" "}
                    <ArrowRight className="inline w-8 h-8 text-tram mb-1" />{" "}
                    {searchedResult.to}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Sort:</span>
                  <button className="font-medium text-ink border-b-2 border-tram">Earliest</button>
                  <span className="text-muted-foreground">·</span>
                  <button className="text-muted-foreground hover:text-ink">Cheapest</button>
                  <span className="text-muted-foreground">·</span>
                  <button className="text-muted-foreground hover:text-ink">Fastest</button>
                </div>
              </div>

              {filteredBuses.length > 0 ? (
                <div className="space-y-4">
                  {filteredBuses.map((bus) => (
                    <article
                      key={bus.id}
                      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-ink hover:shadow-xl transition-all"
                    >
                      <div className="grid grid-cols-12 items-stretch">
                        {/* Route code — left stub */}
                        <div className="col-span-12 md:col-span-2 bg-ink text-paper p-5 md:p-6 flex md:flex-col items-center md:items-start justify-between md:justify-center gap-3 relative">
                          <div className="route-num text-5xl md:text-6xl text-tram leading-none">
                            {String(bus.id).slice(-2).padStart(2, "0")}
                          </div>
                          <div className="md:mt-2">
                            <div className="mono text-[9px] tracking-widest opacity-60">BUS</div>
                            <div className="mono text-xs font-medium">{bus.name.slice(0, 10)}</div>
                          </div>
                          {/* Perforation */}
                          <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-paper rounded-full" />
                        </div>

                        {/* Middle — info */}
                        <div className="col-span-12 md:col-span-7 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8 relative">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="stamp text-tram border-tram">{bus.type}</span>
                              <span className="mono text-[10px] tracking-widest text-muted-foreground">
                                ★ {bus.rating} · {bus.seats} seats left
                              </span>
                            </div>
                            <h3 className="display text-2xl text-ink mb-1 leading-tight">{bus.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {bus.amenities?.join(" · ") || "WiFi · Water · Charging"}
                            </p>
                          </div>

                          <div className="flex items-center gap-5 md:gap-6">
                            <div className="text-center">
                              <div className="display text-2xl text-ink leading-none">{bus.departure}</div>
                              <div className="mono text-[9px] tracking-widest text-muted-foreground mt-1">DEPART</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                              <div className="w-px h-6 bg-border my-0.5" />
                              <div className="w-1.5 h-1.5 rounded-full bg-tram" />
                              <div className="mono text-[9px] tracking-widest text-muted-foreground mt-1.5">
                                {bus.duration || "—"}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="display text-2xl text-ink leading-none">{bus.arrival}</div>
                              <div className="mono text-[9px] tracking-widest text-muted-foreground mt-1">ARRIVE</div>
                            </div>
                          </div>

                          {/* Perforation right */}
                          <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-paper rounded-full" />
                        </div>

                        {/* Right stub — price + CTA */}
                        <div className="col-span-12 md:col-span-3 p-5 md:p-6 bg-secondary/40 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:gap-2 border-t md:border-t-0 md:border-l border-dashed border-ink/20">
                          <div className="md:text-right">
                            <div className="mono text-[10px] tracking-widest text-muted-foreground">From</div>
                            <div className="display text-3xl text-ink leading-none">₹{bus.price}</div>
                            <div className="mono text-[10px] tracking-widest text-muted-foreground mt-1">
                              × {searchedResult.passengers} pax
                            </div>
                          </div>
                          <button
                            onClick={() => HandleBooking(bus)}
                            className="bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-medium hover:bg-tram hover:text-ink transition-colors flex items-center gap-1.5 group/btn"
                          >
                            Book
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:rotate-45 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-3xl p-16 text-center">
                  <Bus className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="display text-2xl text-ink mb-2">No buses on this route.</h3>
                  <p className="text-muted-foreground text-sm">
                    Try a different date or check our{" "}
                    <button
                      onClick={() => setSearchedResult(null)}
                      className="text-ink underline decoration-tram decoration-2 underline-offset-4"
                    >
                      popular routes
                    </button>
                    .
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
