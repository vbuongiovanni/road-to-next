import { notFound } from 'next/navigation';
import { CardCompact } from '@/components/custom/CardCompact';
import { TicketUpsertForm } from '@/features/ticket/component/TicketUpsertForm';
import { getTicket } from '@/features/ticket/queries/getTicket';

type TTicketEditPage = {
  params: Promise<{ ticketId: string }>;
};
const TicketEditPage = async ({ params }: TTicketEditPage) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    notFound();
  }
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <CardCompact
        className='w-full max-w-[420px] animate-fade-from-top'
        title='Edit Ticket'
        description='Edit the details of your ticket below.'
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
