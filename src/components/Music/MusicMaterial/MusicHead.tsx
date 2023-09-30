'use client';
import React from 'react';
import styled from 'styled-components';

function MusicHead() {
  return (
    <MusicHeadBlock>
      <p className="music-txt">Music</p>
    </MusicHeadBlock>
  );
}

export default MusicHead;

const MusicHeadBlock = styled.div`
  width: 100%;
  height: 61px;
  padding-left: 21px;
  background-color: var(--white-100); // 나중에 색상 바꿔줄 예정

  display: flex;
  align-items: center;

  .music-txt {
    color: var(--dark-blue-900);
    font-size: 1.6875rem;
    font-weight: 500;
  }
`;
