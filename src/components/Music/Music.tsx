'use client';
import React from 'react';
import styled from 'styled-components';

import BottomTab from '../BottomTab/BottomTab';
import MusicHead from './MusicMaterial/MusicHead';
import MusicSection from './MusicMaterial/MusicSection';
import AwPlaylistSection from './MusicMaterial/AwPlaylistSection';
import { useRecoilValue } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';

function Music() {
  const { isShow } = useRecoilValue(currentTrackState);

  return (
    <MusicBlock $isShow={isShow}>
      <MusicHead />
      <MusicSection />
      <AwPlaylistSection />
      <BottomTab />
    </MusicBlock>
  );
}

export default Music;

interface IsShow {
  $isShow: boolean;
}

const MusicBlock = styled.div<IsShow>`
  padding-bottom: ${({ $isShow }) => ($isShow ? '75px' : null)};
`;
