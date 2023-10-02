'use client';
import React from 'react';
import styled from 'styled-components';
import SkeletonMusicLi from './SkeletonMusicLi';

function SkeletonMusicCollection() {
  return (
    <SkeletonMusicCollectionBlock>
      {[...Array(30)].map((_, i) => (
        <SkeletonMusicLi key={i} />
      ))}
    </SkeletonMusicCollectionBlock>
  );
}

export default SkeletonMusicCollection;

const SkeletonMusicCollectionBlock = styled.div`
  padding-left: 21px;
`;
