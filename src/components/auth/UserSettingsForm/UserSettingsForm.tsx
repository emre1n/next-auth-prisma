'use client';

import settings from '@/actions/auth/settings';
import FormToaster from '@/components/auth/FormToaster';
import FormFieldPasswordInput from '@/components/form-components/FormFieldPasswordInput';
import FormFieldSelectInput from '@/components/form-components/FormFieldSelectInput';
import FormFieldSwitch from '@/components/form-components/FormFieldSwitch';
import FormFieldTextInput from '@/components/form-components/FormFieldTextInput';
import Button from '@/components/ui/Button';
import {
  type SettingsFormValueType,
  USER_SETTINGS_SCHEMA,
} from '@/libs/constants/USER_SETTINGS_SCHEMA';
import { ExtendedUser } from '@/next-auth';
import { toSentenceCase } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type Inputs = SettingsFormValueType;

interface UserSettingsFormProps {
  user?: ExtendedUser;
  label: string;
}

export default function UserSettingsForm({
  user,
  label,
}: UserSettingsFormProps) {
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
    email: user?.email || undefined,
    password: undefined,
    newPassword: undefined,
    role: user?.role || undefined,
    isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
  };

  const defaultUserValues = {
    role: {
      value: user?.role as string,
      label: toSentenceCase(user?.role),
    },
    isTwoFactorEnabled: user?.isTwoFactorEnabled,
  };

  // User Role Options
  const options = [
    { value: UserRole.ADMIN, label: 'Admin' },
    { value: UserRole.USER, label: 'User' },
  ];

  const methods = useForm<Inputs>({
    resolver: zodResolver(USER_SETTINGS_SCHEMA),
    defaultValues: { ...defaultFormValues },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: Inputs) => {
    startTransition(() => {
      console.log('data', data);
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
              <FormFieldTextInput
                label="Email"
                fieldName="email"
                disabled={isPending}
                placeholder="mail@example.com"
                type="email"
              />
              <FormFieldPasswordInput
                label="Password"
                fieldName="password"
                disabled={isPending}
                placeholder="********"
              />
              <FormFieldPasswordInput
                label="New Password"
                fieldName="newPassword"
                disabled={isPending}
                placeholder="********"
              />
              <FormFieldSelectInput
                label="Role"
                fieldName="role"
                options={options}
                defaultValue={defaultUserValues.role}
                isSearchable
              />
              <div className="flex justify-between items-center border px-3 py-2 rounded-md bg-base-100">
                <FormFieldSwitch
                  label="2FA"
                  fieldName="isTwoFactorEnabled"
                  disabled={isPending}
                  defaultValue={defaultUserValues.isTwoFactorEnabled}
                />
              </div>
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
