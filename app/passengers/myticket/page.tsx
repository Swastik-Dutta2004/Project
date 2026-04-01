"use client"

import { useSearchParams } from "next/navigation";
import { Ticket, MapPin, Calendar, Users, IndianRupee, QrCode } from "lucide-react";

export default function TicketPage() {
  const Params = useSearchParams();

  const busID = Params.get("busId");
  const busTo = Params.get("to");
  const busfrom = Params.get("from");
  const busDate = Params.get("date");
  const busPassengers = Params.get("passengers");
  const busTotalPrice = Params.get("price");

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <Ticket size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase text-foreground">Booking Confirmed!</h1>
          <p className="text-muted-foreground font-medium">Show this digital ticket to the bus conductor.</p>
        </div>

        {/* --- TICKET DESIGN --- */}
        <div className="relative bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
          
          {/* Top Section: Brand & ID */}
          <div className="bg-primary p-6 text-primary-foreground flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Official Ticket</span>
              <span className="text-2xl font-black tracking-tighter">BusTiFY</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Bus ID</span>
              <p className="font-bold text-lg">#{busID || "000"}</p>
            </div>
          </div>

          {/* Middle Section: Route */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Departure</span>
                <p className="text-2xl font-black text-foreground uppercase">{busfrom || "N/A"}</p>
              </div>
              
              <div className="flex-1 flex items-center justify-center px-4">
                 <div className="h-[2px] flex-1 bg-border relative">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-card px-2">
                       <Ticket size={14} className="text-primary rotate-90" />
                    </div>
                 </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Arrival</span>
                <p className="text-2xl font-black text-foreground uppercase">{busTo || "N/A"}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-dashed border-border pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg text-primary"><Calendar size={18} /></div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Date</p>
                  <p className="font-black text-sm">{busDate || "Select Date"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg text-primary"><Users size={18} /></div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Passengers</p>
                  <p className="font-black text-sm">{busPassengers || "1"} Person(s)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg text-primary"><IndianRupee size={18} /></div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Total Fare</p>
                  <p className="font-black text-sm text-primary">₹{busTotalPrice || "0"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg text-primary"><MapPin size={18} /></div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Status</p>
                  <p className="font-black text-sm text-green-600 uppercase">Confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Bottom "Stub" */}
          <div className="relative bg-secondary/50 p-8 border-t-4 border-dotted border-background">
            {/* Cutout circles for the ticket look */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-secondary/30 rounded-full" />
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary/30 rounded-full" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg border border-border">
                    <QrCode size={64} className="text-foreground" />
                  </div>
                  <div>
                    <p className="font-black text-foreground text-sm uppercase">Scan for Entry</p>
                    <p className="text-[10px] text-muted-foreground font-medium">Ticket Token: BT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
               </div>
               
               <button 
                onClick={() => window.print()}
                className="bg-foreground text-background px-6 py-3 rounded-xl font-black text-sm uppercase tracking-tighter hover:bg-primary transition-all active:scale-95 no-print"
               >
                 Print Ticket
               </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <button 
          onClick={() => window.history.back()}
          className="mt-8 text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center w-full gap-2 no-print"
        >
           ← Go back to search
        </button>

      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .bg-secondary\/30 { background: white !important; }
        }
      `}</style>
    </div>
  );
}