'use client';
import { LucideMoon, LucideSun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const handleSwitch = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const baseStyle = 'h-4 w-4';

  return (
    <Button onClick={handleSwitch} variant={'ghost'} size={'icon'}>
      <LucideSun
        className={`${baseStyle} rotate-0 scale-100 transition-transform dark:rotate-90 dark:scale-0`}
      />
      <LucideMoon
        className={`absolute ${baseStyle} rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100`}
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};
