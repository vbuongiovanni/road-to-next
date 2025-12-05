import Link from 'next/link';
import { initialTickets } from '@/data';
import { Paths } from '@/paths';
import { buildRoute } from '@/utils';

export const TICKET_ICONS = {
  open: '🟢',
  inProgress: '⏳',
  blocked: '⛔',
  closed: '✅',
};

const TicketsPage = () => {
  return (
    <div>
      <h2 className='text-lg font-bold'>Tickets Page</h2>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <div className='text-lg font-semibold'>
            {TICKET_ICONS[ticket.status]} {ticket.status}
          </div>
          <h2 className='text-lg font-semibold'>{ticket.title}</h2>
          <Link
            href={buildRoute(Paths.Tickets, ticket.id)}
            className='underline '>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TicketsPage;
