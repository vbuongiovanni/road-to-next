import { toast } from 'sonner';
import {
  TUseActionFeedbackCallbackArgs,
  useActionFeedback,
} from '@/components/hooks/useActionFeedback';
import { SubmitButton } from './SubmitButton';
import { TActionState } from './utils';

type TForm = {
  action: (payload: FormData) => void | Promise<void>;
  actionState: TActionState;
  children: React.ReactNode | React.ReactNode[];
  buttonLabel?: string;
};

export const Form = ({
  action,
  actionState,
  children,
  buttonLabel = 'Submit',
}: TForm) => {
  const onSuccess = ({ actionState }: TUseActionFeedbackCallbackArgs) => {
    toast.success(actionState.message);
  };
  const onError = ({ actionState }: TUseActionFeedbackCallbackArgs) => {
    if (actionState.message) {
      toast.error(actionState.message);
    }
  };
  useActionFeedback(actionState, { onSuccess, onError });
  return (
    // id can either be passed in via form, or via binding when using .bind in the form action
    <form action={action} className='flex flex-col gap-y-2'>
      {/* <Input id='id' name='id' type='hidden' defaultValue={id} /> */}
      {children}
      <SubmitButton label={buttonLabel} />
    </form>
  );
};
