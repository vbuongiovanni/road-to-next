export const calculateDifference = (returnTime: Date, currentTime: Date) => {
  const difference = returnTime.getTime() - currentTime.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

export const padZero = (num: number) => num.toString().padStart(2, '0');
