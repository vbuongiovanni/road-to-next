import type { Route } from 'next';
import { Paths } from './paths';

export const buildRoute = (
  path: Paths,
  id?: string | number
): Route<string> => {
  return id ? (`${path}/${id}` as Route<string>) : path;
};
