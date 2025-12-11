import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Heading } from '@/components/custom/heading';
import { Spinner } from '@/components/custom/spinner';
import { ErrorFallback } from '@/features/ErrorFallback';
import { TicketList } from '@/features/ticket/component/TicketList';

// This will make the entire page dynamic, thereby disabling the full-route cache that is applied to static pages.
// export const dynamic = 'force-dynamic';

// This will make the content of the page revalidate the cache every 30 seconds.
// This is known as time-based 'Incremental Static Regeneration' or (ISR)
// Setting this value to 0 is equivalent to 'force-dynamic' as it will revalidate on every request.
export const revalidate = 30;

const TicketsPage = () => {
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading
        title='Support Tickets'
        description='Browse and manage your support tickets.'
      />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
