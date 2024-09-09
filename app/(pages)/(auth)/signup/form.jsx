"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Alert } from "@mantine/core";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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

export default function SignUpForm() {
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const router = useRouter();

  const form = useForm({
    schema: formSchema,
    initialValues: {
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
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      className="space-y-3 w-full text-primary-foreground"
    >
      <TextInput
        label="Name"
        placeholder="name"
        {...form.getInputProps("name")}
        error={form.errors.name}
      />
      {nameError && <Alert color="red">{nameError}</Alert>}

      <TextInput
        label="Email"
        placeholder="email"
        {...form.getInputProps("email")}
        error={form.errors.email}
      />

      <PasswordInput
        label="Password"
        placeholder="password"
        {...form.getInputProps("password")}
        error={form.errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="confirm password"
        {...form.getInputProps("passwordMatch")}
        error={form.errors.passwordMatch}
      />

      {error && <Alert color="red">{error}</Alert>}

      <Button type="submit" variant="filled" color="blue">
        Submit
      </Button>
    </form>
  );
}
