'use client';
import { format } from 'date-fns';
import { LucideCalendar } from 'lucide-react';
import { useImperativeHandle, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type TDatePicker = {
  id: string;
  defaultValue?: string | number;
  imperativeHandleRef?: React.RefObject<{ callback: () => void } | null>;
};

export const DatePicker = ({
  id,
  defaultValue,
  imperativeHandleRef,
}: TDatePicker) => {
  const [open, setOpen] = useState(false);
  const initialValue = defaultValue ? new Date(defaultValue) : undefined;

  const [date, setDate] = useState<Date | undefined>(initialValue);

  useImperativeHandle(imperativeHandleRef, () => ({
    callback: () => {
      setDate(undefined);
    },
  }));

  const formattedStringDate = date ? format(date, 'yyyy-MM-dd') : '';
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} asChild className='w-full'>
        <Button
          variant='outline'
          id={id}
          className='justify-start text-left font-normal'>
          <LucideCalendar className='mr-2 h-4 w-4' />
          {formattedStringDate}
          {/* Calendar doesnt have a good way to pass in the id, so we use a hidden input to pass in the value to the form for on submit. */}
          <input type='hidden' name={id} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 overflow-auto'>
        <Calendar
          id={id}
          mode='single'
          selected={date}
          captionLayout='dropdown'
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
