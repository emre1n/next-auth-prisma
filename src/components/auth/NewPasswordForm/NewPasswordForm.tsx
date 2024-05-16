'use client';

import { newPassword } from '@/actions/auth/new-password';
import FormToaster from '@/components/auth/FormToaster';
import FormFieldPasswordInput from '@/components/form-components/FormFieldPasswordInput';
import Button from '@/components/ui/Button';
import {
  NewPasswordFormValuesType,
  USER_NEW_PASSWORD_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_NEW_PASSWORD_VALIDATION_SCHEMA';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = NewPasswordFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  password: '',
};

export default function NewPasswordForm() {
  const [formState, setFormState] = useState<{
    status: 'success' | 'error' | undefined;
    message: string | undefined;
  }>({ status: undefined, message: '' });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_NEW_PASSWORD_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Inputs) => {
    startTransition(() => {
      newPassword(data, token).then(response => {
        if (response && !response.success) {
          setFormState({ status: 'error', message: response?.message });
        } else {
          setFormState({ status: 'success', message: response?.message });
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      });
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <FormFieldPasswordInput
            label="Password"
            fieldName="password"
            disabled={isPending}
            placeholder="********"
          />
        </div>
        <FormToaster state={formState.status} message={formState.message} />
        <div className="flex flex-col gap-6">
          <Button type="submit" intent="primary" disabled={isPending}>
            Reset Password
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
