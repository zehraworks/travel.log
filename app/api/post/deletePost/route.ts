import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) : Promise<NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("Bad Request: Missing ID", { status: 400 });
  }

  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse(JSON.stringify(deletePost), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete post" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
