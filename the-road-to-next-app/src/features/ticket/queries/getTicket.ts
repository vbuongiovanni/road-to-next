import { Ticket } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
  });
};
