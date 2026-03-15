import React from 'react'

const destinations = [
    { id: 1, name: "Tokyo", tours: "100+ Tours", ima: "/images/event1.jpg" },
    { id: 2, name: "Maldives", tours: "300+ Tours", ima: "/images/event2.jpg" },
    { id: 3, name: "Roma", tours: "400+ Tours", ima: "/images/event3.jpg" },
    { id: 4, name: "Bangkok", tours: "100+ Tours", ima: "/images/event4.jpg" },
    { id: 5, name: "Bali", tours: "600+ Tours", ima: "/images/event5.jpg" },
    { id: 6, name: "Bali", tours: "600+ Tours", ima: "/images/event6.jpg" },
];
const TrendingPlace = () => {
    return (
        <div className="flex justify-center gap-8 overflow-x-auto pb-4" >
            {destinations.map((dest) => (
                <div key={dest.id}
                    className="flex flex-col items-center group cursor-pointer flex-shrink-0"
                >
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 mb-4">
                        <img
                            src={dest.ima}
                            alt={dest.name}
                            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TrendingPlace