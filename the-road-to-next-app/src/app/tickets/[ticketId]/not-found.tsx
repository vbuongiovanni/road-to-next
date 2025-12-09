import Link from 'next/link';
import { Placeholder } from '@/components/custom/placeholder';
import { buttonVariants } from '@/components/ui/button';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';

const NotFoundPage = () => {
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
};

export default NotFoundPage;
