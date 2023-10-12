'use client';
import React from 'react';
import styled from 'styled-components';
import SkeletonMusicLi from './SkeletonMusicLi';

function SkeletonMusicLi8() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <SkeletonMusicLi key={i} />
      ))}
    </>
  );
}

export default SkeletonMusicLi8;
