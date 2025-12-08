import { initialTickets } from '@/lib/data';
import { TTicket } from '../types';

export const getTicket = async (
  ticketId: string
): Promise<TTicket | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise((resolve) => {
    resolve(initialTickets.find((t) => t.id === ticketId));
  });
};
