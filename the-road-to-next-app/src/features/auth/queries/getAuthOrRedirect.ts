import { redirect } from 'next/navigation';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';
import { getAuth } from './getAuth';

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    return redirect(buildRoute(Paths.SignIn));
  }
  return auth;
};
