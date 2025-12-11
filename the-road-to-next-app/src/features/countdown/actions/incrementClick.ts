'use server';
import { revalidatePath } from 'next/cache';
import { SuccessfulClicks } from '@/generated/prisma/client';
import { Paths } from '@/lib/paths';
import { prisma } from '@/lib/prisma';

export const incrementClick = async (clickData: SuccessfulClicks | null) => {
  if (!clickData) return;
  const { id, numClicks } = clickData;
  await prisma.successfulClicks.update({
    where: { id: id },
    data: { numClicks: numClicks + 1 },
  });
  revalidatePath(Paths.Countdown);
};
