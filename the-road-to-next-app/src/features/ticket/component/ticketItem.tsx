import clsx from 'clsx';
import { LucideSquareArrowOutUpRight, LucideTrash } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/generated/prisma/client';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';
import { deleteTicket } from '../actions/delete-ticket';
import { TICKET_ICONS } from '../constants';

type TTicketItem = Ticket & {
  isDetail?: boolean;
};

export const TicketItem = (props: TTicketItem) => {
  const { id, title, content, status, isDetail = false } = props;
  const detailButton = (
    <Button variant='outline' size={'icon'} asChild>
      <Link href={buildRoute(Paths.Tickets, id)} className='underline '>
        {<LucideSquareArrowOutUpRight className='h-4 w-4' />}
      </Link>
    </Button>
  );

  const deleteButton = (
    <form action={deleteTicket.bind(null, id)}>
      <Button variant='outline' size={'icon'}>
        <LucideTrash className='h-4 w-4' />
      </Button>
    </form>
  );

  return (
    <div
      className={clsx('flex flex-gap-1 w-full gap-x-1', {
        'max-w-[420px]': !isDetail,
        'max-w-[600px]': isDetail,
      })}>
      <Card key={id}>
        <CardHeader>
          <CardTitle className='flex gap-x-2'>
            <span>{TICKET_ICONS[status]}</span>
            <span className='text-lg font-semibold'>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx('whitespace-break-spaces', {
              'line-clamp-none': isDetail,
              'line-clamp-3': !isDetail,
            })}>
            {content}
          </span>
        </CardContent>
      </Card>
      <div className='flex flex-col gap-y-1'>
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  );
};
