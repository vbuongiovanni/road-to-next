'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';
import { buildRoute } from '@/lib/utils';

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({ where: { id } });

  // this is known as On-Demand 'Incremental Static Regeneration' or (ISR)
  // This MUST be done anytime data is changed that is used in a statically cached route/page
  // Otherwise, stale data will be served to the end user.
  revalidatePath(Paths.Tickets);

  redirect(buildRoute(Paths.Tickets));
};
