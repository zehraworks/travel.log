import prisma from "@/prisma";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return new Response(JSON.stringify({ message: "Name is required" }), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { name } });

    if (user) {
      return new Response(
        JSON.stringify({ isUnique: false, message: "Name must be unique" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ isUnique: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
};
