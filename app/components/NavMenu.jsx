"use client";
import Image from "next/image";
import logo from "../../public/logo.svg";

export default function NavMenu() {
  return (
    <div className="flex w-full justify-center bg-primary-light text-black dark:bg-primary-dark dark:text-white py-5">
      <div className="container flex flex-row justify-between items-center text-2xl font-medium">
        <div>
          <Image className="invert dark:invert-0" src={logo} />
        </div>
        <div className="flex space-x-24 mt-10">
          <h1>HOME</h1>
          <h1>ABOUT US</h1>
          <h1>BLOG</h1>
        </div>
      </div>
    </div>
  );
}
