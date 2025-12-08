import { initialTickets } from '@/lib/data';
import { TTicket } from '../types';

export const getTickets = async (): Promise<TTicket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise((resolve) => {
    resolve(initialTickets);
  });
};
