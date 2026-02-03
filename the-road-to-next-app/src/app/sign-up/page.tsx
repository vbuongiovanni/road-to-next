import Link from 'next/link';
import { CardCompact } from '@/components/custom/CardCompact';
import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { Paths } from '@/lib/paths';
import { buildRoute } from '@/lib/utils';

const SignUpPage = () => {
  return (
    <div className='flex-1 flex flex-col justify-center items-center'>
      <CardCompact
        className='w-full max-w-[420px] animate-fade-from-top'
        title='Sign up'
        description='Create a new account to get started.'
        content={<SignUpForm />}
        footer={
          <Link
            href={buildRoute(Paths.SignIn)}
            className='text-sm text-muted-foreground cursor-pointer'>
            Have an account? Sign in now
          </Link>
        }
      />
    </div>
  );
};

export default SignUpPage;
