import { LucideCircleCheck, LucideFileText, LucidePencil } from 'lucide-react';
import { JSX } from 'react';
import { $Enums } from '@/generated/prisma';

export const TICKET_ICONS: Record<$Enums.TicketStatus, JSX.Element> = {
  Open: <LucideFileText />,
  InProgress: <LucidePencil />,
  Closed: <LucideCircleCheck />,
};

export const TICKET_STATUS_LABELS: Record<$Enums.TicketStatus, string> = {
  Open: 'Open',
  InProgress: 'In Progress',
  Closed: 'Closed',
};
