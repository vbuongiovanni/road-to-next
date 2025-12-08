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
  const units = [
    { label: 'days', value: String(days) },
    { label: 'hours', value: padZero(hours) },
    { label: 'minutes', value: padZero(minutes) },
    { label: 'seconds', value: padZero(seconds) },
  ];

  return (
    <div className='w-full'>
      <div className='mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-8 text-slate-50 shadow-2xl'>
        <div
          className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-4'
          aria-live='polite'
          role='status'>
          {units.map((unit) => (
            <div
              key={unit.label}
              className='relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center shadow-lg backdrop-blur'>
              <div className='text-[clamp(32px,4vw,56px)] font-bold tabular-nums tracking-tight text-white'>
                {unit.value}
              </div>
              <div className='mt-2 text-[11px] uppercase tracking-[0.3em] text-slate-300'>
                {unit.label}
              </div>
              <div className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
