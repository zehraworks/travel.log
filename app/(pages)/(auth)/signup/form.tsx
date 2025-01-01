"use client";

import React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, PasswordInput, Button, Alert } from "@mantine/core";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Define the schema with Zod
const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(12, { message: "Password must be maximum 12 characters" }),
    passwordMatch: z.string(),
  })
  .refine((data) => data.password === data.passwordMatch, {
    message: "Passwords do not match",
    path: ["passwordMatch"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordMatch: "",
    },
  });

  const checkUniqueName = async (name: string): Promise<boolean> => {
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

  const onSubmit = async (values: FormValues) => {
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
      setError((error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 w-full text-primary-foreground"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Name"
            placeholder="name"
            {...field}
            error={errors.name?.message}
          />
        )}
      />
      {nameError && <Alert color="red">{nameError}</Alert>}

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Email"
            placeholder="email"
            {...field}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label="Password"
            placeholder="password"
            {...field}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        name="passwordMatch"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label="Confirm Password"
            placeholder="confirm password"
            {...field}
            error={errors.passwordMatch?.message}
          />
        )}
      />

      {error && <Alert color="red">{error}</Alert>}

      <Button fullWidth type="submit" variant="filled" color="#DD6224">
        Submit
      </Button>
    </form>
  );
}
