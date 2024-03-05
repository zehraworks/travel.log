import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
//import { useRouter } from "next/router";

const prisma = new PrismaClient();

export async function POST(request) {
   
  try {
    const { email, password } = await request.json();

    const name = "fatima";

    if (!email || !password) {
      return NextResponse.json({
        error: "Both email and password are required.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password:hashedPassword,
        name,
      },
    });
    NextResponse.json({ message: "User created successfully", user });
    //return NextResponse.redirect("/")
    //outer.push('/');
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      error: "An error occurred while creating the user.",
    });
  } finally {
    await prisma.$disconnect();
  }
}
