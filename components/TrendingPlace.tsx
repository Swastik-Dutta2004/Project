"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const destinations = [
    { id: 1, code: "ESP", name: "Esplanade", tours: "Central Terminal", ima: "/images/event1.jpg", eta: "2" },
    { id: 2, code: "HWH", name: "Howrah", tours: "Bridge Hub", ima: "/images/event2.jpg", eta: "5" },
    { id: 3, code: "SALT", name: "Salt Lake", tours: "IT Sector", ima: "/images/event3.jpg", eta: "11" },
    { id: 4, code: "GRH", name: "Gariahat", tours: "Market", ima: "/images/event4.jpg", eta: "7" },
    { id: 5, code: "APT", name: "Airport", tours: "Express", ima: "/images/event5.jpg", eta: "23" },
    { id: 6, code: "BHL", name: "Behala", tours: "South", ima: "/images/event6.jpg", eta: "14" },
    { id: 7, code: "PRK", name: "Park St", tours: "Heritage", ima: "/images/event1.jpg", eta: "9" },
    { id: 8, code: "DUM", name: "Dum Dum", tours: "Metro", ima: "/images/event3.jpg", eta: "16" },
];

const TrendingPlace = () => {
  return (
    <section className="px-5 md:px-10 py-16 md:py-24 border-t border-ink/15">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-8 mb-10 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="route-num text-2xl text-tram">§ 04</span>
              <span className="mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Hot Stops
              </span>
            </div>
            <h2 className="display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-ink">
              Where everyone&apos;s <br />
              <span className="italic font-light text-muted-foreground">going, right now.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="text-sm text-ink/80 leading-relaxed">
              The eight busiest stops on the network, ranked by live boarding counts. Hover
              for the next departure.
            </p>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth -mx-5 md:-mx-10 px-5 md:px-10">
          {destinations.map((d, i) => (
            <a
              href="#"
              key={d.id}
              className="group relative flex-shrink-0 snap-center w-[200px] md:w-[230px] aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-card lift"
            >
              <img
                src={d.ima}
                alt={d.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

              {/* Stop code — like a station badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="route-num text-3xl text-tram">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="leading-none">
                  <div className="mono text-[9px] tracking-widest text-paper/70">STOP</div>
                  <div className="mono text-[11px] font-bold tracking-widest text-paper">
                    {d.code}
                  </div>
                </div>
              </div>

              <div className="absolute top-3 right-3 stamp text-tram border-tram bg-ink/40 backdrop-blur-sm">
                Live
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-paper">
                <div className="display text-2xl leading-none mb-1.5 tracking-tight">
                  {d.name}
                </div>
                <div className="mono text-[10px] tracking-widest uppercase opacity-70 mb-3">
                  {d.tours}
                </div>
                <div className="ticket-stitch mb-3 h-px bg-paper/30" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mono text-[9px] tracking-widest opacity-60">Next bus</div>
                    <div className="route-num text-xl text-tram">{d.eta}m</div>
                  </div>
                  <div className="w-8 h-8 rounded-full grid place-items-center border border-paper/30 group-hover:bg-tram group-hover:text-ink group-hover:border-tram transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPlace;
