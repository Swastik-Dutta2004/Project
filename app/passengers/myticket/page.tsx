import { useSearchParams } from "next/navigation";

export default function TicketPage() {
  const Params = useSearchParams()

  const busID = Params.get("busId")
  const busTo = Params.get("busTo")
  const busfrom = Params.get("busfrom")
  const busDate = Params.get("busDate")
  const busPassengers = Params.get("busPassengers")
  const busTotalPrice = Params.get("busTotalPrice")

  return (
    <div>
      <h1>Ticket Details: </h1>
      <p>BusID:{busID}</p>
      <p>From:{busfrom}</p>
      <p>To:{busTo}</p>
      <p>Date:{busDate}</p>
      <p>Passenges:{busPassengers}</p>
      <p>Price:{busTotalPrice}</p>
    </div>
  )
}
