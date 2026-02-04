'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookie } from '@/actions/cookie';
import {
  ActionStateStatus,
  fromErrorToActionState,
  TActionState,
  toActionState,
} from '@/components/custom/form/utils';
import { getAuthOrRedirect } from '@/features/auth/queries/getAuthOrRedirect';
import { isOwner } from '@/features/auth/utils/isOwner';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';
import { buildRoute } from '@/lib/utils';
import { toCent } from '@/utils/currency';

const upsertTicketSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(191, 'Title must be at most 191 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1024, 'Content must be at most 1024 characters'),
  bounty: z.coerce
    .number()
    .positive()
    .transform((val) => Number(val)),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Deadline must be a valid date',
  }),
});

// id can either be passed in via form, or via binding when using .bind in the form action
export const upsertTicket = async (
  id: string | undefined,
  _actionState: TActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  if (id) {
    const existingTicket = await prisma.ticket.findUnique({ where: { id } });
    if (!existingTicket || !isOwner(user, existingTicket)) {
      return toActionState(ActionStateStatus.Error, 'Not authorized', formData);
    }
  }

  try {
    //   const id: string = formData.get('id') as string;
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      bounty: formData.get('bounty'),
      deadline: formData.get('deadline'),
    });

    const dbData = {
      ...data,
      userId: user?.id,
      bounty: toCent(data.bounty), // convert to cents
    };

    await prisma.ticket.upsert({
      where: { id: id || '' },
      update: dbData,
      create: dbData,
    });

    revalidatePath(Paths.Tickets);
  } catch (ex) {
    console.error(ex);
    return fromErrorToActionState(ex, formData);
  }

  if (id) {
    await setCookie('toast', 'Ticket updated');
    return redirect(buildRoute(Paths.Tickets));
  }
  return toActionState(
    ActionStateStatus.Success,
    id ? 'Ticket updated successfully.' : 'Ticket created successfully.',
    formData,
  );
};
