import { connectToDatabase } from "@/helpers/server";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) : Promise<NextResponse> => {
  try {
    const { name, email, password } : RegisterRequest = await req.json();
    if (!name || !email || !password)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    await connectToDatabase();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, hashedPassword },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
