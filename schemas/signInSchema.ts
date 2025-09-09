import * as z from 'zod';

export const signInSchema = z.object({
  identifier: z
    .email('Please enter a valid email address')
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
