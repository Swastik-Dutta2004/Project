import Footer from "../components/Footer";
import Image from "next/image";
import React from "react";
import TrendingPlace from "../components/TrendingPlace";
import WhyBustify from "../components/WhyBustify"
import Cards from "@/components/Cards";



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

        <WhyBustify/>         

      </div>


      <div className="w-[90%] mt-20">
        <h2 className= "text-4xl font-bold text-center mb-12">Find Popular places</h2>

          <Cards/>
      </div>

      {/* Trending Destinations Section */}
      <div className="w-[90%] mt-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 ">
            Trending destinations
          </h2>
        </div>
        <TrendingPlace />

        <Footer />
      </div>
    </main>
  );
};

export default Home;