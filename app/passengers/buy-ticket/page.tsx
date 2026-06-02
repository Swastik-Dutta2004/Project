"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Bus, Check } from "lucide-react"

const ROWS = 8
const COLS = 4 // 2-2 layout with aisle

export default function BuyTicketPage() {
  const Params = useSearchParams()
  const router = useRouter()

  const busID = Params.get("busId") || "—"
  const busTo = Params.get("to") || "—"
  const busfrom = Params.get("from") || "—"
  const busDate = Params.get("date") || "—"
  const busPassengers = Number(Params.get("passengers") || 1)
  const busTotalPrice = Params.get("price") || "—"

  const [seats, setSeats] = useState<string[]>([])
  const max = busPassengers

  const toggleSeat = (id: string) => {
    setSeats((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id)
      if (prev.length >= max) return prev
      return [...prev, id]
    })
  }

  const totalSelected = seats.length
  // Pre-mark some as taken
  const taken = ["R1-1", "R1-4", "R3-2", "R4-3", "R6-1", "R7-4", "R8-2"]

  return (
    <div className="min-h-screen pb-20">
      <section className="border-b border-ink/15 bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 md:py-16">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-ink/70 hover:text-ink transition-colors mono uppercase tracking-widest mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="route-num text-2xl text-tram">№ 07</span>
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Seat selection
              </span>
            </div>
            <span className="stamp text-tram border-tram">Step 2 / 3</span>
          </div>

          <h1 className="display text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink max-w-4xl">
            Pick your <br />
            <span className="italic font-light text-muted-foreground">seat, traveller.</span>
          </h1>

          <p className="mt-6 text-ink/70 text-lg max-w-2xl">
            Choose up to {max} seat{max > 1 ? "s" : ""}. Window seats are best for
            people-watching, aisle seats for stretchers.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-5 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── LEFT: Seat map ────────────────────────────── */}
        <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="mono text-[10px] tracking-widest uppercase text-muted-foreground">
                    Layout · 2 × 2
                  </div>
                  <h2 className="display text-2xl text-ink mt-1">Choose seats</h2>
                </div>
                <div className="flex items-center gap-4 text-xs mono uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded border-2 border-ink" /> Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-ink" /> Yours
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-ink/20" /> Taken
                  </span>
                </div>
              </div>

              {/* Bus front indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-ink grid place-items-center">
                  <Bus className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <div className="mono text-[10px] tracking-widest uppercase text-muted-foreground">Front of bus</div>
                  <div className="display text-lg text-ink leading-none">Driver</div>
                </div>
              </div>

              <div className="ticket-stitch h-px mb-6" />

              {/* Seat grid */}
              <div className="space-y-3">
                {Array.from({ length: ROWS }).map((_, r) => (
                  <div key={r} className="flex items-center gap-3 justify-center">
                    <span className="route-num text-xl text-muted-foreground w-6 shrink-0">
                      {r + 1}
                    </span>
                    <div className="grid grid-cols-4 gap-3 flex-1 max-w-md">
                      {Array.from({ length: COLS }).map((__, c) => {
                        const id = `R${r + 1}-${c + 1}`
                        const isTaken = taken.includes(id)
                        const isSelected = seats.includes(id)
                        const isAisle = c === 1 || c === 2
                        const disabled = isTaken || (!isSelected && totalSelected >= max)

                        return (
                          <button
                            key={id}
                            onClick={() => !isTaken && toggleSeat(id)}
                            disabled={isTaken}
                            className={`
                              h-12 rounded-lg border-2 mono text-xs font-medium tracking-widest transition-all
                              ${isAisle ? "mr-3" : ""}
                              ${
                                isTaken
                                  ? "bg-ink/15 border-ink/10 text-muted-foreground line-through cursor-not-allowed"
                                  : isSelected
                                  ? "bg-ink text-paper border-ink scale-105"
                                  : disabled
                                  ? "bg-card border-ink/10 text-muted-foreground/50 cursor-not-allowed"
                                  : "bg-card border-ink/30 hover:border-ink text-ink hover:scale-105"
                              }
                            `}
                          >
                            {id.replace("R", "")}
                            {isSelected && <Check className="inline w-3 h-3 ml-1" />}
                          </button>
                        )
                      })}
                    </div>
                    <span className="route-num text-xl text-muted-foreground w-6 shrink-0">
                      {r + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="ticket-stitch h-px mt-6 mb-4" />
              <div className="flex items-center justify-center gap-2 mono text-[10px] tracking-widest uppercase text-muted-foreground">
                <span>Rear · Door</span>
              </div>
            </div>
        </div>

        {/* ── RIGHT: Summary ────────────────────────────── */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="route-num text-2xl text-tram">F·04</span>
                <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Your trip
                </span>
              </div>
              <h2 className="display text-3xl md:text-4xl leading-tight tracking-tight text-ink">
                Summary
              </h2>
            </div>

            <div className="bg-ink text-paper rounded-2xl p-6 paper-grain">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="route-num text-3xl text-tram">{String(busID).slice(-2).padStart(2, "0")}</span>
                  <div>
                    <div className="mono text-[10px] tracking-widest opacity-60">BUS</div>
                    <div className="font-medium text-sm">#{busID}</div>
                  </div>
                  <span className="ml-auto stamp text-tram border-tram bg-ink/40">Active</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <div className="mono text-[10px] tracking-widest opacity-60">FROM</div>
                    <div className="display text-lg leading-tight">{busfrom}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-tram shrink-0" />
                  <div className="flex-1 text-right">
                    <div className="mono text-[10px] tracking-widest opacity-60">TO</div>
                    <div className="display text-lg leading-tight">{busTo}</div>
                  </div>
                </div>

                <div className="ticket-stitch bg-paper/20 my-4 h-px" />

                <div className="space-y-2.5 mono text-xs">
                  <div className="flex justify-between">
                    <span className="opacity-60 tracking-widest uppercase">Date</span>
                    <span>{busDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60 tracking-widest uppercase">Passengers</span>
                    <span>{busPassengers}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="opacity-60 tracking-widest uppercase">Seats</span>
                    <span className="text-right">
                      {seats.length > 0 ? seats.join(", ") : <em className="opacity-50">not selected</em>}
                    </span>
                  </div>
                </div>

                <div className="ticket-stitch bg-paper/20 my-4 h-px" />

                <div className="flex items-end justify-between">
                  <div>
                    <div className="mono text-[10px] tracking-widest opacity-60">Total</div>
                    <div className="display text-4xl text-tram leading-none">₹{busTotalPrice}</div>
                  </div>
                  <div className="route-num text-xl opacity-60">
                    {totalSelected} / {max}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (seats.length === 0) {
                  alert("Please select at least one seat.")
                  return
                }
                const seatParam = seats.join(",")
                router.push(
                  `/passengers/myticket?busId=${busID}&from=${busfrom}&to=${busTo}&date=${busDate}&passengers=${busPassengers}&price=${busTotalPrice}&seats=${seatParam}`
                )
              }}
              disabled={seats.length === 0}
              className="group w-full bg-ink text-paper py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-tram hover:text-ink transition-colors duration-300 disabled:opacity-40 disabled:hover:bg-ink disabled:hover:text-paper"
            >
              Continue to payment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mono text-[10px] tracking-widest uppercase text-muted-foreground text-center">
              Powered by Razorpay · 256-bit secure
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}
