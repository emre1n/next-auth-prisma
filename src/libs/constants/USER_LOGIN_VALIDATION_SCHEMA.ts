import { z } from 'zod';

export const USER_LOGIN_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Minimun of 8 characters required'),
  code: z.optional(z.string().min(6, 'Invalid code')),
});

export type LoginFormValuesType = z.infer<typeof USER_LOGIN_VALIDATION_SCHEMA>;
