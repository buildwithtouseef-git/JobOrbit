import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .regex(/[A-Z]/, "Password must contain one uppercase letter.")
            .regex(/[a-z]/, "Password must contain one lowercase letter.")
            .regex(/[0-9]/, "Password must contain one number.")
            .regex(/[^A-Za-z0-9]/, "Password must contain one special character."),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    });

export default resetPasswordSchema;