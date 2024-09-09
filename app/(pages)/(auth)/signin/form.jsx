"use client";

import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@mantine/form";
import { Button, TextInput, PasswordInput, Stack } from "@mantine/core";

const formSchema = z.object({
  email: z
    .string()
    .email("Email must be a valid email address")
    .min(2, { message: "Email must be at least 2 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(12, { message: "Password must be maximum 12 characters" }),
});

export default function SignInForm() {
  const form = useForm({
    schema: formSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    signIn("credentials", {
      callbackUrl: "/",
      email: values.email,
      password: values.password,
    });
  }

  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      className="w-full text-primary-foreground"
    >
      <Stack spacing="md">
        <TextInput
          label="Email address"
          placeholder="Email address"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" variant="filled">
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
