'use client';

import FormFieldPasswordInput from '@/components/form-components/FormFieldPasswordInput';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import {
  SignUpFormValuesType,
  USER_SIGNUP_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_SIGNUP_VALIDATION_SCHEMA';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = SignUpFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  username: '',
  email: '',
  password: '',
};

interface SignUpFormProps {
  createUser: Function;
}

export default function SignUpForm({ createUser }: SignUpFormProps) {
  const router = useRouter();

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_SIGNUP_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await createUser(data);
      if (response.success) {
        router.push('/sign-in');
      } else {
        throw new Error(response.message || 'Error signing up');
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
            label="Username"
            fieldName="username"
            placeholder="Enter your username"
          />
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
          Sign up
        </Button>
        <p className="text-center text-sm text-gray-600 mt-2">
          If you already have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
