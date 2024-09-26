//src/validators/AuthValidators.ts
import { z } from "zod";
import { UserRole } from "../types";

const signUpSchema = z.object({
    username: z.string().min(1, { message: "Username cannot be empty" }),
    email: z.string()
        .min(1, { message: "Email cannot be empty" })
        .email({ message: "Input a valid email" }),
    role: z.enum([UserRole.EMPLOYER, UserRole.JOB_SEEKER], { 
        errorMap: () => ({ message: "Role is required" }) 
    }), // Role is now required
    password: z.string().min(1, { message: "Password cannot be empty" }),
});

const signInSchema = z.object({
    email: z.string()
        .min(1, { message: "Email cannot be empty" })
        .email({ message: "Input a valid email" }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
});

export { signUpSchema, signInSchema };
