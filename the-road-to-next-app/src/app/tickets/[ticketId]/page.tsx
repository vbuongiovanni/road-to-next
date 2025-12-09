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

export default TicketPage;
