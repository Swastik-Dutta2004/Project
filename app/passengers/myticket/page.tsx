"use client"

import { useSearchParams } from "next/navigation";

export default function TicketPage() {
  const Params = useSearchParams()

  const busID = Params.get("busId")
  const busTo = Params.get("to")
  const busfrom = Params.get("from")
  const busDate = Params.get("date")
  const busPassengers = Params.get("passengers")
  const busTotalPrice = Params.get("price")
  
  return (
    <div>
      <h1>Ticket Details: </h1>
      <p>BusID: {busID}</p>
      <p>From: {busfrom}</p>
      <p>To: {busTo}</p>
      <p>Date: {busDate}</p>
      <p>Passenges: {busPassengers}</p>
      <p>Price: {busTotalPrice}</p>
    </div>
  )
}
