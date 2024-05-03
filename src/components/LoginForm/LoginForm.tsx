'use client';

import { signIn } from '@/auth';
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
  const router = useRouter();

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_LOGIN_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Inputs) => {
    console.log('Form data:', data);

    // const signInData = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    // });

    // console.log('Sign in data:', signInData);

    // if (signInData?.error) {
    //   console.error('Error signing in:', signInData.error);
    //   return;
    // } else {
    //   console.log('Sign in successful:', signInData);
    //   router.push('/admin');
    // }
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
          <Link className="text-blue-500 hover:underline" href="/register">
            Register
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
