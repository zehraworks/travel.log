import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  const url = new URL(req.url);
  const placeId = url.searchParams.get("placeId");
  console.log("plll", placeId);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const userId = session.user.id;

  if (!placeId) {
    return new Response(JSON.stringify({ error: "placeId is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const post = await prisma.post.findMany({
      where: {
        authorId: userId,
        pinnedLocationId: placeId,
      },
    });

    console.log("postii", post);

    return new Response(JSON.stringify({ post }));
  } catch (error) {
    console.error("API Error:", error);

    return new Response(
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
