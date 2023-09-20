'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

function GoBackHead() {
  const router = useRouter();

  return (
    <GoBackHeadBlok>
      <div onClick={() => router.back()} role="button" className="back-btn">
        <i className="i-back" />
      </div>
    </GoBackHeadBlok>
  );
}

export default GoBackHead;

const GoBackHeadBlok = styled.header`
  width: 390px;
  height: 61px;
  background-color: var(--white-100);
  position: fixed;
  top: 0;

  display: flex;
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
`;
