import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const userId = session.user.id;

  try {
    const pinnedLocations = await prisma.pinnedLocation.findMany({
      where: {
        userId: userId,
      },
    });

    return new NextResponse(JSON.stringify({ pinnedLocations }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to get pinned locations" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
