'use client';
import React from 'react';
import MoonBlueSvg from '@/../public/moonBlueSvg.svg';
import MoonGraySvg from '@/../public/moonGraySvg.svg';
import MusicBlueSvg from '@/../public/musicBlueSvg.svg';
import MusicGraySvg from '@/../public/musicGraySvg.svg';
import ChatBlueSvg from '@/../public/chatBlueSvg.svg';
import ChatGraySvg from '@/../public/chatGraySvg.svg';
import PeopleBlueSvg from '@/../public/peopleBlueSvg.svg';
import PeopleGraySvg from '@/../public/PeopleGraySvg.svg';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

function BottomTab() {
  const pathname = usePathname();
  return (
    <BottomTabBlock>
      <div className="svg-box">
        <Link href={'/'}>{pathname === '/' ? <MoonBlueSvg /> : <MoonGraySvg />}</Link>
        <Link href={'/music'}>{pathname === '/music' ? <MusicBlueSvg /> : <MusicGraySvg />}</Link>
        <Link href={'/chat'}>{pathname === '/chat' ? <ChatBlueSvg /> : <ChatGraySvg />}</Link>
        <Link href={'/profile'}>
          {pathname === '/profile' ? <PeopleBlueSvg /> : <PeopleGraySvg />}
        </Link>
      </div>
    </BottomTabBlock>
  );
}

export default BottomTab;

export const BottomTabBlock = styled.nav`
  width: 390px;
  height: 50px;
  padding: 14px 44px;
  background-color: var(--white-100);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.12);
  position: fixed;
  bottom: 0;

  .svg-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
