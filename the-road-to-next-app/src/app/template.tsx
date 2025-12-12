import { RedirectToast } from '@/components/custom/RedirectToast';

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <RedirectToast />
    </>
  );
};

export default Template;
