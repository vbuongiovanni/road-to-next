import { type ClassValue, clsx } from 'clsx';
import type { Route } from 'next';
import { twMerge } from 'tailwind-merge';
import { Paths } from './paths';

export const buildRoute = (
  path: Paths,
  id?: string | number
): Route<string> => {
  return id ? (`${path}/${id}` as Route<string>) : path;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
