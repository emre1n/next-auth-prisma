import { z } from 'zod';

export const USER_NEW_PASSWORD_VALIDATION_SCHEMA = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Minimun of 8 characters required'),
});

export type NewPasswordFormValuesType = z.infer<
  typeof USER_NEW_PASSWORD_VALIDATION_SCHEMA
>;
