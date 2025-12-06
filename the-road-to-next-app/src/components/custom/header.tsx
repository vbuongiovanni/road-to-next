import { LucideKanban } from 'lucide-react';
import Link from 'next/link';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { ThemeSwitch } from './theme/themeSwitch';

export const Header = () => {
  return (
    <nav
      className={
        'supports-backdrop-blue:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between'
      }>
      <div className='flex align-items gap-x-2'>
        <Link
          className={buttonVariants({ variant: 'ghost' })}
          href={buildRoute(Paths.Home)}>
          <>
            <LucideKanban />
            <h1>TicketBounty</h1>
          </>
        </Link>
      </div>
      <div className='flex align-items gap-x-2'>
        <ThemeSwitch />
        <Link
          className={buttonVariants({ variant: 'default' })}
          href={buildRoute(Paths.Tickets)}>
          Tickets
        </Link>
      </div>
    </nav>
  );
};
