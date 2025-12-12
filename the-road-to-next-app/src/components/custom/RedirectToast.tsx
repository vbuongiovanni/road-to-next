'use client';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { deleteCookieByKey, getCookieByKey } from '@/actions/cookie';

// Note that this COULD have been a custom hook, but the problem then becomes that any component
// using that hook would need to be a client component, which kind of defeats the purpose of having
// a small component that just handles redirect toast messages.
export const RedirectToast = () => {
  useEffect(() => {
    const runToast = async () => {
      getCookieByKey('toast').then(async (toastMessage) => {
        console.log('toastMessage', toastMessage);
        if (toastMessage) {
          toast.success(toastMessage);
        }
        await deleteCookieByKey('toast');
      });
    };
    runToast();
  }, []);

  return null;
};
