import { ThemeProvider as BaseThemeProvider } from 'next-themes';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </BaseThemeProvider>
  );
};
