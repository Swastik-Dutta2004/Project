"use client"

import React from 'react'

const destinations = [
    { id: 1, name: "Esplanade", tours: "Terminal", ima: "/images/event1.jpg" },
    { id: 2, name: "Howrah", tours: "Hub", ima: "/images/event2.jpg" },
    { id: 3, name: "Salt Lake", tours: "IT Sector", ima: "/images/event3.jpg" },
    { id: 4, name: "Gariahat", tours: "Market", ima: "/images/event4.jpg" },
    { id: 5, name: "Airport", tours: "Express", ima: "/images/event5.jpg" },
    { id: 6, name: "Behala", tours: "South", ima: "/images/event6.jpg" },
];

const TrendingPlace = () => {
    return (
        <section className="w-full py-4 bg-background">
            {/* Scrollable Container - Internal Headings Removed */}
            <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar snap-x scroll-smooth">
                {destinations.map((dest) => (
                    <div 
                        key={dest.id}
                        className="flex flex-col items-center group cursor-pointer flex-shrink-0 snap-center"
                    >
                        {/* Image Circle with Active Ring Effect */}
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border-2 border-transparent group-hover:border-primary transition-all duration-300 mb-3">
                            <div className="w-full h-full rounded-full overflow-hidden border border-border bg-muted shadow-sm group-hover:shadow-md">
                                <img
                                    src={dest.ima} // Image location remains unchanged
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            
                            {/* Live Status Indicator */}
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-sm"></span>
                        </div>

                        {/* Text Info - Styled for "BusTiFY" Brand */}
                        <div className="text-center">
                            <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors tracking-tight uppercase">
                                {dest.name}
                            </p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                                {dest.tours}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TrendingPlace