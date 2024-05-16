import { z } from 'zod';

export const USER_REGISTER_VALIDATION_SCHEMA = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Minimun of 8 characters required'),
});

export type RegisterFormValuesType = z.infer<
  typeof USER_REGISTER_VALIDATION_SCHEMA
>;
