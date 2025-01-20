// /app/api/auth/checkEmail/route.ts
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const { email } = await req.json(); // Extract email from the request body

    if (!email) {
        return new NextResponse(
            JSON.stringify({ message: "Email is required" }),
            { status: 400 }
        );
    }

    try {
        // Check if the email already exists in the database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            return new NextResponse(
                JSON.stringify({ userExists: true, message: "Email already exists." }),
                { status: 200 }
            );
        }

        return new NextResponse(
            JSON.stringify({ userExists: false, message: "Email is available." }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Server error" }),
            { status: 500 }
        );
    }
};
