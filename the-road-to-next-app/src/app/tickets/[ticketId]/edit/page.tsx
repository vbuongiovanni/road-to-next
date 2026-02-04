import { notFound } from 'next/navigation';
import { CardCompact } from '@/components/custom/CardCompact';
import { getAuthOrRedirect } from '@/features/auth/queries/getAuthOrRedirect';
import { isOwner } from '@/features/auth/utils/isOwner';
import { TicketUpsertForm } from '@/features/ticket/component/TicketUpsertForm';
import { getTicket } from '@/features/ticket/queries/getTicket';

type TTicketEditPage = {
  params: Promise<{ ticketId: string }>;
};
const TicketEditPage = async ({ params }: TTicketEditPage) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  const { user } = await getAuthOrRedirect();

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
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
