import { useEffect } from 'react';
import { ActionStateStatus, TActionState } from '../custom/form/utils';

export type TUseActionFeedbackCallbackArgs = {
  actionState: TActionState;
};

type TUseActionFeedbackOptions = {
  onSuccess?: (args: TUseActionFeedbackCallbackArgs) => void;
  onError?: (args: TUseActionFeedbackCallbackArgs) => void;
};

export const useActionFeedback = (
  actionState: TActionState,
  options: TUseActionFeedbackOptions
) => {
  useEffect(() => {
    if (actionState.status === ActionStateStatus.Success) {
      options.onSuccess?.({ actionState });
    } else if (actionState.status === ActionStateStatus.Error) {
      options.onError?.({ actionState });
    }
  }, [actionState, options]);
};
