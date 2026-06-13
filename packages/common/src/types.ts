import { z } from "zod";

export const createUserScheme = z.object({
    name: z.string().min(3).max(100),
    password: z.string().min(6).max(100),
})

export const signinScheme = z.object({
    name: z.string().min(3).max(20),
    password: z.string().min(6).max(100),
})

export const createroom = z.object({
    name: z.string().min(3).max(100),
    userId : z.string()
})