"use client";
import GoogleSignInButton from "../../components/auth/GoogleSignInButton";
import GithubSignInButton from "../../components/auth/GithubSignInButton";
import Image from "next/image";
import SignUpForm from "./form";

export default function Signup() {
  return (
    <div className="flex bg-background full-height">
      <div className="relative w-60">
        <Image
          src="/tour.png"
          objectFit="cover"
          layout="fill"
          alt="world tour"
        />
      </div>
      <div className="flex flex-col items-center text-center w-[440px] h-min-[700px] bg-primary text-primary-foreground px-16 py-8 my-8 mx-auto space-y-3 rounded-bl-sm rounded-tr-sm rounded-br-4xl rounded-tl-4xl border-[1.5px] border-primary-foreground">
        <h1 className="w-full font-bold text-3xl">Welcome to Travelog</h1>
        <div className="space-y-0">
          <p className="font-light text-xl">We saved you a seat</p>
          <p className="font-extralight text-sm">
            Create a free account to get started.
          </p>
        </div>
        <SignUpForm />
        <div className=" flex items-center w-full">
          <div className="flex-grow border-t border-primary-foreground"></div>
          <span className="mx-2 text-primary-foreground">or</span>
          <div className="flex-grow border-t border-primary-foreground"></div>
        </div>
        <div className="w-full space-y-3">
          <GoogleSignInButton />
          <GithubSignInButton />
          <p className="text-xs underline tracking-wide underline-offset-2">
            Do you have an account? Login here
          </p>
        </div>
      </div>
      <div className="relative w-60 transform rotate-180">
        <Image
          src="/tour.png"
          objectFit="cover"
          layout="fill"
          alt="world tour"
        />
      </div>
    </div>
  );
}
