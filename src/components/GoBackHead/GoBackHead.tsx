'use client';
import React from 'react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  title?: string;
}

function GoBackHead({ title }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    if (pathname === '/login') {
      router.replace('/profile');
    } else if (pathname === '/signup') {
      router.replace('/login');
    } else {
      router.back();
    }
  };

  return (
    <GoBackHeadBlok>
      <div onClick={handleGoBack} role="button" className="back-btn">
        <i className="i-back" />
      </div>

      {title && <Title>{title}</Title>}

      <div className="right-box" />
    </GoBackHeadBlok>
  );
}

export default GoBackHead;

const GoBackHeadBlok = styled.header`
  position: fixed;
  top: 0;
  width: 390px;
  height: 61px;
  background-color: var(--white-100);
  z-index: 5;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .back-btn {
    width: 63px;
    height: 61px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .i-back {
    font-size: 18;

    &::before {
      color: var(--dark-blue-900);
    }
  }

  .right-box {
    width: 63px;
    height: 61px;
  }
`;

const Title = styled.p`
  color: var(--dark-blue-900);
  font-size: 1.09375rem;
  font-weight: 600;
`;
