'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';
import CheckSvg from '@/../public/checkSvg.svg';
import { useRouter } from 'next/navigation';

import GoBackHead from '../GoBackHead/GoBackHead';
import MusicLi from '../MusicLi/MusicLi';
function Soundtrack() {
  const resetCurrentMusicAndTrack = useResetRecoilState(currentTrackState); // 리코일
  const { playMode, currentTrack, suffleTrack } = useRecoilValue(currentTrackState); // 리코일
  const musicTrack = playMode === 'shuffle' ? suffleTrack : currentTrack;
  const router = useRouter();

  // 재생목록에 노래가 한 개도 없다면
  useEffect(() => {
    if (currentTrack.length === 0) {
      resetCurrentMusicAndTrack();
      router.back();
    }
  }, [currentTrack.length, resetCurrentMusicAndTrack, router]);

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
