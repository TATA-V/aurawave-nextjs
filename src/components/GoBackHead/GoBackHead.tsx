'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import { bubblegum } from '@/fonts/fonts';

interface Props {
  title?: string;
}

function GoBackHead({ title }: Props) {
  const [isAurawaveTxt, setIsAurawaveTxt] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (title === '플레이리스트' || title === '플레이리스트 등록 & 삭제') {
      setIsAurawaveTxt(true);
    }
  }, [title]);

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

      {title && !isAurawaveTxt && <Title>{title}</Title>}
      {title && isAurawaveTxt && (
        <Title>
          <span className={`aw-txt ${bubblegum.className}`}>
            {title === '플레이리스트' ? 'AuraWave' : 'AW'}
          </span>{' '}
          {title}
        </Title>
      )}

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
  z-index: 2;

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

  .aw-txt {
    font-size: 1.1875rem;
    font-weight: 400;
  }
`;
