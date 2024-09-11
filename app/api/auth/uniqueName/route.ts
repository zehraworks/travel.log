import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return new NextResponse(JSON.stringify({ message: "Name is required" }), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findMany({ where: { name } });

    if (user) {
      return new NextResponse(
        JSON.stringify({ isUnique: false, message: "Name must be unique" }),
        { status: 400 }
      );
    }

    return new NextResponse(JSON.stringify({ isUnique: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
