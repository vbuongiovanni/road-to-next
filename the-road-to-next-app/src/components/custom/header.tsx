'use client';
import { LucideKanban, LucideLogOut } from 'lucide-react';
import Link from 'next/link';
import { signoutAction } from '@/features/auth/actions/signoutAction';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { SubmitButton } from './form/SubmitButton';
import { ThemeSwitch } from './theme/themeSwitch';

export const Header = () => {
  const { user, isFetched } = useAuth();
  if (!isFetched) return null;

  const navItems = user ? (
    <>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={buildRoute(Paths.Tickets)}>
        Tickets
      </Link>
      <form action={signoutAction}>
        <SubmitButton label='Signout' icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={buildRoute(Paths.SignUp)}>
        Sign Up
      </Link>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={buildRoute(Paths.SignIn)}>
        Sign In
      </Link>
    </>
  );
  return (
    <nav
      className={
        'animate-header-from-top supports-backdrop-blue:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between'
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
        {navItems}
      </div>
    </nav>
  );
};
