"use client";
import GoogleSignInButton from "../../components/auth/GoogleSignInButton";
import GithubSignInButton from "../../components/auth/GithubSignInButton";
import SignInForm from "./form";

export default function SignIn() {
  return (
    <div>
      SignIn Page
      <SignInForm />
      <GoogleSignInButton />
      <GithubSignInButton />
    </div>
  );
}
