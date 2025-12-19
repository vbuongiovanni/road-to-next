import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '../DatePicker';
import { FieldError } from './FieldError';
import { TActionState } from './utils';

type TFormItem = {
  initialValue?: string | number;
  label: string;
  actionState: TActionState;
  fieldName: string;
  inputType?: 'text' | 'textarea' | 'number' | 'date';
  imperativeHandleRef?: React.RefObject<{ callback: () => void } | null>;
};

export const FormItem = ({
  initialValue,
  label,
  actionState,
  fieldName,
  inputType = 'text',
  imperativeHandleRef,
}: TFormItem) => {
  const defaultValue = (initialValue ??
    actionState.payload?.get(fieldName) ??
    '') as string;

  const InputComponent = () => {
    switch (inputType) {
      case 'textarea':
        return (
          <Textarea
            id={fieldName}
            name={fieldName}
            defaultValue={defaultValue}
          />
        );
      case 'number':
        return (
          <Input
            id={fieldName}
            name={fieldName}
            type={inputType}
            defaultValue={defaultValue}
            step='.01'
          />
        );
      case 'date':
        return (
          <DatePicker
            // Maybe this is obvious, but we can add timestamp to the key prop in order force DatePicker to rerender,
            // thereby clearing out the state, whenever the form is updated
            // key={actionState.timestamp}
            id={fieldName}
            defaultValue={defaultValue}
            imperativeHandleRef={imperativeHandleRef}
          />
        );
      default:
        return (
          <Input
            id={fieldName}
            name={fieldName}
            type={inputType}
            defaultValue={defaultValue}
          />
        );
    }
  };

  return (
    <div className='w-full'>
      <Label htmlFor={fieldName}>{label}</Label>
      {InputComponent()}
      <FieldError actionState={actionState} fieldName={fieldName} />
    </div>
  );
};
