import { Separator } from '../ui/separator';

type THeading = {
  title: string;
  description?: string;
};

export const Heading = ({ title, description }: THeading) => {
  return (
    <>
      <div className='px-8'>
        <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      <Separator />
    </>
  );
};
