'use client';
import { useActionState } from 'react';
import { Form } from '@/components/custom/form/Form';
import { FormItem } from '@/components/custom/form/FormItem';
import { createEmptyActionState } from '@/components/custom/form/utils';
import { Ticket } from '@/generated/prisma/client';
import { upsertTicket } from '../actions/upsertTicket';

type TTicketUpsertForm = {
  ticket?: Ticket;
};

export const TicketUpsertForm = ({ ticket }: TTicketUpsertForm) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    createEmptyActionState()
  );

  return (
    // id can either be passed in via form, or via binding when using .bind in the form action
    <Form
      actionState={actionState}
      action={action}
      buttonLabel={ticket ? 'Update Ticket' : 'Create Ticket'}>
      {/* <Input id='id' name='id' type='hidden' defaultValue={id} /> */}

      <FormItem
        initialValue={ticket?.title}
        label='Title'
        actionState={actionState}
        fieldName='title'
      />

      <FormItem
        initialValue={ticket?.content}
        label='Content'
        actionState={actionState}
        fieldName='content'
        inputType='textarea'
      />
    </Form>
  );
};
