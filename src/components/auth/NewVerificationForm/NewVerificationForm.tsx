'use client';

import { newVerification } from '@/actions/auth/new-verification';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import FormToaster from '../FormToaster';

export default function NewVerificationForm() {
  const [formState, setFormState] = useState<{
    status: 'success' | 'error' | undefined;
    message: string | undefined;
  }>({ status: undefined, message: '' });

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (formState.status === 'success') return;

    if (!token) {
      setFormState({ status: 'error', message: 'Missing token!' });
      return;
    }

    newVerification(token)
      .then(response => {
        if (response && !response.success) {
          setFormState({ status: 'error', message: response?.message });
        } else {
          setFormState({ status: 'success', message: response?.message });
        }
      })
      .catch(() => {
        setFormState({ status: 'error', message: 'Something went wrong!' });
      });
  }, [token, formState.status]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <p className="self-start">Confirming your verification</p>
      {!formState.status && !formState.message && <BeatLoader />}

      <FormToaster state={formState.status} message={formState.message} />
    </div>
  );
}
