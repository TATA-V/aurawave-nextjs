'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';

function SkeletonMusicLi() {
  return (
    <SkeletonMusicLiBlock>
      <div className="details-box">
        <div className="image" />
        <div className="details">
          <div className="title" />
          <div className="composer" />
        </div>
      </div>
    </SkeletonMusicLiBlock>
  );
}

export default SkeletonMusicLi;

export const sweep = keyframes`
  0% {
      transform: translateX(-100%);
  }
  50% {
      transform: translateX(150%);
  }
  100% {
      transform: translateX(-100%);
  }
`;

const SkeletonMusicLiBlock = styled.div`
  width: 346.12px;
  padding-bottom: 17px;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    animation: ${sweep} 2s infinite;
    background-image: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.25), transparent);
    transform: rotate(30deg);
  }

  .details-box {
    display: flex;
    align-items: center;
  }

  .image {
    width: 49px;
    height: 49px;
    border-radius: 2px;
    background-color: var(--gray-100);
  }

  .details {
    width: 225px;
    padding-left: 16px;
  }

  .title {
    width: 195px;
    height: 15px;
    border-radius: 3px;
    background-color: var(--gray-100);
  }

  .composer {
    width: 97px;
    height: 15px;
    border-radius: 3px;
    margin-top: 6px;
    background-color: var(--gray-100);
  }
`;
