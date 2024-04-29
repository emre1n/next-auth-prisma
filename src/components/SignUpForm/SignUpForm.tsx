'use client';

import { useForm, FormProvider } from 'react-hook-form';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  USER_SIGNUP_VALIDATION_SCHEMA,
  SignUpFormValuesType,
} from '@/libs/constants/USER_SIGNUP_VALIDATION_SCHEMA';

type Inputs = SignUpFormValuesType;

/**
 * FORM INITIALIZATION
 */
const defaultFormValues = {
  username: '',
  email: '',
  name: '',
  password: '',
};

export default function SignUpForm() {
  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_SIGNUP_VALIDATION_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: Inputs) => {
    console.log(data);
    reset({ ...defaultFormValues });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 w-full">
          <FormFieldTextInput
            label="Name"
            fieldName="name"
            placeholder="Enter your name"
          />
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
          <FormFieldTextInput
            label="Password"
            fieldName="password"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
