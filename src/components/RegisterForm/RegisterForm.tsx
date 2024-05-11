'use client';

import FormToaster from '@/components/FormToaster/FormToaster';
import FormFieldPasswordInput from '@/components/form-components/FormFieldPasswordInput';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import GoogleOAuthIcon from '@/components/icons/GoogleOAuthIcon';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import {
  RegisterFormValuesType,
  USER_REGISTER_VALIDATION_SCHEMA,
} from '@/libs/constants/USER_REGISTER_VALIDATION_SCHEMA';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = RegisterFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  name: '',
  email: '',
  password: '',
};

interface RegisterFormProps {
  createUser: Function;
}

interface ResponseType {
  success: boolean;
  message: string;
}

export default function RegisterForm({ createUser }: RegisterFormProps) {
  const [formStatus, setFormStatus] = useState<'success' | 'error' | undefined>(
    undefined,
  );
  const [message, setMessage] = useState<string | undefined>('');

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_REGISTER_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: Inputs) => {
    startTransition(() => {
      createUser(data).then((response: ResponseType) => {
        if (!response.success) {
          setMessage(response.message);
          setFormStatus('error');
        } else {
          setMessage(response.message);
          setFormStatus('success');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      });
    });
  };

  const handleGoogleOAuth = () => {
    // Handle Google OAuth
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="space-y-3">
          <FormFieldTextInput
            label="Name"
            fieldName="name"
            disabled={isPending}
            placeholder="username123"
          />
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
        </div>
        <FormToaster state={formStatus} message={message} />
        <div className="flex flex-col gap-6">
          <Button type="submit" intent="primary" disabled={isPending}>
            Sign up
          </Button>

          <Separator>OR CONTINUE WITH</Separator>

          <Button
            intent="secondary"
            onClick={handleGoogleOAuth}
            icon={<GoogleOAuthIcon />}
          ></Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?&nbsp;
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
