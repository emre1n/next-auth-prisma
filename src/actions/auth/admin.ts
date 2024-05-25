'use server';

import { currentRole } from '@/libs/auth';
import { UserRole } from '@prisma/client';

export async function admin() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return {
      success: true,
      message: 'Allowed API Route!',
    };
  }

  return {
    success: false,
    message: 'Forbidden API Route!',
  };
}
