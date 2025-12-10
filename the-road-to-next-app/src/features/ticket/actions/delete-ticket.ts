'use server';
import { redirect } from 'next/navigation';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';
import { buildRoute } from '@/lib/utils';

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({ where: { id } });
  redirect(buildRoute(Paths.Tickets));
};
