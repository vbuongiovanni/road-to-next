'use server';
import { cache } from 'react';
import { deleteCookieByKey, getCookieByKey, setCookie } from '@/actions/cookie';
import { SESSION_COOKIE_NAME } from '@/lib/constants';
import { validateSession } from '@/lib/session';

export const getAuth = cache(async () => {
  const sessionId = await getCookieByKey(SESSION_COOKIE_NAME);
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  } else {
    const result = await validateSession(sessionId);

    try {
      if (result.session) {
        await setCookie(SESSION_COOKIE_NAME, result.session);
        return result;
      } else {
        await deleteCookieByKey(SESSION_COOKIE_NAME);
      }
    } catch {
      // do nothing, in case this runs in a RSC
    }
    return result;
  }
});
