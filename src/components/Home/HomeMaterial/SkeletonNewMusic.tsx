'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';

function SkeletonNewMusic() {
  return (
    <SkeletonNewMusicBlock>
      <div className="wrapper">
        <div className="image" />
        <div className="content">
          <div className="title" />
          <div className="composer" />
        </div>
      </div>
    </SkeletonNewMusicBlock>
  );
}

export default SkeletonNewMusic;

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

const SkeletonNewMusicBlock = styled.div`
  padding-right: 21px;
  .wrapper {
    width: 95px;
    height: 133px;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      animation: ${sweep} 2s infinite;
      background-image: linear-gradient(
        to left,
        transparent,
        rgba(255, 255, 255, 0.25),
        transparent
      );
      transform: rotate(30deg);
    }
  }

  .image {
    width: 95px;
    height: 95px;
    border-radius: 4px;
    background-color: var(--gray-100);
  }

  .content {
    padding: 9px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .title {
    width: 55px;
    height: 12px;
    border-radius: 3px;
    background-color: var(--gray-100);
  }

  .composer {
    width: 32px;
    height: 12px;
    border-radius: 3px;
    margin-top: 3px;
    background-color: var(--gray-100);
  }
`;
