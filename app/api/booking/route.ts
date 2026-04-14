import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req:Request) {
    try {
        const authHeader = req.headers.get("authorization")

        if (!authHeader) {
            return NextResponse.json({error: "No token provided"})
        }

        const token = authHeader.split("")[1];

        const decode =  Jwt.verify(token, process.env.JWT_SECRET!) as {
            userID : number;
            email: string;
        }

        const body = await req.json();

        if (!body.busId || !body.seatId) {
            return NextResponse.json({error: "BusID and SeatID is required"})
        }

        const exixtingBooking = await prisma.booking.findFirst({
            where: {
                busId : body.busId,
                seatId : body.seatId
            }
        })

        if (exixtingBooking) {
            return NextResponse.json({error: "Seat is alreay booked"})
        }

        const booking = await prisma.booking.create({
            data:{
                userId: decode.userID,
                seatId: body.seatId,
                busId: body.busId
            }
        })

        return NextResponse.json({
            message: "Booking successful",
            booking
        })
        
    } catch (error) {
        return NextResponse.json({error: "Invlid Token"})
    }
}