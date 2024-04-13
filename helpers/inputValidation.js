import * as z from 'zod';

export const signUpInputValidation = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password is too long" }),
  passwordConfirm: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password confirmation is too long" }),
})
.refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"], // path of error
});
