'use server';
import { revalidatePath } from 'next/cache';
import { setCookie } from '@/actions/cookie';
import {
  ActionStateStatus,
  fromErrorToActionState,
  toActionState,
} from '@/components/custom/form/utils';
import { TicketStatus } from '@/generated/prisma';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';

// id can either be passed in via form, or via binding when using .bind in the form action
export const updateTicketStatus = async (
  id: string | undefined,
  status: TicketStatus,
) => {
  try {
    await prisma.ticket.update({
      where: { id: id || '' },
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
