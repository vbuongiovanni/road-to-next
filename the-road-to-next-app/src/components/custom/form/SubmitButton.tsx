'use client';
import { LucideLoader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type TSubmitButton = {
  label: string;
};

export const SubmitButton = ({ label }: TSubmitButton) => {
  const { pending: isPending } = useFormStatus();
  return (
    <Button type='submit' disabled={isPending}>
      {isPending ? (
        <LucideLoader className='w-4 h-4 mr-2 animate-spin' />
      ) : null}
      {label}
    </Button>
  );
};
