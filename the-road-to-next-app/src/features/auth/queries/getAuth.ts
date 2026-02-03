'use server';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { lucia } from '@/lib/lucia';

export const getAuth = cache(async () => {
  const cookie = await cookies();
  console.log('lucia.sessionCookieName', lucia.sessionCookieName);
  const sessionId = cookie.get(lucia.sessionCookieName)?.value || null;
  console.log('sessionId', sessionId);
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  } else {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookie.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookie.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {
      // do nothing, in case this runs in a RSC
    }
    return result;
  }
});
