import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { BookmarksProvider } from '@/context/bookmarks-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HR Performance Dashboard',
  description: 'Track employee performance, manage bookmarks, and view detailed insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BookmarksProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </BookmarksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}