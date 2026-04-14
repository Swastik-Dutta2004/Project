import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export async function GET(req: Request){
    try {
        const authHeader = req.headers.get("authorization")

        if (!authHeader) {
            return NextResponse.json({error: "No token provided"})
        }

        const token = authHeader.split(" ")[1]

        const decode = Jwt.verify(token, process.env.JWT_SECRET!)
        
        return NextResponse.json({
            message: "Access granted",
            user: decode
        })
    } catch (error) {
        return NextResponse.json({error: "Invalid token"})
    }
}