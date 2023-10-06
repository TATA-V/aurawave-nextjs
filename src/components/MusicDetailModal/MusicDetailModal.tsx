'use client';
import currentTrackState from '@/atom/currentTrackState';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from '@/styled/MusicDetailModalStyled';
import Image from 'next/image';
import formatTime from '@/utils/formatTime';
import MusicPauseSvg from '@/../public/musicPauseSvg.svg';
import useCloseModal from '@/hook/useCloseModal';

import MusicTitle from './MusicDetailModalMaterial/MusicTitle';
import MusicCopyright from './MusicDetailModalMaterial/MusicCopyright';
import PlaymodeMenu from './MusicDetailModalMaterial/PlaymodeMenu';

interface Props {
  play: boolean;
  totalDuration: number;
  currentDuration: number;
  progressBarWidth: number;
  handlePrevNextMusic: (type?: 'prev' | 'next') => void;
  handleTogglePlay: () => void;
  handleProgressBar: (e: React.MouseEvent<HTMLDivElement>, type: string) => void;
}

function MusicDetailModal({
  play,
  totalDuration,
  currentDuration,
  handleTogglePlay,
  handlePrevNextMusic,
  progressBarWidth,
  handleProgressBar,
}: Props) {
  const [openModal, setOpenModal] = useState(true);

  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { showMusicDetail, currentMusic } = currentMusicAndTrack;
  const { imageUri, composer } = currentMusic;
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!openModal) {
      // 모달이 닫힌 후 수행할 작업
      setTimeout(() => {
        setCurrentMusicAndTrack((prev) => ({ ...prev, showMusicDetail: false }));
      }, 150);
    }
  }, [openModal, setCurrentMusicAndTrack]);

  // 모달창 영역 밖을 클릭하면 모달창 닫힘
  useCloseModal({ modalRef, state: showMusicDetail, setState: setOpenModal }); // hook

  return (
    <>
      <S.MusicDetailModalBlock>
        <S.MusicDetailBox openModal={openModal} ref={modalRef}>
          <S.MusicDetail>
            {/* 닫기 버튼 */}
            <S.CloseBtnBox>
              <button onClick={handleClose} className="close-btn">
                <div className="close" />
              </button>
            </S.CloseBtnBox>

            {/* 음악 제목 => MusicTitle 컴포넌트 */}
            <MusicTitle />
            {/* 음악 이미지 */}
            <Image className="image" width={340} height={340} src={imageUri} alt="album image" />
            {/* 출처 => MusicCopyright 컴포넌트 */}
            <MusicCopyright />
            {/* 저작권자 */}
            <S.Composer>
              <p className="composer">{composer}</p>
            </S.Composer>
            {/* 프로그레스바 */}
            <S.ProgressBarBox
              onMouseDown={(e) => handleProgressBar(e, 'click')}
              progressBarWidth={progressBarWidth}
            >
              <div className="progressbar" />
            </S.ProgressBarBox>
            {/* 음악 시간 - 현재 재생 시간, 총 음악 시간 */}
            <S.MusicTime>
              <p>{formatTime(currentDuration)}</p>
              <p>{formatTime(totalDuration)}</p>
            </S.MusicTime>

            {/* 음악 컨트롤 */}
            <S.Controls>
              {/* 이전 곡 재생 - 곡 재생 ,일시 정지 - 다음 곡 */}
              <S.PlayBox>
                <button onClick={() => handlePrevNextMusic('prev')}>
                  <i className="i-back-music" />
                </button>
                <button onClick={() => handleTogglePlay()} className="play-btn">
                  {play ? (
                    <MusicPauseSvg width={42} height={44} fill={'#283437'} />
                  ) : (
                    <i className="i-play" />
                  )}
                </button>
                <button onClick={() => handlePrevNextMusic()}>
                  <i className="i-next-play" />
                </button>
              </S.PlayBox>

              {/* 음악 루프 설정, 음악 셔플 모드, soundtrack으로 이동 => PlaymodeMenu 컴포넌트 */}
              <PlaymodeMenu setOpenModal={setOpenModal} />
            </S.Controls>
          </S.MusicDetail>
        </S.MusicDetailBox>
      </S.MusicDetailModalBlock>
    </>
  );
}

export default MusicDetailModal;
