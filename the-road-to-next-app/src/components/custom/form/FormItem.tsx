import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldError } from './FieldError';
import { TActionState } from './utils';

type TFormItem = {
  initialValue?: string | number;
  label: string;
  actionState: TActionState;
  fieldName: string;
  inputType?: 'text' | 'textarea' | 'number' | 'date';
};

export const FormItem = ({
  initialValue,
  label,
  actionState,
  fieldName,
  inputType = 'text',
}: TFormItem) => {
  const defaultValue = (initialValue ??
    actionState.payload?.get(fieldName) ??
    '') as string;

  const InputComponent = inputType === 'textarea' ? Textarea : Input;
  return (
    <div>
      <Label htmlFor={fieldName}>{label}</Label>
      <InputComponent
        id={fieldName}
        name={fieldName}
        type={inputType}
        defaultValue={defaultValue}
      />
      <FieldError actionState={actionState} fieldName={fieldName} />
    </div>
  );
};
