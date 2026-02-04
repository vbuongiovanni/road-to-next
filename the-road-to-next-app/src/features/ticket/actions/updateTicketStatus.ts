'use server';
import { revalidatePath } from 'next/cache';
import { setCookie } from '@/actions/cookie';
import {
  ActionStateStatus,
  fromErrorToActionState,
  toActionState,
} from '@/components/custom/form/utils';
import { getAuth } from '@/features/auth/queries/getAuth';
import { isOwner } from '@/features/auth/utils/isOwner';
import { TicketStatus } from '@/generated/prisma';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';

// id can either be passed in via form, or via binding when using .bind in the form action
export const updateTicketStatus = async (
  id: string | undefined,
  status: TicketStatus,
) => {
  const { user } = await getAuth();
  try {
    if (id) {
      const existingTicket = await prisma.ticket.findUnique({ where: { id } });
      if (!existingTicket || !isOwner(user, existingTicket)) {
        return toActionState(ActionStateStatus.Error, 'Not authorized');
      }
    }

    await prisma.ticket.update({
      where: { id: id || '', userId: user?.id },
      data: { status },
    });

    revalidatePath(Paths.Tickets);
  } catch (ex) {
    return fromErrorToActionState(ex);
  }
  await setCookie('toast', 'Status updated');
  return toActionState(
    ActionStateStatus.Success,
    'Status updated successfully.',
  );
};
