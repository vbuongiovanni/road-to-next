import { TicketStatus, TTicket } from '../features/ticket/types';

export const initialTickets: TTicket[] = [
  {
    id: '1',
    title: 'Login form validation',
    content:
      'Improve error messages and add client-side validation for the login form.',
    status: TicketStatus.Open,
  },
  {
    id: '2',
    title: 'Landing page hero',
    content: 'Update hero copy and add a secondary CTA to improve conversion.',
    status: TicketStatus.Open,
  },
  {
    id: '3',
    title: 'API rate limits',
    content:
      'Document current rate limits and expose headers in the public API responses.',
    status: TicketStatus.Closed,
  },
  {
    id: '4',
    title: 'Mobile navigation',
    content:
      'Refactor the mobile nav to reduce layout shifts on smaller breakpoints.',
    status: TicketStatus.Open,
  },
  {
    id: '5',
    title: 'Analytics events audit',
    content:
      'Ensure all checkout steps emit analytics events with consistent payloads.',
    status: TicketStatus.Open,
  },
  {
    id: '6',
    title: 'Legacy job clean-up',
    content:
      'Remove deprecated background job queue after the migration is verified.',
    status: TicketStatus.Closed,
  },
];
