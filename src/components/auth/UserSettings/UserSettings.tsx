'use client';

import settings from '@/actions/auth/settings';
import FormToaster from '@/components/auth/FormToaster';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import {
  type SettingsFormValueType,
  USER_SETTINGS_SCHEMA,
} from '@/libs/constants/USER_SETTINGS_SCHEMA';
import { ExtendedUser } from '@/next-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = SettingsFormValueType;

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export default function UserInfo({ user, label }: UserInfoProps) {
  const [formState, setFormState] = useState<{
    status: 'success' | 'error' | undefined;
    message: string | undefined;
  }>({ status: undefined, message: '' });
  const [isPending, startTransition] = useTransition();

  const { update } = useSession();

  /**
   * FORM INITIALIZATION
   */
  const defaultFormValues = {
    name: user?.name || undefined,
  };

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_SETTINGS_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: Inputs) => {
    startTransition(() => {
      settings(data)
        .then(response => {
          if (!response?.success) {
            setFormState({ status: 'error', message: response?.message });
          }
          if (response?.success) {
            update();
            setFormState({ status: 'success', message: response?.message });
            setTimeout(() => {
              setFormState({ status: undefined, message: '' });
            }, 3000);
          }
        })
        .catch(() => {
          setFormState({ status: 'error', message: 'Something went wrong!' });
          setTimeout(() => {
            setFormState({ status: undefined, message: '' });
          }, 3000);
        });
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-secondary p-6 rounded-lg shadow-sm min-w-80">
      <h2 className="text-2xl">{label}</h2>
      <div className="flex flex-col gap-2">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3">
              <FormFieldTextInput
                label="Name"
                fieldName="name"
                disabled={isPending}
                placeholder="John Smith"
              />
            </div>
            <FormToaster state={formState.status} message={formState.message} />
            <Button type="submit" intent="primary" disabled={isPending}>
              Save
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
