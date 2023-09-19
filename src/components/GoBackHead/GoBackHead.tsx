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
  height: 61px;
  background-color: pink; // 나중에 삭제할 예정

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
