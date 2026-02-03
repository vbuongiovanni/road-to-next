import React from 'react';
import { Ticket } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

// the 'cache' function from React will memoize the result of this function based on its arguments
// Even though this function is in two places(./src/app/tickets/[ticketId]/page.tsx) and here(./src/features/ticket/component/ticketItem.tsx),
// It is only invoked once. Thank you, React.cache!

export const getTicket = React.cache(
  async (ticketId: string): Promise<Ticket | null> => {
    return await prisma.ticket.findUnique({
      where: { id: ticketId },
    });
  },
);
