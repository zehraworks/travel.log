"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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

type FormValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    signIn("credentials", {
      callbackUrl: "/",
      email: values.email,
      password: values.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full text-primary-foreground"
    >
      <Stack gap="md">
        <TextInput
          label="Email address"
          placeholder="Email address"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" variant="filled">
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
