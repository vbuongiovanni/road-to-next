'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookie } from '@/actions/cookie';
import {
  ActionStateStatus,
  fromErrorToActionState,
  TActionState,
  toActionState,
} from '@/components/custom/form/utils';
import { SESSION_COOKIE_NAME } from '@/lib/constants';
import { validatePassword } from '@/lib/crypto';
import { createNewSession } from '@/lib/session';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';

const signInSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(193, { message: 'Username must not be longer than 193 characters' }),
  password: z.string().min(1, { message: 'Password is required' }).max(193, {
    message: 'Password must not be longer than 193 characters',
  }),
});

export const signInAction = async (
  actionState: TActionState,
  formData: FormData,
) => {
  try {
    const { username, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return toActionState(
        ActionStateStatus.Success,
        'Invalid username or password',
        formData,
      );
    }

    const hashedPassword = user.passwordHash;

    const didPass = await validatePassword(hashedPassword, password);

    if (!didPass) {
      return toActionState(
        ActionStateStatus.Success,
        'Invalid username or password',
        formData,
      );
    }

    const session = await createNewSession(user.id);
    await setCookie(SESSION_COOKIE_NAME, session.id);
  } catch (ex) {
    return fromErrorToActionState(ex, formData);
  }
  return redirect(Paths.Tickets);
};
