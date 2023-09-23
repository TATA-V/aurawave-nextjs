'use client';
import { useRecoilValue } from 'recoil';
import React from 'react';
import Image from 'next/image';
import userState from '@/atom/userState';
import LogoMoonSvg from '@/../public/LogoMoonSvg.svg';
import defaultProfileJpg from '@/assets/jpg-file/default-profile.jpg';
import styled from 'styled-components';
import Link from 'next/link';

function HomeHead() {
  const { photoURL, isLoggedIn } = useRecoilValue(userState);

  return (
    <HomeHeadBlock>
      <LeftBox>
        <LogoMoonSvg />
        <p className="logo-text">AuraWave</p>
      </LeftBox>

      <RightBox>
        <i className="i-bell" />
        <Link href={'/profile'}>
          <Image
            className="image"
            width={33}
            height={33}
            alt="user profile"
            src={isLoggedIn && photoURL !== null ? photoURL : defaultProfileJpg}
          />
        </Link>
      </RightBox>
    </HomeHeadBlock>
  );
}

export default HomeHead;

const HomeHeadBlock = styled.header`
  height: 61px;
  padding: 14px 21px;
  background-color: var(--white-100);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 135;
  display: flex;
  justify-content: space-between;
  align-items: 'center';
  user-select: none;

  .logo-text {
    color: var(--dark-blue-900);
    font-size: 1.75rem;
    display: flex;
    align-items: center;
    font-family: 'Bubblegum Sans', cursive;
  }
`;

const RightBox = styled.div`
  display: flex;
  width: 72.87px;
  justify-content: space-between;
  align-items: center;

  .i-bell {
    color: var(--dark-blue-900);
    font-size: 21px;
    display: flex;
  }

  .image {
    border-radius: 50%;
    display: flex;
  }
`;
