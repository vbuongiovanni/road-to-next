import { myBig } from '@/lib/big';

export const toCent = (cents: number) =>
  new myBig(cents).mul(100).round(2).toNumber();

export const fromCent = (cents: number) =>
  new myBig(cents).div(100).round(2).toNumber();

export const toCurrencyFromCents = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(fromCent(cents));
};
