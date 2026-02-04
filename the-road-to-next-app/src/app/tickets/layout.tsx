import { getAuthOrRedirect } from '@/features/auth/queries/getAuthOrRedirect';

const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  await getAuthOrRedirect();

  return <div className='authenticated-layout'>{children}</div>;
};

export default AuthenticatedLayout;
