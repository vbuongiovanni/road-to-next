import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Heading } from '@/components/custom/heading';
import { Spinner } from '@/components/custom/spinner';
import { ErrorFallback } from '@/features/ErrorFallback';
import { TicketList } from '@/features/ticket/component/TicketList';

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
