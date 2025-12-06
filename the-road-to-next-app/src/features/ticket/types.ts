export const enum TicketStatus {
  Open = 'open',
  InProgress = 'inProgress',
  Closed = 'closed',
}

export type TTicket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};
