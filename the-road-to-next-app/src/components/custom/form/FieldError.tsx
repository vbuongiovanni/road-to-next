import { TActionState } from './utils';

type TFieldError = {
  actionState: TActionState;
  fieldName: string;
};

export const FieldError = ({ actionState, fieldName }: TFieldError) => {
  const message = actionState?.fieldErrors[fieldName]?.[0];
  if (!message) {
    return null;
  }
  return <span className={'text-red-500 text-sm'}>{message}</span>;
};
