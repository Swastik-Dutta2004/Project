import Link from "next/link";

interface Bus {
  id: number;
  name: string;
  type: string;
  departure: string;
  arrival: string;
  price: number;
  seats: number;
  rating: number;
}


export default function BusCard({ bus, from, to }: { bus: Bus; from: string; to: string }) {
  return (
    <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">

      {/* Bus Info */}
      <div>
        <h2 className="text-lg font-semibold">{bus.name}</h2>
        <p className="text-gray-500 text-sm">{bus.type}</p>
      </div>

      {/* Route */}
      <div className="text-center">
        <p className="font-semibold">{bus.departure}</p>
        <p className="text-sm text-gray-500">
          {from} → {to}
        </p>
        <p className="font-semibold">{bus.arrival}</p>
      </div>

      {/* Price */}
      <div className="text-center">
        <p className="text-xl font-bold text-blue-600">₹{bus.price}</p>
        <p className="text-sm text-gray-500">{bus.seats} seats left</p>
      </div>

      {/* Book Button */}
      <Link href={`/buy-ticket/${bus.id}`}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </Link>

    </div>
  );
}