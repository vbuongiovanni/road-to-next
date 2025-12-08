import { Heading } from '@/components/custom/heading';
import { Countdown } from '@/features/countdown/Countdown';

const CountdownPage = () => {
  return (
    <div className='flex-1 flex flex-col gap-y-8'>
      <Heading title='Countdown' description="To Juber's Arrival!" />
      <div className='flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top'>
        <Countdown />
      </div>
    </div>
  );
};

export default CountdownPage;
