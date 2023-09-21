import { Noto_Sans } from 'next/font/google';
import { Bubblegum_Sans } from 'next/font/google';

export const notoSans = Noto_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});
export const bubblegum = Bubblegum_Sans({ weight: '400', subsets: ['latin'] });
