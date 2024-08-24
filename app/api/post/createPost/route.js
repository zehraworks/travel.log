import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, content, pinnedLocationId } = await req.json();

  const authorId = session.user.id;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        pinnedLocationId,
      },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
