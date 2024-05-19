'use server';

import { signOut } from '@/auth';

export async function logout() {
  // Write your logic if needed
  await signOut();
}
