import { z } from 'zod';

const CREATE_VALIDATION_SCHEMA = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  name: z.string().min(1, 'Name is required').max(100),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

export default CREATE_VALIDATION_SCHEMA;
