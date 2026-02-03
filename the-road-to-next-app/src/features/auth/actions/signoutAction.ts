'use server';
import { redirect } from 'next/navigation';
import { deleteCookieByKey } from '@/actions/cookie';
import { SESSION_COOKIE_NAME } from '@/lib/constants';
import { invalidateSession } from '@/lib/session';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';
import { getAuth } from '../queries/getAuth';

export const signoutAction = async () => {
  const { session } = await getAuth();

  if (!session) {
    return redirect(buildRoute(Paths.SignIn));
  }

  await invalidateSession(session);
  deleteCookieByKey(SESSION_COOKIE_NAME);

  return redirect(buildRoute(Paths.SignIn));
};
