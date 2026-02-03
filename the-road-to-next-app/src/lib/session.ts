import { generateRandomToken } from './crypto';
import { prisma } from './prisma';

const REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 2;
const MAX_DURATION_MS = REFRESH_INTERVAL_MS * 2;

export const createNewSession = async (
  userId: string,
  sessionToken?: string,
) => {
  sessionToken = sessionToken ? sessionToken : generateRandomToken();

  const session = await prisma.session.create({
    data: {
      id: sessionToken,
      userId,
      expiresAt: new Date(Date.now() + MAX_DURATION_MS),
    },
  });

  return session;
};

export const validateSession = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return {
      user: null,
      session: null,
    };
  }

  const currentDate = new Date().getTime();
  const expiresAtTime = session.expiresAt.getTime();
  if (currentDate >= expiresAtTime) {
    await invalidateSession(sessionId);
    return {
      user: null,
      session: null,
    };
  } else if (currentDate >= expiresAtTime - REFRESH_INTERVAL_MS) {
    await refreshSession(sessionId);
  }
  const { user, id } = session;
  return { user, session: id };
};

const refreshSession = async (sessionId: string) => {
  return await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      expiresAt: new Date(Date.now() + MAX_DURATION_MS),
    },
  });
};

export const invalidateSession = async (sessionId: string) => {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
