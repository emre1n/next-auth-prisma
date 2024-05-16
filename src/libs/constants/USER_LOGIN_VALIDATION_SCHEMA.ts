import { z } from 'zod';

export const USER_LOGIN_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Minimun of 8 characters required'),
});

export type LoginFormValuesType = z.infer<typeof USER_LOGIN_VALIDATION_SCHEMA>;
