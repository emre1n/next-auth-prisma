'use client';

import { login } from '@/actions/auth/login';
import FormToaster from '@/components/auth/FormToaster';
import FormFieldPasswordInput from '@/components/form-components/FormFieldPasswordInput';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import {
  LoginFormValuesType,
  USER_LOGIN_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_LOGIN_VALIDATION_SCHEMA';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import SocialLogin from '../SocialLogin';

type Inputs = LoginFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const [formState, setFormState] = useState<{
    status: 'success' | 'error' | undefined;
    message: string | undefined;
  }>({ status: undefined, message: '' });

  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_LOGIN_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: Inputs) => {
    startTransition(() => {
      login(data)
        .then(response => {
          if (!response?.success) {
            setFormState({ status: 'error', message: response?.message });
          }

          if (response?.success) {
            setFormState({ status: 'success', message: response?.message });
          }

          if (response?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() =>
          setFormState({ status: 'error', message: 'Something went wrong!' }),
        );
    });
  };

  const handleForgotPassword = () => {
    router.push('/reset-password');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {showTwoFactor && (
            <>
              <FormFieldTextInput
                label="Two Factor Code"
                fieldName="code"
                disabled={isPending}
                placeholder="123456"
              />
            </>
          )}

          {!showTwoFactor && (
            <>
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
                placeholder="********"
              />
              <Button
                className="self-end"
                intent="link"
                size="small"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Button>
            </>
          )}
        </div>
        <FormToaster state={formState.status} message={formState.message} />
        <div className="flex flex-col gap-6">
          <Button type="submit" intent="primary" disabled={isPending}>
            {showTwoFactor ? 'Confirm' : 'Login'}
          </Button>

          <SocialLogin />
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">
          Don&apos;t have an account,&nbsp;
          <Link className="text-blue-500 hover:underline" href="/register">
            Register
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
