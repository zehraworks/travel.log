"use client";

import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 character" })
      .max(12, { message: "Password must be maximum 12 character" }),
    passwordMatch: z.string(),
  })
  .refine((data) => data.password === data.passwordMatch, {
    message: "Passwords do not match",
    path: ["passwordMatch"],
  });

export default function SignUpForm() {
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordMatch: "",
    },
  });

  const checkUniqueName = async (name) => {
    setNameError(null);

    try {
      const response = await fetch(`/api/auth/uniqueName?name=${name}`);
      const data = await response.json();

      if (!data.isUnique) {
        setNameError("Name must be unique");
        return false;
      }
      return true;
    } catch (error) {
      setNameError("Server error");
      return false;
    }
  };

  const onSubmit = async (values) => {
    setError(null);

    const isUnique = await checkUniqueName(values.name);
    if (!isUnique) return;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>This is your username</FormDescription>
              <FormMessage />
              {nameError && <div className="text-red-500">{nameError}</div>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>This is your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormDescription>This is your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordMatch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Match</FormLabel>
              <FormControl>
                <Input type="password" placeholder="passwordMatch" {...field} />
              </FormControl>
              <FormDescription>This is your password match</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
