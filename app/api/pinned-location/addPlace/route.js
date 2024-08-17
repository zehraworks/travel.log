import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, desc, latitude, longitude, status, continent } =
    await req.json();

  const userId = session.user.id;

  try {
    const existingLocation = await prisma.pinnedLocation.findFirst({
      where: {
        latitude: latitude,
        longitude: longitude,
      },
    });

    if (existingLocation) {
      return new Response(
        JSON.stringify({
          error: "A place with the same latitude and longitude already exists.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const pinnedLocation = await prisma.pinnedLocation.create({
      data: {
        name,
        desc,
        latitude,
        longitude,
        status,
        continent,
        userId,
      },
    });

    return new Response(JSON.stringify(pinnedLocation), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create pinned location" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
