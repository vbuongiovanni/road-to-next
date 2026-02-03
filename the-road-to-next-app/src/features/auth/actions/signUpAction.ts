'use server';

import { hash } from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ActionStateStatus,
  fromErrorToActionState,
  TActionState,
  toActionState,
} from '@/components/custom/form/utils';
import { Prisma } from '@/generated/prisma';
import { lucia } from '@/lib/lucia';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Username is required' })
      .max(193, { message: 'Username must not be longer than 193 characters' })
      .refine(
        (value) => !value.includes(' '),
        'Username cannot contain spaces',
      ),
    email: z
      .email()
      .min(1, { message: 'Email Is Required' })
      .max(193, { message: 'Email must not be longer than 193 characters' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(193, {
        message: 'Password must not be longer than 193 characters',
      }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(193, {
        message: 'Password must not be longer than 193 characters',
      }),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    if (password !== confirmPassword) {
      context.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const signUpAction = async (
  actionState: TActionState,
  formData: FormData,
) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const passwordHash = await hash(password);

    const user = await prisma.user.create({
      data: { username, email, passwordHash },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookiesHeader = await cookies();
    cookiesHeader.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (ex) {
    if (
      ex instanceof Prisma.PrismaClientKnownRequestError &&
      ex.code === 'P2002'
    ) {
      return toActionState(
        ActionStateStatus.Error,
        'Either email or username is already in use',
        formData,
      );
    } else {
      return fromErrorToActionState(ex, formData);
    }
  }
  return redirect(Paths.Tickets);
};
