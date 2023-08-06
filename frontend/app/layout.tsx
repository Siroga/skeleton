import Header from '@/components/UI/Header';
import '../styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import ScrollToTop from '@/components/UI/ScrollToTop';
import Footer from '@/components/UI/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Skeleton Next App',
  description: 'Skeleton Next App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
