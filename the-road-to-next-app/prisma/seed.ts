import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const tickets = [
  {
    title: 'Login form validation',
    content:
      'Improve error messages and add client-side validation for the login form.',
    status: 'Open' as const,
  },
  {
    title: 'Landing page hero',
    content: 'Update hero copy and add a secondary CTA to improve conversion.',
    status: 'Open' as const,
  },
  {
    title: 'API rate limits',
    content:
      'Document current rate limits and expose headers in the public API responses.',
    status: 'Closed' as const,
  },
  {
    title: 'Mobile navigation',
    content:
      'Refactor the mobile nav to reduce layout shifts on smaller breakpoints.',
    status: 'Open' as const,
  },
  {
    title: 'Analytics events audit',
    content:
      'Ensure all checkout steps emit analytics events with consistent payloads.',
    status: 'InProgress' as const,
  },
  {
    title: 'Legacy job clean-up',
    content:
      'Remove deprecated background job queue after the migration is verified.',
    status: 'Closed' as const,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('Seeding tickets...');
  await prisma.ticket.findMany().then(async (existingTickets) => {
    const ticketsToCreate = tickets.filter(
      (t) => !existingTickets.some((et) => et.title === t.title)
    );
    return await prisma.ticket.createMany({
      data: ticketsToCreate,
    });
  });
  const t1 = performance.now();
  console.log(`Seeding completed in ${(t1 - t0) / 1000} seconds.`);
};

seed();
