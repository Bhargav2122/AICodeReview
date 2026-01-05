import {z} from 'zod';

export const signupSchema = z.object({
    fullname: z.string().min(3,"Fullname must be atleast 3 characters"),
    email: z.email("Invalid Email"),
    password: z.string().min(6," Password must be 6 characters")
});
export const signinSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string().min(6," Password must be 6 characters")
});

export type SignupForm = z.infer<typeof signupSchema>
export type SigninForm = z.infer<typeof signinSchema>