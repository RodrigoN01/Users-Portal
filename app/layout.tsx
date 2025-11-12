import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Users Portal",
  description: "A minimalist user management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='bg-white text-gray-800 antialiased'>
        {/* Header */}
        <header className='border-b border-gray-200 sticky top-0 bg-white z-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
            <Link
              href='/'
              className='flex items-center gap-2 w-fit cursor-pointer hover:opacity-80 transition-opacity'
            >
              <Users className='w-6 h-6' />
              <h1 className='text-xl font-semibold'>Users Portal</h1>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {children}
        </main>
      </body>
    </html>
  );
}
