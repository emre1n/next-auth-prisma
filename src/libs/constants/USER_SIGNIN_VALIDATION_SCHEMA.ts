import { z } from 'zod';

export const USER_SIGNIN_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

export type SignInFormValuesType = z.infer<
  typeof USER_SIGNIN_VALIDATION_SCHEMA
>;
