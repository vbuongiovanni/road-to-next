import { User } from '@/generated/prisma';

type TEntity = {
  userId: string;
};

export const isOwner = (
  authUser: User | null | undefined,
  entity: TEntity | null,
) => {
  if (!authUser || !entity) return false;
  if (!entity?.userId) return false;
  return authUser?.id === entity?.userId;
};
