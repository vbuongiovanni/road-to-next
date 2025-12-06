import { LucideMessageSquareWarning } from 'lucide-react';
import { cloneElement } from 'react';
import { buttonVariants } from '../ui/button';

type TPlaceholder = {
  label: string;
  icon?: React.JSX.Element;
  button?: React.JSX.Element | null;
};

export const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = (
    <div className={`invisible ${buttonVariants({ variant: 'ghost' })}`} />
  ),
}: TPlaceholder) => {
  return (
    <div className='flex-1 self-center flex flex-col items-center justify-center'>
      {/* cloneElement is used here to pass in new props into icon */}
      {cloneElement(icon, { className: 'h-16 w-16' })}
      <h2 className='text-lg text-center pb-2'>{label}</h2>
      {button}
    </div>
  );
};
