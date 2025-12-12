'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookiedByKey } from '@/actions/cookie';

// Note that this COULD have been a custom hook, but the problem then becomes that any component
// using that hook would need to be a client component, which kind of defeats the purpose of having
// a small component that just handles redirect toast messages.
export const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    const runToast = async () => {
      consumeCookiedByKey('toast').then(async (toastMessage) => {
        if (toastMessage) toast.success(toastMessage);
      });
    };
    runToast();
  }, [pathname]);

  return null;
};
