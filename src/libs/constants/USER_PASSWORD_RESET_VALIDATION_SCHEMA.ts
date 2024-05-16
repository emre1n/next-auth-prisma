import { z } from 'zod';

export const USER_PASSWORD_RESET_VALIDATION_SCHEMA = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

export type ResetFormValuesType = z.infer<
  typeof USER_PASSWORD_RESET_VALIDATION_SCHEMA
>;
