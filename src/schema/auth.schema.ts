import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name is too short." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(8, { message: "Must be atleast 8 characters." }),
    confirm_password: z.string(),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password don't match.",
        path: ["confirm_password"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
