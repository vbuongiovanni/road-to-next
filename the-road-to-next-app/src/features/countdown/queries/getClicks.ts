import { SuccessfulClicks } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export const getClicks = async (): Promise<SuccessfulClicks | null> => {
  const clicks = await prisma.successfulClicks.findFirst();

  return clicks;
};
