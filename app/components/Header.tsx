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
import logoDark from "../../public/logo-dark.png";
import logoWhite from "../../public/logo-white.png";
import { IoPerson } from "react-icons/io5";
import { PiLampPendantFill } from "react-icons/pi";

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
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => {
    return (
      <UnstyledButton ref={ref} {...others}>
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
    );
  }
);

UserButton.displayName = "UserButton";

function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRedirectSignin = () => {
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
          <Menu.Item color="gray">
            <Anchor
              component={Link}
              underline="never"
              href={`/profile/${user?.name}`}
            >
              Profile
            </Anchor>
          </Menu.Item>
          <Menu.Item onClick={() => signOut()} color="gray">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <Button onClick={handleRedirectSignin} unstyled>
      <IoPerson size="1.5rem" />
    </Button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleRedirectHome = () => {
    router.push("/");
  };
  return (
    <div className=" text-black  dark:text-white flex w-full h-[140px] justify-center py-5">
      <div className="container flex flex-row justify-between items-center text-2xl font-medium">
        <Image
          onClick={handleRedirectHome}
          alt="logo"
          src={logoWhite}
          width={120}
          height={120}
          className="hidden dark:block"
        />
        <Image
          onClick={handleRedirectHome}
          alt="logo"
          src={logoDark}
          width={120}
          height={120}
          className="dark:hidden "
        />
        <div className="flex items-center text-xl space-x-24">
          <Anchor
            component={Link}
            href="/"
            underline="never"
            unstyled
            className="text-inherit text-base"
          >
            HOME
          </Anchor>
          <Anchor
            component={Link}
            href="/blog"
            underline="never"
            unstyled
            className="text-inherit text-base"
          >
            BLOG
          </Anchor>
          <Anchor
            component={Link}
            href="/aboutUs"
            underline="never"
            unstyled
            className="text-inherit text-base"
          >
            ABOUT US
          </Anchor>
        </div>
        <div className="flex items-center space-x-6">
          {pathname !== "/register" && <AuthButton />}
          <PiLampPendantFill size="1.5rem" />
          {/*           <Image color="red" alt="logo" src={lamp} width={30} height={30} />
           */}
        </div>
      </div>
    </div>
  );
}
