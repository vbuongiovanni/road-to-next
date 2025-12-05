import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { Paths } from '@/paths';
import { buildRoute } from '@/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Road to Next App',
  description: 'Road to Next Course',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarStyle =
    'supports-backdrop-blue:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between';
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className={navbarStyle}>
          <div>
            <Link className='text-lg font-bold' href={buildRoute(Paths.Home)}>
              Home
            </Link>
          </div>
          <div>
            <Link
              className='text-sm underline'
              href={buildRoute(Paths.Tickets)}>
              Tickets
            </Link>
          </div>
        </nav>
        <main className='py-24 px-8'>{children}</main>
      </body>
    </html>
  );
}
