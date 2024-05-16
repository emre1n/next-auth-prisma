'use client';

import { resetPassword } from '@/actions/auth/reset';
import FormToaster from '@/components/auth/FormToaster';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import {
  ResetFormValuesType,
  USER_PASSWORD_RESET_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_PASSWORD_RESET_VALIDATION_SCHEMA';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = ResetFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  email: '',
};

export default function ResetForm() {
  const [formState, setFormState] = useState<{
    status: 'success' | 'error' | undefined;
    message: string | undefined;
  }>({ status: undefined, message: '' });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_PASSWORD_RESET_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Inputs) => {
    startTransition(() => {
      console.log('data=>', data);
      resetPassword(data).then(response => {
        if (response && !response.success) {
          setFormState({ status: 'error', message: response?.message });
        } else {
          setFormState({ status: 'success', message: response?.message });
        }
      });
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <FormFieldTextInput
            label="Email"
            fieldName="email"
            disabled={isPending}
            placeholder="mail@example.com"
          />
        </div>
        <FormToaster state={formState.status} message={formState.message} />
        <div className="flex flex-col gap-6">
          <Button type="submit" intent="primary" disabled={isPending}>
            Send reset email
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
