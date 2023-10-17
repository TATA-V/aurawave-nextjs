'use client';
import React from 'react';
import styled from 'styled-components';

import BottomTab from '../components/BottomTab/BottomTab';
import MusicHead from '../components/Music/MusicHead';
import MusicSection from '../components/Music/MusicSection';
import AwPlaylistSection from '../components/Music/AwPlaylistSection';
import MyPlaylistSection from '../components/Music/MyPlaylistSection';
import UserPlaylistSection from '@/components/Music/UserPlaylistSection';

function Music() {
  return (
    <MusicBlock>
      <MusicHead />
      <MusicSection />
      <AwPlaylistSection />
      <MyPlaylistSection />
      <UserPlaylistSection />
      <BottomTab />
    </MusicBlock>
  );
}

export default Music;

const MusicBlock = styled.div`
  padding-bottom: 75px;
`;
