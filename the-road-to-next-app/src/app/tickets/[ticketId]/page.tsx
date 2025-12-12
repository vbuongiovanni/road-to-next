import { notFound } from 'next/navigation';
import { TicketItem } from '@/features/ticket/component/ticketItem';
import { getTicket } from '@/features/ticket/queries/getTicket';

type TTicketPage = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TTicketPage) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  if (!ticket) notFound();

  return (
    <div className='flex justify-center animate-fade-from-top'>
      <TicketItem {...ticket} isDetail={true} />
    </div>
  );
};

// By adding this, we effectively convert this dynamic page into a static page.
// Next will pre-render all the paths specified here at build time and serve them as static pages.
// This is particularly useful for pages that don't change often and can benefit from faster load times.
// However, this comes at the cost of not being able to handle new or updated tickets without a rebuild or adding invalidation logic.
// export async function generateStaticParams() {
//   const tickets = await getTickets();
//   return tickets.map((ticket) => ({ ticketId: ticket.id }));
// }

export default TicketPage;
