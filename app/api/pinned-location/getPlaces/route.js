import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
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

    return new Response(JSON.stringify({ pinnedLocations }));
  } catch (error) {
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
