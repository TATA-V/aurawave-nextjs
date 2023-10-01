'use client';
import React from 'react';
import styled from 'styled-components';
import SkeletonMusicLi from './SkeletonMusicLi';

function SkeletonMusicSection() {
  return (
    <SkeletonMusicSectionBlock>
      <div className="first">
        {[...Array(5)].map((_, i) => (
          <SkeletonMusicLi key={i} />
        ))}
      </div>
      <div className="second">
        {[...Array(5)].map((_, i) => (
          <SkeletonMusicLi key={i} />
        ))}
      </div>
    </SkeletonMusicSectionBlock>
  );
}

export default SkeletonMusicSection;

const SkeletonMusicSectionBlock = styled.div`
  padding-left: 21px;

  display: flex;
`;
