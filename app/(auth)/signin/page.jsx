"use client"
import GoogleSignInButton from "../../components/auth/GoogleSignInButton";
import GithubSignInButton from "../../components/auth/GithubSignInButton";

export default function SignIn() {
  return (
    <div>
      SignIn Page
      <GoogleSignInButton />
      <GithubSignInButton />
    </div>
  );
}
