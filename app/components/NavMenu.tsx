"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  Menu,
  Text,
  Button,
  Group,
  Divider,
  Avatar,
  UnstyledButton,
  Anchor,
} from "@mantine/core";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../public/logo.svg";

type SessionUser = {
  name?: string;
  email?: string;
  image?: string;
};

import { forwardRef } from "react";
import { FiChevronRight } from "react-icons/fi";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string | undefined;
  name: string | undefined;
  email: string | undefined;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <FiChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/signin");
  };

  if (session) {
    const user = session.user as SessionUser;

    return (
      <Menu
        shadow="md"
        width={200}
        trigger="hover"
        openDelay={100}
        closeDelay={400}
      >
        <Menu.Target>
          <UserButton
            image={user?.image}
            name={user?.name}
            email={user?.email}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>My Account</Menu.Label>
          <Divider />
          <Menu.Item color="gray">heyyo</Menu.Item>
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
    <div className="bg-background  text-foreground flex w-full h-[140px] justify-center py-5">
      <div className="container flex flex-row justify-between items-center text-2xl font-medium">
        <Image
          alt="logo"
          src={logo}
          width={80}
          height={80}
          className="invert dark:invert-0"
        />
        <div className="flex items-center text-xl space-x-24">
          <Anchor component={Link} href="/" underline="never" c="white">
            HOME
          </Anchor>
          <Anchor component={Link} href="/blog" underline="never" c="white">
            BLOG
          </Anchor>
          <Anchor component={Link} href="/aboutUs" underline="never" c="white">
            ABOUT US
          </Anchor>
          {pathname !== "/register" && <AuthButton />}
        </div>
      </div>
    </div>
  );
}
