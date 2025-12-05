import Link from 'next/link';
import { Paths } from '@/paths';
import { buildRoute } from '@/utils';

export const HomePage = () => {
  return (
    <div>
      <h2 className='text-lg font-bold'>Home Page</h2>
      <Link href={buildRoute(Paths.Tickets)} className='underline'>
        Tickets
      </Link>
    </div>
  );
};

export default HomePage;
