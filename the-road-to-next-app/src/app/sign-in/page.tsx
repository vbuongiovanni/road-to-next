import Link from 'next/link';
import { CardCompact } from '@/components/custom/CardCompact';
import { SignInForm } from '@/features/auth/components/SignInForm';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';

const SignInPage = () => {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <CardCompact
        className='w-full max-w-[420px] animate-fade-from-top'
        title='Sign up'
        description='Create a new account to get started.'
        content={<SignInForm />}
        footer={
          <div className='flex justify-between -400 w-full'>
            <Link
              href={buildRoute(Paths.SignUp)}
              className='text-sm text-muted-foreground cursor-pointer'>
              Need an account?
            </Link>
            <Link
              href={buildRoute(Paths.ForgotPassword)}
              className='text-sm text-muted-foreground cursor-pointer'>
              Forgot Password
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default SignInPage;
