import { Ticket } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

type TPopulatedTicket = Ticket & {
  user: {
    username: string;
  };
};

export const getTickets = async (): Promise<TPopulatedTicket[]> => {
  return await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { username: true } } },
  });
};
