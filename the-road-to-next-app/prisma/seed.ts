import 'dotenv/config';
import { hashPassword } from '@/lib/crypto';
import { PrismaClient } from '../src/generated/prisma';

const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ datasourceUrl: connectionString });

const users = [
  { username: 'admin', email: 'admin@admin.com', password: 'admin' },
  { username: 'user', email: 'user@user.com', password: 'user' },
];

const tickets = [
  {
    title: 'Login form validation',
    content:
      'Improve error messages and add client-side validation for the login form.',
    status: 'Open' as const,
    bounty: 499,
    deadline: new Date().toISOString().split('T')[0],
  },
  {
    title: 'Landing page hero',
    content: 'Update hero copy and add a secondary CTA to improve conversion.',
    status: 'Open' as const,
    bounty: 499,
    deadline: new Date().toISOString().split('T')[0],
  },
  {
    title: 'API rate limits',
    content:
      'Document current rate limits and expose headers in the public API responses.',
    status: 'Closed' as const,
    bounty: 900,
    deadline: new Date().toISOString().split('T')[0],
  },
  {
    title: 'Mobile navigation',
    content:
      'Refactor the mobile nav to reduce layout shifts on smaller breakpoints.',
    status: 'Open' as const,
    bounty: 499,
    deadline: new Date().toISOString().split('T')[0],
  },
  {
    title: 'Analytics events audit',
    content:
      'Ensure all checkout steps emit analytics events with consistent payloads.',
    status: 'InProgress' as const,
    bounty: 1200,
    deadline: new Date().toISOString().split('T')[0],
  },
  {
    title: 'Legacy job clean-up',
    content:
      'Remove deprecated background job queue after the migration is verified.',
    status: 'Closed' as const,
    bounty: 700,
    deadline: new Date().toISOString().split('T')[0],
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('Seeding tickets...');
  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();
  const newUsers = await prisma.user.findMany().then(async (existingUsers) => {
    const newUsers = await Promise.all(
      users
        .filter(
          (newUser) =>
            !existingUsers.some((user) => user.email === newUser.email),
        )
        .map(async (newUser) => {
          const { password, username, email } = newUser;
          const passwordHash = await hashPassword(password);
          return {
            username,
            email,
            passwordHash,
          };
        }),
    );

    return await Promise.all(
      newUsers.map((data) =>
        prisma.user.create({
          data,
        }),
      ),
    );
  });

  const ticketsToCreate = await prisma.ticket
    .findMany()
    .then(async (existingTickets) => {
      return tickets.filter(
        (t) => !existingTickets.some((et) => et.title === t.title),
      );
    });

  const availableIds = newUsers.map((user) => user.id);

  await Promise.all([
    ticketsToCreate.map(async (ticket) => {
      const userId =
        availableIds[Math.floor(Math.random() * availableIds.length)];

      const data = { ...ticket, userId };
      return await prisma.ticket.create({
        data,
      });
    }),
  ]);

  const t1 = performance.now();
  console.log(`Seeding completed in ${(t1 - t0) / 1000} seconds.`);
};

seed();
