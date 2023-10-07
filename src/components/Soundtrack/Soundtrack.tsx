'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useResetRecoilState } from 'recoil';
import currentTrackState, { CurrentMusic } from '@/atom/currentTrackState';
import CheckSvg from '@/../public/checkSvg.svg';
import { useRouter } from 'next/navigation';

import GoBackHead from '../GoBackHead/GoBackHead';
import SoundtrackMusicLi from './SoundtrackMusicLi';

function Soundtrack() {
  const [musicTrack, setMusicTrack] = useState<CurrentMusic[]>([]);
  const [musicTrackTxt, setMusicTrackTxt] = useState('');
  // MusicLi 드래그
  const [dragItemIdx, setDragItemIdx] = useState(0);
  const [dragOverItemIdx, setDragOverItemIdx] = useState(0);

  const resetCurrentMusicAndTrack = useResetRecoilState(currentTrackState); // 리코일
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { playMode, currentTrack, suffleTrack } = currentMusicAndTrack;
  const router = useRouter();

  useEffect(() => {
    const track = playMode === 'shuffle' ? suffleTrack : currentTrack;
    const trackTxt = playMode === 'shuffle' ? 'suffleTrack' : 'currentTrack';
    setMusicTrack(track);
    setMusicTrackTxt(trackTxt);
  }, [playMode, currentTrack, suffleTrack]);

  // 재생목록에 노래가 하나도 없다면
  useEffect(() => {
    if (currentTrack.length === 0) {
      resetCurrentMusicAndTrack();
      router.back();
    }
  }, [currentTrack.length, resetCurrentMusicAndTrack, router]);

  // 드래그 시작
  const handleDragStart = (position: number) => {
    setDragItemIdx(position);
  };

  // 드래그 중에 다른 요소 위로 들어갈 때
  const handelDragEnter = (position: number) => {
    setDragOverItemIdx(position);
  };

  // 드래그 작업이 끝났을 때 (마우스 뗐을 때)
  const handleDragEnd = () => {
    const newMusicTrack = [...musicTrack];
    const dragItemValue = newMusicTrack[dragItemIdx];
    newMusicTrack.splice(dragItemIdx, 1);
    newMusicTrack.splice(dragOverItemIdx, 0, dragItemValue);
    setDragItemIdx(0);
    setDragOverItemIdx(0);
    setMusicTrack(newMusicTrack);

    setCurrentMusicAndTrack((prev) => ({
      ...prev,
      [musicTrackTxt]: newMusicTrack,
    }));
  };

  return (
    <>
      <GoBackHead title="재생목록" />

      <SoundtrackBlock>
        <TrackCount>
          <CheckSvg />
          <span className="track-count-txt">{musicTrack.length}곡</span>
        </TrackCount>

        <ul>
          {musicTrack.map((track, idx) => (
            <SoundtrackMusicLi
              key={track.uuid}
              el={track}
              idx={idx}
              handleDragStart={handleDragStart}
              handelDragEnter={handelDragEnter}
              handleDragEnd={handleDragEnd}
            />
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

const MusicLi = styled.li`
  margin-bottom: 17px;

  .music-content {
    width: 346.12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .details-box {
    display: flex;
    align-items: center;
  }

  .image {
    border: 1px solid var(--gray-100);
    border-radius: 2px;
    object-fit: cover;
    cursor: pointer;
  }

  .details {
    width: 225px;
    padding-left: 16px;
    line-height: 1.1rem;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
  }

  .composer {
    color: var(--gray-400);
    font-size: 0.8125rem;
    font-weight: 400;
    cursor: pointer;
  }
`;

const MoreBox = styled.div`
  position: relative;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
