"use client";

import Image from "next/image";
import { useState } from "react";

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Surat", "Nagpur", "Indore", "Bhopal", "Chandigarh",
];

type Bus = {
  id: number;
  name: string;
  type: string;
  departure: string;
  arrival: string;
  duration: string;
  seats: number;
  price: number;
  rating: number;
  amenities: string[];
};

const busData: Bus[] = [
  { id: 1, name: "GreenLine Express", type: "AC Sleeper", departure: "06:00 AM", arrival: "02:30 PM", duration: "8h 30m", seats: 12, price: 849, rating: 4.5, amenities: ["WiFi", "Charging", "Blanket"] },
  { id: 2, name: "Royal Cruiser", type: "AC Seater", departure: "08:30 AM", arrival: "04:00 PM", duration: "7h 30m", seats: 24, price: 599, rating: 4.2, amenities: ["WiFi", "Charging"] },
  { id: 3, name: "Skyline Travels", type: "Non-AC Sleeper", departure: "09:45 AM", arrival: "06:15 PM", duration: "8h 30m", seats: 5, price: 450, rating: 3.9, amenities: ["Charging"] },
  { id: 4, name: "Comfort Ride", type: "AC Sleeper", departure: "11:00 PM", arrival: "07:00 AM", duration: "8h 00m", seats: 0, price: 950, rating: 4.7, amenities: ["WiFi", "Charging", "Blanket", "Snacks"] },
  { id: 5, name: "CityLink Bus", type: "AC Seater", departure: "02:00 PM", arrival: "09:30 PM", duration: "7h 30m", seats: 18, price: 620, rating: 4.1, amenities: ["WiFi"] },
  { id: 6, name: "Night Rider Express", type: "Non-AC Seater", departure: "05:30 AM", arrival: "01:00 PM", duration: "7h 30m", seats: 30, price: 320, rating: 3.7, amenities: [] },
  { id: 7, name: "Swift Journey", type: "AC Sleeper", departure: "10:00 PM", arrival: "06:30 AM", duration: "8h 30m", seats: 8, price: 780, rating: 4.3, amenities: ["WiFi", "Blanket"] },
  { id: 8, name: "BlueWave Travels", type: "AC Seater", departure: "07:15 AM", arrival: "03:00 PM", duration: "7h 45m", seats: 3, price: 560, rating: 4.0, amenities: ["Charging"] },
  { id: 9, name: "Golden Route Bus", type: "Non-AC Seater", departure: "12:00 PM", arrival: "08:00 PM", duration: "8h 00m", seats: 22, price: 290, rating: 3.5, amenities: [] },
  { id: 10, name: "Rapid Transit", type: "AC Seater", departure: "04:45 PM", arrival: "11:30 PM", duration: "6h 45m", seats: 15, price: 670, rating: 4.6, amenities: ["WiFi", "Charging", "Snacks"] },
];

const busTypeStyles: Record<string, string> = {
  "AC Sleeper": "bg-blue-100 text-blue-700",
  "AC Seater": "bg-indigo-100 text-indigo-700",
  "Non-AC Sleeper": "bg-amber-100 text-amber-700",
  "Non-AC Seater": "bg-gray-100 text-gray-600",
};

type SortKey = "price" | "rating" | "departure" | "seats";

type SearchResult = {
  from: string;
  to: string;
  date: string;
  passengers: number;
};

export default function HeroSection() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [error, setError] = useState("");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    if (!from || !to || !date) {
      setError("Please fill in From, To, and Travel Date.");
      return;
    }
    if (from === to) {
      setError("Origin and destination cannot be the same.");
      return;
    }
    setError("");
    setSearchResult({ from, to, date, passengers });
  };

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const sortedBuses = [...busData].sort((a, b) => {
    let diff = 0;
    if (sortBy === "price") diff = a.price - b.price;
    if (sortBy === "rating") diff = a.rating - b.rating;
    if (sortBy === "seats") diff = a.seats - b.seats;
    if (sortBy === "departure") diff = a.departure.localeCompare(b.departure);
    return sortDir === "asc" ? diff : -diff;
  });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col leading-[0] gap-[2px]">
      <span className={`text-[8px] ${sortBy === col && sortDir === "asc" ? "text-blue-600" : "text-gray-300"}`}>▲</span>
      <span className={`text-[8px] ${sortBy === col && sortDir === "desc" ? "text-blue-600" : "text-gray-300"}`}>▼</span>
    </span>
  );

  return (
    <section className="flex flex-col items-center w-full pb-12">

      {/* ── Hero Image + Search Bar ── */}
      <div className="relative w-[90%] h-[500px] rounded-xl overflow-hidden mt-6">
        <Image src="/Hero2.jpg" alt="Hero image" fill className="object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Headline */}
        <div className="absolute top-16 left-0 right-0 flex flex-col items-center z-10 px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-md">
            Book Your Bus, Hassle-Free
          </h1>
          <p className="text-white/80 text-sm mt-2 text-center">
            Thousands of routes. Safe, comfortable, on time.
          </p>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-6 left-0 right-0 z-10 px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-5">
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3">

              {/* From */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">From</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                    </svg>
                  </span>
                  <select
                    value={from}
                    onChange={(e) => { setFrom(e.target.value); setError(""); }}
                    className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors appearance-none"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Swap */}
              <button
                onClick={handleSwap}
                className="self-end mb-0.5 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors flex-shrink-0"
                title="Swap cities"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>

              {/* To */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">To</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <select
                    value={to}
                    onChange={(e) => { setTo(e.target.value); setError(""); }}
                    className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors appearance-none"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Travel Date</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => { setDate(e.target.value); setError(""); }}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="flex flex-col gap-1 w-full md:w-36 flex-shrink-0">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">Passengers</label>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                  <button onClick={() => setPassengers((p) => Math.max(1, p - 1))} className="px-3 py-3 text-gray-500 hover:bg-gray-200 transition-colors text-lg leading-none">−</button>
                  <span className="flex-1 text-center text-sm font-semibold text-gray-700">{passengers}</span>
                  <button onClick={() => setPassengers((p) => Math.min(10, p + 1))} className="px-3 py-3 text-gray-500 hover:bg-gray-200 transition-colors text-lg leading-none">+</button>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex-shrink-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all self-end"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                Search Buses
              </button>
            </div>

            {/* Validation error */}
            {error && (
              <p className="mt-2 pl-1 text-xs text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bus Results Table (only shown after search) ── */}
      {searchResult && (
        <div className="w-[90%] mt-10">

          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Available Buses</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                <span className="font-medium text-gray-700">{searchResult.from}</span>
                {" → "}
                <span className="font-medium text-gray-700">{searchResult.to}</span>
                <span className="mx-2 text-gray-300">·</span>
                {new Date(searchResult.date).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}
                <span className="mx-2 text-gray-300">·</span>
                {searchResult.passengers} {searchResult.passengers === 1 ? "passenger" : "passengers"}
              </p>
            </div>
            <span className="text-sm text-gray-400">{sortedBuses.length} buses found</span>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left">
                    <th className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap">#</th>
                    <th className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap">Bus Name</th>
                    <th className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap">Type</th>
                    <th
                      className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap cursor-pointer hover:text-blue-600 select-none"
                      onClick={() => handleSort("departure")}
                    >
                      Departure <SortIcon col="departure" />
                    </th>
                    <th className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap">Arrival</th>
                    <th className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap">Duration</th>
                    <th className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap">Amenities</th>
                    <th
                      className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap cursor-pointer hover:text-blue-600 select-none"
                      onClick={() => handleSort("seats")}
                    >
                      Seats <SortIcon col="seats" />
                    </th>
                    <th
                      className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap cursor-pointer hover:text-blue-600 select-none"
                      onClick={() => handleSort("rating")}
                    >
                      Rating <SortIcon col="rating" />
                    </th>
                    <th
                      className="px-4 py-3.5 font-semibold text-gray-500 whitespace-nowrap cursor-pointer hover:text-blue-600 select-none text-right"
                      onClick={() => handleSort("price")}
                    >
                      Price <SortIcon col="price" />
                    </th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {sortedBuses.map((bus, idx) => {
                    const soldOut = bus.seats === 0;
                    return (
                      <tr
                        key={bus.id}
                        className={`transition-colors ${soldOut ? "opacity-50" : "hover:bg-blue-50/40"}`}
                      >
                        {/* # */}
                        <td className="px-4 py-4 text-gray-400">{idx + 1}</td>

                        {/* Name */}
                        <td className="px-4 py-4 font-semibold text-gray-800 whitespace-nowrap">{bus.name}</td>

                        {/* Type badge */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${busTypeStyles[bus.type]}`}>
                            {bus.type}
                          </span>
                        </td>

                        {/* Departure */}
                        <td className="px-4 py-4 font-medium text-gray-700 whitespace-nowrap">{bus.departure}</td>

                        {/* Arrival */}
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{bus.arrival}</td>

                        {/* Duration */}
                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap">{bus.duration}</td>

                        {/* Amenities */}
                        <td className="px-4 py-4">
                          <div className="flex gap-1.5 flex-wrap min-w-[100px]">
                            {bus.amenities.length > 0
                              ? bus.amenities.map((a) => (
                                <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md whitespace-nowrap">
                                  {a}
                                </span>
                              ))
                              : <span className="text-gray-400 text-xs">—</span>
                            }
                          </div>
                        </td>

                        {/* Seats */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          {soldOut ? (
                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                              Sold out
                            </span>
                          ) : (
                            <span className={`text-sm font-semibold ${bus.seats <= 5 ? "text-orange-500" : "text-green-600"}`}>
                              {bus.seats} left
                            </span>
                          )}
                        </td>

                        {/* Rating */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <span className="text-amber-400">★</span>
                            <span className="text-gray-700 font-medium">{bus.rating.toFixed(1)}</span>
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-4 text-right whitespace-nowrap">
                          <span className="text-base font-bold text-gray-900">
                            ₹{bus.price.toLocaleString("en-IN")}
                          </span>
                          <span className="block text-xs text-gray-400">per seat</span>
                        </td>

                        {/* Book button */}
                        <td className="px-4 py-4 text-right whitespace-nowrap">
                          <button
                            disabled={soldOut}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${soldOut
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 active:scale-95 text-white"
                              }`}
                          >
                            {soldOut ? "Unavailable" : "Book Now"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}