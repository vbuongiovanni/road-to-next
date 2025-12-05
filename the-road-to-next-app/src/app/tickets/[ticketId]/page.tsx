import { initialTickets } from '@/data';

type TTicketPage = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TTicketPage) => {
  const { ticketId } = await params;
  const ticket = initialTickets.find((t) => t.id === ticketId);
  if (!ticket) {
    return <p>Ticket not found</p>;
  }
  const { title, content, status } = ticket;
  return (
    <div>
      <h2 className='text-lg font-bold'>{title}</h2>
      <p>{content}</p>
      <p className='italic'>Status: {status}</p>
    </div>
  );
};

export default TicketPage;
