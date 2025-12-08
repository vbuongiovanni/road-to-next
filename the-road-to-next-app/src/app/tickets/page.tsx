import { Heading } from '@/components/custom/heading';
import { TicketItem } from '@/features/ticket/component/ticketItem';
import { getTickets } from '@/features/ticket/queries/getTickets';

const TicketsPage = async () => {
  const tickets = await getTickets();
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading
        title='Support Tickets'
        description='Browse and manage your support tickets.'
      />
      <div className='flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top'>
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} {...ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
