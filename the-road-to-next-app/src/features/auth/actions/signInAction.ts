'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ActionStateStatus,
  fromErrorToActionState,
  TActionState,
  toActionState,
} from '@/components/custom/form/utils';
import { validatePassword } from '@/lib/crypto';
import { lucia } from '@/lib/lucia';
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

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookiesHeader = await cookies();
    cookiesHeader.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (ex) {
    return fromErrorToActionState(ex, formData);
  }
  return redirect(Paths.Tickets);
};
