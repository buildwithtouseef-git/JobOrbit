import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z.string().trim().min(2, "Full name must be at least 2 characters.").max(80),
        username: z.string().trim().min(3, "Username must be at least 3 characters.").max(40),
        email: z.string().trim().email("Please enter a valid email address."),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .regex(/[A-Z]/, "Password must contain one uppercase letter.")
            .regex(/[a-z]/, "Password must contain one lowercase letter.")
            .regex(/[0-9]/, "Password must contain one number.")
            .regex(/[^A-Za-z0-9]/, "Password must contain one special character."),
        confirmPassword: z.string(),
        termsAccepted: z.boolean().refine((value) => value, {
            message: "You must accept the terms and conditions.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    });

export default registerSchema;