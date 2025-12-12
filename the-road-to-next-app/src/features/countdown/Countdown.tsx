'use client';
import JSConfetti from 'js-confetti';
import { LucideTarget } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SuccessfulClicks } from '@/generated/prisma/client';
import { incrementClick } from './actions/incrementClick';
import { calculateDifference, padZero } from './utils';

type TCountdown = {
  clickData: SuccessfulClicks | null;
};

export const Countdown = ({ clickData }: TCountdown) => {
  // Anchor the target to Mountain Time (America/Denver) so it is timezone-agnostic for viewers
  const returnTime = useMemo(() => new Date('2025-12-12T20:14:00-07:00'), []);

  const [countdown, setCountdown] = useState(
    calculateDifference(returnTime, new Date())
  );
  const [isStarted, setIsStarted] = useState(false);

  const { numClicks } = clickData || { numClicks: 0 };

  const playgroundRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [coordinates, setCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [coordinateBounds, setCoordinateBounds] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateDifference(returnTime, new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, [returnTime]);

  useEffect(() => {
    if (playgroundRef.current) {
      const { offsetWidth, offsetHeight } = playgroundRef.current;
      const adjustedWidth = offsetWidth - 40;
      const adjustedHeight = offsetHeight - 40;
      setCoordinateBounds({
        width: offsetWidth - 40,
        height: offsetHeight - 40,
      });
      setCoordinates({
        x: adjustedWidth / 2,
        y: adjustedHeight / 2,
      });
    }
  }, []);

  const boundMaxValue = (newValue: number, maxValue: number) => {
    if (newValue < 0) return 0;
    if (newValue > maxValue) return maxValue;
    return Math.round(newValue);
  };

  const boundMinValue = (newValue: number, minValue: number) => {
    if (newValue > minValue) return minValue;
    return Math.round(newValue);
  };

  const { days, hours, minutes, seconds } = countdown;
  const units = [
    { label: 'days', value: String(days) },
    { label: 'hours', value: padZero(hours) },
    { label: 'minutes', value: padZero(minutes) },
    { label: 'seconds', value: padZero(seconds) },
  ];

  const handleSingleClick = () => {
    // Bias movement toward the center based on how close the dot is to each edge
    if (!coordinateBounds.width || !coordinateBounds.height) return;
    setCoordinates((prev) => {
      const prevX = prev?.x ?? 0;
      const prevY = prev?.y ?? 0;
      const deltaX = boundMinValue(Math.random() * 100, 45);
      const deltaY = boundMinValue(Math.random() * 100, 45);
      const width = coordinateBounds.width ?? 0;
      const height = coordinateBounds.height ?? 0;

      const distanceLeft = prevX;
      const distanceRight = Math.max(width - prevX, 0);
      const distanceTop = prevY;
      const distanceBottom = Math.max(height - prevY, 0);

      const probMoveLeft =
        distanceLeft + distanceRight === 0
          ? 0.5
          : distanceLeft / (distanceLeft + distanceRight);
      const probMoveUp =
        distanceTop + distanceBottom === 0
          ? 0.5
          : distanceTop / (distanceTop + distanceBottom);

      const finalDeltaX = Math.random() < probMoveLeft ? -deltaX : deltaX;
      const finalDeltaY = Math.random() < probMoveUp ? -deltaY : deltaY;
      return {
        x: boundMaxValue(finalDeltaX + prevX, coordinateBounds.width ?? 0),
        y: boundMaxValue(finalDeltaY + prevY, coordinateBounds.height ?? 0),
      };
    });
  };

  const handleDoubleClick = () => {
    const duration = 800;
    const end = Date.now() + duration;
    const jsConfetti = new JSConfetti();

    const interval = setInterval(() => {
      jsConfetti.addConfetti({
        confettiNumber: 200,
        confettiRadius: 5,
        confettiDispatchPosition: { x: 0, y: 0 },
      }); // top-left
      jsConfetti.addConfetti({
        confettiNumber: 200,
        confettiRadius: 5,
        confettiDispatchPosition: { x: 1, y: 0 },
      }); // top-right
      if (Date.now() > end) clearInterval(interval);
    }, 80);

    formRef.current?.requestSubmit();
  };

  return (
    <div className='w-full'>
      <div className='mx-auto max-w-4xl rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-8 text-slate-50 shadow-2xl'>
        <p className='text-center font-bold text-2xl'>ONE FLIGHT AWAY!</p>
        <p className='text-center font-bold'>I Love you the mostest!</p>
        <div
          className='mt-6 grid grid-cols-3 gap-4'
          aria-live='polite'
          role='status'>
          {units
            .filter((unit) => unit.value !== '0')
            .map((unit) => (
              <div
                key={unit.label}
                className='relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 py-2 text-center shadow-lg backdrop-blur'>
                <div className='text-[clamp(32px,4vw,56px)] font-bold tabular-nums tracking-tight text-white'>
                  {unit.value}
                </div>
                <div className='text-[11px] uppercase tracking-[0.3em] text-slate-300'>
                  {unit.label}
                </div>
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent' />
              </div>
            ))}
        </div>
      </div>
      <p className='my-10 text-center font-bold text-xl'>
        While you wait for time to pass, try to double-tap or double-click the
        target!
      </p>
      <div className='relative mx-auto max-w-4xl min-h-[280px] rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-50 shadow-2xl'>
        <div className='absolute top-0 right-0 bg-light-gray rounded m-4 none-select'>
          <p>Score: {numClicks}</p>
        </div>
        <div ref={playgroundRef} className='absolute w-full min-h-[280px]'>
          <form ref={formRef} action={() => incrementClick(clickData)}>
            <Button
              type='button'
              onClick={handleSingleClick}
              onDoubleClick={handleDoubleClick}
              variant={'outline'}
              className='cursor-pointer h-10 w-10 transition-transform duration-100 ease-out rounded-4xl [&_svg]:h-[35px] [&_svg]:w-[35px]'
              style={{
                transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
              }}>
              <LucideTarget className='text-red-600' />
            </Button>
          </form>
        </div>

        {!isStarted && (
          <div className='absolute inset-0 flex items-center justify-center rounded-3xl bg-black/75'>
            <Button
              onClick={() => setIsStarted((prev) => !prev)}
              className='m-4 cursor-pointer'>
              Start!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
