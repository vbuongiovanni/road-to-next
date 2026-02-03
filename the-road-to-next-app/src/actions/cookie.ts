'use server';

import { cookies } from 'next/headers';

export const setCookie = async (
  key: string,
  value: string,
  attributes: Record<string, string> = {},
) => {
  await cookies().then((cookie) => {
    cookie.set(key, value, attributes);
  });
};

export const getCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value || null;
};

export const consumeCookiedByKey = async (key: string) => {
  const message = await getCookieByKey(key);

  await deleteCookieByKey(key);

  return message;
};

export const deleteCookieByKey = async (key: string) => {
  await cookies().then((cookie) => {
    cookie.delete(key);
  });
};
