'use client';
import './globals.css';
import './reset.css';
import './iconfonts.css';
import Layout from '../components/Layout/Layout';
import StyledComponentsRegistry from '../lib/registry';
import { Noto_Sans } from 'next/font/google';
import { Bubblegum_Sans } from 'next/font/google';

export const notoSans = Noto_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});
export const bubblegum = Bubblegum_Sans({ weight: '400', subsets: ['latin'] });

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
