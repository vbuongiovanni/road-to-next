'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookie } from '@/actions/cookie';
import { fromErrorToActionState } from '@/components/custom/form/utils';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';
import { buildRoute } from '@/lib/utils';

export const deleteTicket = async (id: string) => {
  try {
    await prisma.ticket.delete({ where: { id } });
  } catch (ex) {
    return fromErrorToActionState(ex);
  }

  // this is known as On-Demand 'Incremental Static Regeneration' or (ISR)
  // This MUST be done anytime data is changed that is used in a statically cached route/page
  // Otherwise, stale data will be served to the end user.
  revalidatePath(Paths.Tickets);

  // If, hypotherically speaking, we were to statically generate the ticket detail pages (see ./src/app/tickets/[ticketId]/page.tsx),
  // then we would also need to revalidate that specific path as well. Otherwise, stale data would be served there as well.
  // revalidatePath(buildRoute(Paths.Tickets, id));

  await setCookie('toast', 'Ticket deleted');
  redirect(buildRoute(Paths.Tickets));
};
