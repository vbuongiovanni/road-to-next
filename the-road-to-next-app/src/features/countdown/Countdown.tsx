'use client';
import { useEffect, useMemo, useState } from 'react';
import { calculateDifference, padZero } from './utils';

export const Countdown = () => {
  const returnTime = useMemo(() => new Date('2025-12-12T20:08:00'), []);
  const [countdown, setCountdown] = useState(
    calculateDifference(returnTime, new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateDifference(returnTime, new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, [returnTime]);

  const { days, hours, minutes, seconds } = countdown;
  return (
    <div>
      <span className='text-4xl font-bold'>{days} Days </span>
      <span className='text-4xl font-bold'>
        {padZero(hours)}:{padZero(minutes)}:{padZero(seconds)}
      </span>
    </div>
  );
};
