"use client";

import React from "react";
import Image from "next/image";
import { Menu, Text, Button, Group, Divider } from "@mantine/core";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../public/logo.svg";

type SessionUser = {
  name?: string;
  email?: string;
  image?: string;
};

function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/signin");
  };

  if (session) {
    const user = session.user as SessionUser;

    return (
      <Menu>
        <Menu.Target>
          <Group>
            {user.image && (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={40}
                height={40}
              />
            )}
            <Text size="lg">{user.name}</Text>
          </Group>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>My Account</Menu.Label>
          <Divider />
          <Menu.Item onClick={() => signOut()} color="gray">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return <Button onClick={handleRedirect}>Sign In</Button>;
}

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <div className="bg-background text-foreground flex w-full h-[140px] justify-center py-5">
      <div className="container flex flex-row justify-between items-center text-2xl font-medium">
        <Image
          alt="logo"
          src={logo}
          width={80}
          height={80}
          className="invert dark:invert-0"
        />
        <div className="flex text-xl space-x-24 mt-10">
          <Text>HOME</Text>
          <Text>ABOUT US</Text>
          <Text>BLOG</Text>
          {pathname !== "/register" && <AuthButton />}
        </div>
      </div>
    </div>
  );
}
