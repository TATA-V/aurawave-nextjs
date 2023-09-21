'use client';
import React from 'react';
import userState from '@/atom/userState';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useAuthentication from '@/hook/useAuthentication';

import HomeHead from './HomeMaterial/HomeHead';
import BottomTab from '../BottomTab/BottomTab';
import Landscape from '../Landscape/Landscape';

function Home() {
  const { username, isLoggedIn } = useRecoilValue(userState);
  useAuthentication();

  return (
    <>
      <HomeHead />
      <HelloText>
        <p className="hello-text">Hello{isLoggedIn && ` ${username}`}👋</p>
      </HelloText>
      <Landscape />
      <BottomTab />
    </>
  );
}

export default Home;

const HelloText = styled.div`
  padding: 26px 21px 8px 21px;

  .hello-text {
    color: var(--sky-blue-600);
    font-size: 15;
    font-weight: 400;
    padding-left: 1;
  }
`;
