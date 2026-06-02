"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Ticket, MapPin, Calendar, Users, IndianRupee, ArrowLeft, Printer, Download, Bus } from "lucide-react"

export default function TicketPage() {
  const Params = useSearchParams()
  const router = useRouter()

  const busID = Params.get("busId")
  const busTo = Params.get("to")
  const busfrom = Params.get("from")
  const busDate = Params.get("date")
  const busPassengers = Params.get("passengers")
  const busTotalPrice = Params.get("price")
  const ticketId = `BT-${(busID || "000").toString().padStart(4, "0")}-${(busDate || "X").replace(/[^0-9]/g, "").slice(-6) || "000000"}`

  return (
    <div className="min-h-screen py-10 md:py-16 px-5 md:px-10 font-sans">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="no-print inline-flex items-center gap-2 text-sm text-ink/70 hover:text-ink transition-colors mono uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2 no-print">
            <span className="route-num text-2xl text-tram">№ 05</span>
            <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Confirmation
            </span>
          </div>
        </div>

        {/* Success headline */}
        <div className="mb-8 reveal reveal-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="stamp text-tram border-tram">Confirmed</span>
            <span className="mono text-[10px] tracking-widest text-muted-foreground">
              · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
          <h1 className="display text-5xl md:text-7xl leading-[0.95] tracking-tight text-ink">
            You&apos;re <br />
            <span className="italic font-light text-tram">on the bus.</span>
          </h1>
          <p className="mt-5 text-ink/70 text-lg max-w-lg">
            Show this digital ticket to the conductor — or print it, if that&apos;s how your
            nana rolls.
          </p>
        </div>

        {/* ── The Ticket ──────────────────────────────────────── */}
        <article className="relative bg-card rounded-3xl shadow-2xl overflow-hidden border border-border reveal reveal-2">
          {/* Top stub — bus line */}
          <header className="bg-ink text-paper p-6 md:p-8 paper-grain relative">
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <div className="mono text-[10px] tracking-[0.3em] uppercase opacity-60 mb-1">
                  Boarding Pass
                </div>
                <div className="display text-3xl md:text-4xl tracking-tight">
                  Bus<span className="italic text-tram">Ti</span>FY
                </div>
              </div>
              <div className="text-right">
                <div className="mono text-[10px] tracking-widest uppercase opacity-60 mb-1">PNR</div>
                <div className="mono text-lg md:text-xl font-medium tracking-widest">{ticketId}</div>
              </div>
            </div>
            <div className="relative z-10 mt-6 flex items-center gap-3 flex-wrap">
              <span className="stamp text-tram border-tram bg-ink/40">Active</span>
              <span className="mono text-[10px] tracking-widest uppercase opacity-60">
                {busDate || "Today"} · {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </header>

          {/* Body */}
          <div className="p-6 md:p-10 relative">
            {/* Route line */}
            <div className="grid grid-cols-12 items-center gap-4 mb-8">
              <div className="col-span-5">
                <div className="mono text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                  Origin
                </div>
                <div className="display text-3xl md:text-5xl tracking-tight text-ink leading-none">
                  {busfrom || "N/A"}
                </div>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-ink ring-4 ring-tram" />
                <div className="flex-1 w-px bg-ink/30 my-1 relative">
                  <Bus className="w-4 h-4 text-ink absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-1" />
                </div>
                <div className="w-3 h-3 rounded-full bg-tram ring-4 ring-ink" />
              </div>

              <div className="col-span-5 text-right">
                <div className="mono text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                  Destination
                </div>
                <div className="display text-3xl md:text-5xl tracking-tight text-ink leading-none">
                  {busTo || "N/A"}
                </div>
              </div>
            </div>

            {/* Details — ticket-stitch divided */}
            <div className="ticket-stitch h-px mb-8" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Calendar className="w-4 h-4" />, label: "Date", val: busDate || "Today" },
                { icon: <Users className="w-4 h-4" />, label: "Passengers", val: `${busPassengers || "1"} pax` },
                { icon: <IndianRupee className="w-4 h-4" />, label: "Total", val: `₹${busTotalPrice || "0"}` },
                { icon: <MapPin className="w-4 h-4" />, label: "Status", val: "Confirmed", color: "text-tram" },
              ].map((d, i) => (
                <div key={i}>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
                    {d.icon}
                    <span className="mono text-[10px] tracking-widest uppercase">{d.label}</span>
                  </div>
                  <div className={`display text-xl md:text-2xl tracking-tight ${d.color || "text-ink"}`}>
                    {d.val}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stub */}
            <div className="mt-10 -mx-6 md:-mx-10 px-6 md:px-10 py-6 border-t-2 border-dashed border-ink/20 bg-secondary/30 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 grid place-items-center bg-ink text-paper rounded-lg">
                  <Ticket className="w-7 h-7 text-tram" />
                </div>
                <div>
                  <div className="mono text-[10px] tracking-widest text-muted-foreground">SCAN AT ENTRY</div>
                  <div className="font-mono text-sm tracking-widest text-ink mt-0.5">
                    {ticketId}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="mono text-[10px] tracking-widest text-muted-foreground">FARE</div>
                <div className="display text-3xl text-ink leading-none">₹{busTotalPrice || "0"}</div>
              </div>
            </div>
          </div>
        </article>

        {/* Actions */}
        <div className="mt-6 flex gap-3 no-print">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-ink text-paper py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-tram hover:text-ink transition-colors"
          >
            <Printer className="w-4 h-4" /> Print ticket
          </button>
          <button className="flex-1 border-2 border-ink text-ink py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-ink hover:text-paper transition-colors">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        <p className="mono text-[10px] tracking-widest uppercase text-muted-foreground text-center mt-8 no-print">
          Carry this ticket for the entire journey · No transfers included
        </p>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  )
}
