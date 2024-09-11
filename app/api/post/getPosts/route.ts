import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  const url = new URL(req.url);
  const placeId = url.searchParams.get("placeId");

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const userId = session.user.id;

  if (!placeId) {
    return new NextResponse(JSON.stringify({ error: "placeId is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
        pinnedLocationId: placeId,
      },
    });

    return new NextResponse(JSON.stringify({ posts }));
  } catch (error) {
    console.error("API Error:", error);

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
