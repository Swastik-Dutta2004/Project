import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { error } from "console";


export async function POST(req:Request) {
    try {
        const authHeader = req.headers.get("authorization")

        if (!authHeader) {
            return NextResponse.json({error: "No token provided"})
        }

        const token = authHeader.split("")[1];

        
        
    } catch (error) {
        return NextResponse.json({error: "Invlid Token"})
    }
}