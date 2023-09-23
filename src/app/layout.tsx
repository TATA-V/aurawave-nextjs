'use client';
import './globals.css';
import './reset.css';
import './iconfonts.css';
import Layout from '@/components/Layout/Layout';
import StyledComponentsRegistry from './lib/registry';
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <html lang="ko">
        <head>
          <title>AuraWave</title>
          <meta name="description" content="Custom Music App" />
        </head>
        <body>
          <StyledComponentsRegistry>
            <Layout>{children}</Layout>
          </StyledComponentsRegistry>
        </body>
      </html>
    </RecoilRoot>
  );
}
