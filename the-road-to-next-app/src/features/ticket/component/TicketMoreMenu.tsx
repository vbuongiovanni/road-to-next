'use client';
import { LucideTrash } from 'lucide-react';
import { toast } from 'sonner';
import { useConfirmationDialog } from '@/components/custom/useConfirmationDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ticket, TicketStatus } from '@/generated/prisma';
import { deleteTicket } from '../actions/deleteTicket';
import { updateTicketStatus } from '../actions/updateTicketStatus';
import { TICKET_STATUS_LABELS } from '../constants';

type TTicketMoreMenu = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

export const TicketMoreMenu = ({ ticket, trigger }: TTicketMoreMenu) => {
  const [deleteButton, confirmationDialog] = useConfirmationDialog({
    action: deleteTicket.bind(null, ticket.id),
    title: 'Delete Ticket',
    description:
      'Are you sure you want to delete this ticket? This action cannot be undone.',
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className='h-4 w-4' />
        <span>Delete Ticket</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateTicketStatus = async (ticketStatus: string) => {
    const resultPromise = updateTicketStatus(
      ticket.id,
      ticketStatus as TicketStatus,
    );

    toast.promise(resultPromise, {
      loading: 'Updating status...',
      success: (data) => data.message,
      error: (data) => data.message || 'An error occurred.',
    });
  };

  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}>
      {Object.keys(TICKET_STATUS_LABELS).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key as keyof typeof TICKET_STATUS_LABELS]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {confirmationDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side='right'>
          {ticketStatusRadioGroup}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
