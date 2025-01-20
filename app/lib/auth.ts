
import type { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("No user found with this email.");
                }

                if (!user.hashedPassword) {
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
            if (!user.email) {
                throw new Error("Email is required");
            }

            // E-posta ile var olan kullanıcıyı bul
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email as string },
            });

            if (existingUser) {

                await prisma.account.upsert({
                    where: {
                        provider_providerAccountId: {
                            provider: account?.provider as string,
                            providerAccountId: account?.providerAccountId as string,
                        },
                    },
                    update: { userId: existingUser.id },
                    create: {
                        provider: account?.provider as string,
                        providerAccountId: account?.providerAccountId as string,
                        type: account?.type || "oauth",
                        userId: existingUser.id,
                    },
                });
            } else {

                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        accounts: {
                            create: {
                                provider: account?.provider as string,
                                providerAccountId: account?.providerAccountId as string,
                                type: account?.type || "credentials",
                            },
                        },
                    },
                });
            }

            return true;
        }

    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: "/signin",
    },
};
