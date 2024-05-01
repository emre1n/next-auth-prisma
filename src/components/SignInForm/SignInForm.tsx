'use client';

import FormFieldPasswordInput from '@/components/form-components/FormFieldPasswordInput';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import {
  SignInFormValuesType,
  USER_SIGNIN_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_SIGNIN_VALIDATION_SCHEMA';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = SignInFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  email: '',
  password: '',
};

interface SignInFormProps {
  signInUser: Function;
}

export default function SignInForm({ signInUser }: SignInFormProps) {
  const router = useRouter();

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_SIGNIN_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await signInUser(data);
      if (response.success) {
        router.push('/');
      } else {
        throw new Error(response.message || 'Error signing in');
      }
    } catch (error) {
      console.error(error);
      // TODO: Show this error message to the user
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="space-y-3">
          <FormFieldTextInput
            label="Email"
            fieldName="email"
            placeholder="mail@example.com"
          />
          <FormFieldPasswordInput
            label="Password"
            fieldName="password"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" intent="primary">
          Sign in
        </Button>
        <p className="text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account,&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-up">
            Sign up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
