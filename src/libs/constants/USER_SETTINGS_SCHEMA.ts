import { z } from 'zod';

export const USER_SETTINGS_SCHEMA = z.object({
  name: z.optional(z.string()),
});

export type SettingsFormValueType = z.infer<typeof USER_SETTINGS_SCHEMA>;
