import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        } & DefaultSession["user"];
    }

    interface JWT {
        id?: string;
    }
}
