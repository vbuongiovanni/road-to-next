'use client';
import { useActionState, useRef } from 'react';
import { Form } from '@/components/custom/form/Form';
import { FormItem } from '@/components/custom/form/FormItem';
import { createEmptyActionState } from '@/components/custom/form/utils';
import { Ticket } from '@/generated/prisma';
import { fromCent } from '@/utils/currency';
import { upsertTicket } from '../actions/upsertTicket';

type TTicketUpsertForm = {
  ticket?: Ticket;
};

export const TicketUpsertForm = ({ ticket }: TTicketUpsertForm) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    createEmptyActionState(),
  );

  const calendarImperativeHandleRef = useRef<{ callback: () => void } | null>(
    null,
  );

  const onSuccessCallback = () => {
    calendarImperativeHandleRef.current?.callback();
  };

  return (
    // id can either be passed in via form, or via binding when using .bind in the form action
    <Form
      actionState={actionState}
      action={action}
      onSuccessCallback={onSuccessCallback}
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

      <div className='flex justify-between gap-x-2 mb-1'>
        <FormItem
          initialValue={ticket?.deadline}
          label='Deadline'
          actionState={actionState}
          fieldName='deadline'
          inputType='date'
          imperativeHandleRef={calendarImperativeHandleRef}
        />

        <FormItem
          initialValue={ticket?.bounty ? fromCent(ticket.bounty) : undefined}
          label='Bounty'
          actionState={actionState}
          fieldName='bounty'
          inputType='number'
        />
      </div>
    </Form>
  );
};
