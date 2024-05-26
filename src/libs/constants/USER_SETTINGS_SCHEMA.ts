import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const USER_SETTINGS_SCHEMA = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    data => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required!',
      path: ['newPassword'],
    },
  )
  .refine(
    data => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: 'Current password is required!',
      path: ['password'],
    },
  );

export type SettingsFormValueType = z.infer<typeof USER_SETTINGS_SCHEMA>;
