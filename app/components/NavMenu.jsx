"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function AuthButton() {
  const { data: session } = useSession();

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/signin");
  };

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg font-semibol text-slate-600 cursor-pointer sm:text-sm hover:text-slate-800 flex items-center dark:text-gray-300 dark:hover:text-gray-400">
          {
            <Image
              src={session?.user?.image}
              alt={session?.user?.name}
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
          }
          <h1 className="text-2xl">{session.user?.name}</h1>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-slate-500"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return <button onClick={handleRedirect}>SignIn</button>;
}

export default function NavMenu() {
  const pathName = usePathname();
  return (
    <div className="flex w-full h-48 justify-center bg-primary-light text-black dark:bg-primary-dark dark:text-white py-5">
      <div className="container flex flex-row justify-between items-center text-2xl font-medium">
        <div>
          <Image className="invert dark:invert-0" src={logo} />
        </div>
        <div className="flex space-x-24 mt-10">
          <h1>HOME</h1>
          <h1>ABOUT US</h1>
          <h1>BLOG</h1>
          {pathName !== "/register" && <AuthButton />}
        </div>
      </div>
    </div>
  );
}
