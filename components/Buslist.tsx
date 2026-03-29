"use client";
import BusCard from "./BusCard";
import buses from "@/public/buses.json";
import { useSearchParams } from "next/navigation";

export default function BusList() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  return (
    <div className="flex flex-col gap-6">
      {buses.buses.map((bus) => (
        <BusCard key={bus.id} bus={bus} from={from} to={to} />
      ))}
    </div>
  );
}