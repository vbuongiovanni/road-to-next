'use client';
import clsx from 'clsx';
import { LucideLoader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type TSubmitButton = {
  icon?: React.ReactNode;
  label?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

export const SubmitButton = ({ label, icon, size, variant }: TSubmitButton) => {
  const { pending: isPending } = useFormStatus();
  return (
    <Button type='submit' disabled={isPending} size={size} variant={variant}>
      {isPending ? (
        <LucideLoader
          className={`w-4 h-4 animate-spin ${clsx({ 'mr-1': !!label })}`}
        />
      ) : null}
      {label && <span>{label}</span>}
      {icon && !isPending && <span>{icon}</span>}
    </Button>
  );
};
