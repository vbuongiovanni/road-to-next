import { toast } from 'sonner';
import {
  TUseActionFeedbackCallbackArgs,
  useActionFeedback,
} from '@/components/hooks/useActionFeedback';
import { SubmitButton } from './SubmitButton';
import { TActionState } from './utils';

type TForm = {
  action: (payload: FormData) => void | Promise<void>;
  onSuccessCallback?: (actionState?: TActionState) => void;
  onErrorCallback?: (actionState?: TActionState) => void;
  actionState: TActionState;
  children?: React.ReactNode | React.ReactNode[];
  buttonLabel?: string;
};

export const Form = ({
  action,
  onSuccessCallback,
  onErrorCallback,
  actionState,
  children,
  buttonLabel = 'Submit',
}: TForm) => {
  const onSuccess = ({ actionState }: TUseActionFeedbackCallbackArgs) => {
    toast.success(actionState.message);
    onSuccessCallback?.(actionState);
  };
  const onError = ({ actionState }: TUseActionFeedbackCallbackArgs) => {
    if (actionState.message) {
      toast.error(actionState.message);
    }
    onErrorCallback?.(actionState);
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
