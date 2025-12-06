import Link from 'next/link';
import { Heading } from '@/components/custom/heading';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';

export const HomePage = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <Heading
        title='Ticket Bounty System'
        description='Your home place to start'
      />
      <div className='flex-1 flex flex-col items-center'>
        <Link href={buildRoute(Paths.Tickets)} className='underline'>
          Tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
