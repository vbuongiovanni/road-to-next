import { cloneElement, useActionState, useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Form } from './form/Form';
import { createEmptyActionState, TActionState } from './form/utils';

type TUseConfirmationDialog = {
  title?: string;
  description?: string;
  action: () => Promise<TActionState>;
  trigger: React.ReactElement<{
    onClick?: React.MouseEventHandler;
  }>;
};

export const useConfirmationDialog = ({
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  action,
  trigger,
}: TUseConfirmationDialog) => {
  const [isOpen, setIsOpen] = useState(false);

  const DialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((prev) => !prev),
  });

  const [actionState, formAction] = useActionState(
    action,
    createEmptyActionState()
  );

  const onSuccessCallback = () => {
    setIsOpen(false);
  };

  const Dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form
            action={formAction}
            actionState={actionState}
            buttonLabel='Confirm'
            onSuccessCallback={onSuccessCallback}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [DialogTrigger, Dialog];
};
