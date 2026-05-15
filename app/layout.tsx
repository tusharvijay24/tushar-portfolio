import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tushar Vijayvargiya | Senior iOS & Web Developer',
  description: 'Senior iOS Developer with 5+ years of experience. Also builds full-stack web products with React and Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
