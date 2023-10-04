'use client';
import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';
import CheckSvg from '@/../public/checkSvg.svg';

import GoBackHead from '../GoBackHead/GoBackHead';
import MusicLi from '../MusicLi/MusicLi';
function Soundtrack() {
  const { playMode, currentTrack, suffleTrack } = useRecoilValue(currentTrackState); // 리코일
  const musicTrack = playMode === 'shuffle' ? suffleTrack : currentTrack;

  return (
    <>
      <GoBackHead title="재생목록" />

      <SoundtrackBlock>
        <TrackCount>
          <CheckSvg />
          <span className="track-count-txt">{musicTrack.length}곡</span>
        </TrackCount>

        <ul>
          {musicTrack.map((track) => (
            <MusicLi key={track.uuid} el={track} />
          ))}
        </ul>
      </SoundtrackBlock>
    </>
  );
}

export default Soundtrack;

const SoundtrackBlock = styled.div`
  padding-left: 21px;
`;

const TrackCount = styled.div`
  padding: 74px 0 19px 0;

  .track-count-txt {
    color: var(--dark-blue-600);
    font-size: 0.8125rem;
    padding-left: 6px;
  }
`;
