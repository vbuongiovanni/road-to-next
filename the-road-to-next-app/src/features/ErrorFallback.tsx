import { Placeholder } from '../components/custom/placeholder';

export const ErrorFallback = async ({ error }: { error?: Error }) => {
  const label = error?.message || 'Something went wrong!';
  return <Placeholder label={label}></Placeholder>;
};
