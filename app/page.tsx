import Footer from "../components/Footer";
import Image from "next/image";
import React from "react";

const destinations = [
  { id: 1, name: "Tokyo", tours: "100+ Tours", ima: "/images/event1.jpg" },
  { id: 2, name: "Maldives", tours: "300+ Tours", ima: "/images/event2.jpg" },
  { id: 3, name: "Roma", tours: "400+ Tours", ima: "/images/event3.jpg" },
  { id: 4, name: "Bangkok", tours: "100+ Tours", ima: "/images/event4.jpg" },
  { id: 5, name: "Bali", tours: "600+ Tours", ima: "/images/event5.jpg" },
  { id: 6, name: "Bali", tours: "600+ Tours", ima: "/images/event6.jpg" },
];

const Home = () => {
  return (
    <main className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <div className="relative w-[90%] h-[500px] rounded-xl overflow-hidden mt-6">
        <Image
          src="/hero.jpg"
          alt="Hero image"
          fill
          className="object-cover"
        />

        {/* Text on image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">
            Your world of joy
          </h1>

          <p className="text-lg">
            From local escapes to far-flung adventures
          </p>
        </div>
      </div>
      
      {/* why choose bustify */}

      <div className="w-[90%] mt-20">
  <h2 className="text-4xl font-bold text-center mb-12">
    Why Choose Bustify
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

    <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
      <img src="/images/tickets.svg" alt="" className="w-16 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Easy & Fast Booking</h3>
      <p className="text-gray-600 text-sm">
        Passengers can quickly search buses, compare options, and book tickets within seconds using a simple interface.
      </p>
    </div>

    <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
      <img src="/images/prices.svg" alt="" className="w-16 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
      <p className="text-gray-600 text-sm">
        Bustify offers competitive ticket prices and special discounts so passengers always get the best deals.
      </p>
    </div>

    <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
      <img src="/images/health.svg" alt="" className="w-16 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Safe & Reliable Travel</h3>
      <p className="text-gray-600 text-sm">
        All buses and operators are verified to ensure passenger safety, comfort, and reliable travel.
      </p>
    </div>

    <div className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-xl transition">
      <img src="/images/everyTime.svg" alt="" className="w-16 mb-4" />
      <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
      <p className="text-gray-600 text-sm">
        Our support team is always available to help with booking issues, cancellations, or travel assistance.
      </p>
    </div>

  </div>
</div>


      {/* Trending Destinations Section */}
      <div className="w-[90%] mt-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Trending destinations
          </h2>
        </div>

        {/* Destinations Container */}
        <div className="flex justify-center overflow-x-auto gap-8 pb-4">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="flex flex-col items-center group cursor-pointer flex-shrink-0"
            >

              {/* Circular Image - All Same Size */}
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

          <Footer/>
      </div>
    </main>
  );
};

export default Home;