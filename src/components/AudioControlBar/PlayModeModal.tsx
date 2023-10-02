'use client';
import currentTrackState, { CurrentMusic } from '@/atom/currentTrackState';
import React, { SetStateAction, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import * as S from '@/styled/audioControl';

interface Props {
  playModeModal: boolean;
  setPlayModeModal: React.Dispatch<SetStateAction<boolean>>;
}

function PlayModeModal({ playModeModal, setPlayModeModal }: Props) {
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState);
  const { isLoop, playMode, currentTrack } = currentMusicAndTrack;
  const modalRef = useRef<HTMLUListElement>(null);

  // 모달창 밖을 클릭하면 모달창 닫힘
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (playModeModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setPlayModeModal(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [playModeModal, setPlayModeModal]);

  // Loop
  const handleLoop = () => {
    if (isLoop) {
      setCurrentMusicAndTrack((prev) => ({ ...prev, isLoop: false }));
    } else {
      setCurrentMusicAndTrack((prev) => ({ ...prev, isLoop: true }));
    }
  };

  // 배열 데이터를 랜덤으로
  const shuffle = (array: CurrentMusic[]) => {
    const arr = [...array];
    return arr.sort(() => Math.random() - 0.5);
  };

  // shuffle
  const handlePlayShuffle = () => {
    if (playMode === 'shuffle') {
      setCurrentMusicAndTrack((prev) => ({ ...prev, playMode: '' }));
    } else {
      setCurrentMusicAndTrack((prev) => ({ ...prev, playMode: 'shuffle' }));
    }

    if (playMode === 'shuffle') {
      const randomData = shuffle(currentTrack);
      setCurrentMusicAndTrack((prev) => ({ ...prev, suffleTrack: randomData }));
    }
  };

  return (
    <S.PlayModeModalBlock ref={modalRef} isLoop={isLoop} playMode={playMode}>
      <li onClick={handleLoop} className="option-box border-bottom">
        <i className="i-loop" />
        <span className="option-txt loop">LOOP</span>
      </li>
      <li onClick={handlePlayShuffle} className="option-box">
        <i className="i-shuffle" />
        <span className="option-txt shuffle">SHUFFLE</span>
      </li>
    </S.PlayModeModalBlock>
  );
}

export default PlayModeModal;
