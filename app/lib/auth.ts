
import type { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type UserWithAccounts = Prisma.UserGetPayload<{
    include: { accounts: true };
}>;


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please provide both email and password.");
                }

                const user: UserWithAccounts | null = await prisma.user.findUnique({
                    where: { email: credentials.email }, include: {
                        accounts: true,
                    },
                });

                if (!user) {
                    throw new Error("No user found with this email.");
                }


                if (!user.hashedPassword) {

                    const registeredProvider = user?.accounts?.[0]?.provider;
                    if (registeredProvider) {
                        throw new Error(
                            `This email is registered with another provider: ${registeredProvider}. Please use that provider to log in.`
                        );
                    }

                    throw new Error("This account does not have a password set.");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid password.");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            }

        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                name: session.user?.name ?? null,
                email: session.user?.email ?? null,
                image: session.user?.image ?? null,
            };
            return session;
        },
        async signIn({ user, account }) {

            const provider = account?.provider;
            const email = user?.email;


            if (!email) {
                throw new Error("Email required to sign in.");
            }


            const existingUser = await prisma.user.findUnique({
                where: { email },
                include: {
                    accounts: true,
                },
            });

            if (existingUser) {

                const existingProvider = existingUser.accounts.find(
                    (acc) => acc.provider !== provider
                );

                if (existingProvider) {
                    throw new Error(
                        `This email has been registered with another login method: ${existingProvider.provider}. Please log in using that method.`
                    );
                }
            }

            return true;
        },

    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: "/signin",
    },
};
