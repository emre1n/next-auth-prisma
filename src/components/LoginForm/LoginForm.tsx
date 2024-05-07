'use client';

import { login } from '@/actions/db/login';
import FormToaster from '@/components/FormToaster';
import FormFieldPasswordInput from '@/components/form-components/FormFieldPasswordInput';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import {
  LoginFormValuesType,
  USER_LOGIN_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = LoginFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const [formStatus, setFormStatus] = useState<'success' | 'error' | undefined>(
    undefined,
  );
  const [message, setMessage] = useState<string | undefined>('');

  const [isPending, startTransition] = useTransition();

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_LOGIN_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Inputs) => {
    startTransition(() => {
      login(data).then(response => {
        if (response.error) {
          setMessage(response.error);
          setFormStatus('error');
        } else {
          setMessage(response.success);
          setFormStatus('success');
        }
      });
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="space-y-3">
          <FormFieldTextInput
            label="Email"
            fieldName="email"
            disabled={isPending}
            placeholder="mail@example.com"
          />
          <FormFieldPasswordInput
            label="Password"
            fieldName="password"
            disabled={isPending}
            placeholder="Enter your password"
          />
        </div>
        <FormToaster state={formStatus} message={message} />
        <Button type="submit" intent="primary" disabled={isPending}>
          Login
        </Button>
        <p className="text-center text-sm text-gray-600 mt-2">
          Don&apos;t have an account,&nbsp;
          <Link className="text-blue-500 hover:underline" href="/register">
            Register
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
