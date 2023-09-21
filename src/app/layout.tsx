'use client';
import './globals.css';
import './reset.css';
import './iconfonts.css';
import Layout from '@/components/Layout/Layout';
import StyledComponentsRegistry from '@/lib/registry';
import { notoSans } from '@/fonts/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>AuraWave</title>
        <meta name="description" content="Custom Music App" />
      </head>
      <body className={notoSans.className}>
        <StyledComponentsRegistry>
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
