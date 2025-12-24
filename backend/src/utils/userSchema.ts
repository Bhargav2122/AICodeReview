import { z } from 'zod';

export const signUpSchema = z.object({
    fullname: z.string(),
    email: z.email('Invalid Email'),
    password: z.string().min(6, 'Password must be 6+ chars'),
})

export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})
