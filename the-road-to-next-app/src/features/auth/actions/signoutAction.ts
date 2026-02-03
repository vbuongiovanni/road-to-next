'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia } from '@/lib/lucia';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';
import { getAuth } from '../queries/getAuth';

export const signoutAction = async () => {
  const { session } = await getAuth();

  if (!session) {
    return redirect(buildRoute(Paths.SignIn));
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  const cookie = await cookies();
  cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(buildRoute(Paths.SignIn));
};
