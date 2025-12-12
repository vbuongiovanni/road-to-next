import { type ClassValue, clsx } from 'clsx';
import type { Route } from 'next';
import { twMerge } from 'tailwind-merge';
import { Paths } from './paths';

export const buildRoute = (
  path: Paths,
  id?: string | number,
  endpoint?: string
): Route<string> => {
  let route = id ? `${path}/${id}` : path;
  if (endpoint) {
    route += `/${endpoint}`;
  }
  return route as Route<string>;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
