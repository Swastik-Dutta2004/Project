import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const text = await req.text();

    if (!text) {
      return NextResponse.json({ error: "No data provided" });
    }

    const body = JSON.parse(text);

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: "passenger",
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" });
    }

    return NextResponse.json({ error: "Something went wrong" });
  }
}