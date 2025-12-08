import Link from 'next/link';
import { Placeholder } from '@/components/custom/placeholder';
import { buttonVariants } from '@/components/ui/button';
import { TicketItem } from '@/features/ticket/component/ticketItem';
import { getTicket } from '@/features/ticket/queries/getTicket';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';

type TTicketPage = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TTicketPage) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    return (
      <Placeholder
        label='Ticket not found'
        button={
          <Link
            href={buildRoute(Paths.Tickets)}
            className={buttonVariants({ variant: 'outline' })}>
            Go to Tickets
          </Link>
        }
      />
    );
  }
  return (
    <div className='flex justify-center animate-fade-from-top'>
      <TicketItem {...ticket} isDetail={true} />
    </div>
  );
};

export default TicketPage;
