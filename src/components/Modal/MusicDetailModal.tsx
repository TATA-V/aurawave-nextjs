'use client';
import currentTrackState from '@/atom/currentTrackState';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import MoreSvg from '@/../public/more.svg';
import Image from 'next/image';
import formatTime from '@/utils/formatTime';
import MusicPauseSvg from '@/../public/musicPauseSvg.svg';
import { useRouter } from 'next/navigation';

import AddToPlaylistModal from './AddToPlaylistModal';
import { useMusicLoop, useMusicShuffle } from '@/hook/useMusicControl';

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
  const [close, setClose] = useState(false);
  const [showCopyright, setShowCopyright] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);

  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { isLoop, playMode, showMusicDetail, currentMusic } = currentMusicAndTrack;
  const { imageUri, musicUri, title, composer, copyright } = currentMusic;
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleLoop = useMusicLoop(); // hook
  const handleShuffle = useMusicShuffle(); // hook

  const handleClose = () => {
    setClose(true);
    setTimeout(() => {
      setCurrentMusicAndTrack((prev) => ({ ...prev, showMusicDetail: false }));
    }, 150);
  };

  // 모달창 영역 밖을 클릭하면 모달창 닫힘
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (showMusicDetail && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setClose(true);
        setTimeout(() => {
          setCurrentMusicAndTrack((prev) => ({ ...prev, showMusicDetail: false }));
        }, 150);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showMusicDetail, setCurrentMusicAndTrack]);

  // soundtrack 페이지로 이동
  const handleSoundtrack = () => {
    router.push('soundtrack');
    setClose(true);
    setTimeout(() => {
      setCurrentMusicAndTrack((prev) => ({ ...prev, showMusicDetail: false }));
    }, 150);
  };

  return (
    <>
      <MusicDetailModalBlock>
        <MusicDetailBox close={close} ref={modalRef}>
          <MusicDetail>
            <CloseBtnBox>
              <button onClick={handleClose} className="close-btn">
                <div className="close" />
              </button>
            </CloseBtnBox>

            <TitleBox>
              <div className="left" />
              <p className="title">{title}</p>
              <button
                onClick={() => setShowAddToPlaylistModal(!showAddToPlaylistModal)}
                className="more-btn"
              >
                <MoreSvg width={28.12} height={5.62} fill={'#B1B7B9'} />
              </button>
              {showAddToPlaylistModal && (
                <AddToPlaylistModal
                  el={currentMusic}
                  top="32"
                  showAddToPlaylistModal={showAddToPlaylistModal}
                  setShowAddToPlaylistModal={setShowAddToPlaylistModal}
                />
              )}
            </TitleBox>

            <Image className="image" width={340} height={340} src={imageUri} alt="album image" />

            <CopyrightBox>
              <button onClick={() => setShowCopyright(!showCopyright)} className="copyright-btn">
                <i className="i-source" />
                <p className="copyright-txt">출처</p>
              </button>
              {showCopyright && (
                <div className="copyright-actual">
                  <p className="copyright-actual-txt">{copyright}</p>
                </div>
              )}
            </CopyrightBox>

            <Composer>
              <p className="composer">{composer}</p>
            </Composer>

            <ProgressBarBox
              onMouseDown={(e) => handleProgressBar(e, 'click')}
              progressBarWidth={progressBarWidth}
            >
              <div className="progressbar">
                <div className="circle" />
              </div>
            </ProgressBarBox>

            <MusicTime>
              <p>{formatTime(currentDuration)}</p>
              <p>{formatTime(totalDuration)}</p>
            </MusicTime>

            <Controls>
              <PlayBox>
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
              </PlayBox>

              <PlaymodeMenuBox isLoop={isLoop} playMode={playMode}>
                <button onClick={handleLoop}>
                  <i className="i-loop" />
                </button>
                <button onClick={handleShuffle}>
                  <i className="i-shuffle" />
                </button>
                <button onClick={handleSoundtrack}>
                  <i className="i-menu" />
                </button>
              </PlaymodeMenuBox>
            </Controls>
          </MusicDetail>
        </MusicDetailBox>
      </MusicDetailModalBlock>
    </>
  );
}

export default MusicDetailModal;

interface Close {
  close: boolean;
}

interface ProgressBarWidth {
  progressBarWidth: number;
}

interface IsLoop {
  isLoop: boolean;
}

interface PlayMode {
  playMode: string;
}

const fadeInUp = keyframes`
  from {
    opacity: 0.7;
    transform: translateY(360px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const MusicDetailModalBlock = styled.div`
  width: 390px;
  height: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 2;
`;

const MusicDetailBox = styled.div<Close>`
  width: 390px;
  height: 100%;
  background-color: var(--white-100);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.12);
  animation: ${fadeInUp} 0.25s ease-out;
  transform: ${({ close }) => (close ? 'translateY(370px)' : 'translateY(0)')};
  opacity: ${({ close }) => (close ? '0' : '1')};
  transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;

  position: absolute;
  top: 20px;

  .image {
    border: 1px solid var(--gray-100);
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

const MusicDetail = styled.div`
  min-height: 770px;
  padding: 11px 25px 30px 25px;
`;

const CloseBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .close-btn {
    padding: 5px 0 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close {
    width: 58px;
    height: 5px;
    border-radius: 8px;
    background-color: var(--blue-gray-300);
  }
`;

const TitleBox = styled.div`
  width: 100%;
  height: 34px;
  margin: 19px 0 18px 0;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    width: 38.12px;
  }

  .more-btn {
    width: 38.12px;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 1rem;
    font-weight: 600;
  }
`;

const CopyrightBox = styled.div`
  padding: 35px 0 9px 0;
  position: relative;
  display: flex;

  .copyright-btn {
    width: 68px;
    height: 29px;
    border: 1px solid var(--gray-100);
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(16, 29, 33, 0.07);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i-source {
    font-size: 11px;
  }

  .copyright-txt {
    color: var(--dark-blue-900);
    font-size: 0.65rem;
    font-weight: 500;
    padding: 1px 0 0 6.62px;
  }

  .copyright-actual {
    min-height: 29px;
    max-width: 268px;
    border: 1px solid var(--gray-100);
    border-radius: 3px;
    padding: 8px 10px 8px 10px;
    box-shadow: 0 2px 8px rgba(16, 29, 33, 0.07);
    animation: ${fadeInRight} 0.15s ease-out;
    position: absolute;
    left: 72px;
    white-space: pre-line;
    word-wrap: break-word;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .copyright-actual-txt {
    color: var(--dark-blue-700);
    font-size: 0.5rem;
    font-weight: 500;
    max-width: 248px;
  }
`;

const Composer = styled.div`
  padding-bottom: 28px;

  .composer {
    color: var(--blue-gray-700);
    font-size: 0.875rem;
    font-size: 400;
  }
`;

const ProgressBarBox = styled.div<ProgressBarWidth>`
  width: 100%;
  height: 5px;
  border-radius: 10px;
  background-color: #e5ecee;
  box-shadow: inset 0.5px -1.5px 2px rgba(16, 29, 33, 0.1);
  cursor: pointer;

  .progressbar {
    width: ${({ progressBarWidth }) => (isNaN(progressBarWidth) ? '0%' : `${progressBarWidth}%`)};
    height: 5px;
    border-radius: 50px 0 0 50px;
    background: linear-gradient(to top, #2f7381, #7a99a4);
    box-shadow: 2px 2px 3px rgba(16, 29, 33, 0.1);
    position: relative;
    cursor: pointer;
  }

  .circle {
    position: absolute;
    bottom: -4.5px;
    right: -3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-image: linear-gradient(345deg, #255660 0%, #587f86 50%, #8da7b1 100%);
    box-shadow: 2px 1px 3px rgba(16, 29, 33, 0.15);
    cursor: pointer;
  }
`;

const MusicTime = styled.div`
  padding-top: 9px;
  display: flex;
  justify-content: space-between;

  p {
    color: var(--gray-400);
    font-size: 0.625rem;
    font-weight: 400;
  }
`;

const Controls = styled.div`
  height: 187px;
  padding: 38px 34px 30px 34px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PlayBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  i::before {
    color: var(--dark-blue-800);
  }

  .play-btn {
    padding-left: 5px;
  }

  .i-play {
    font-size: 44px;
  }

  .i-back-music {
    font-size: 26px;
  }

  .i-next-play {
    font-size: 26px;
  }
`;

const PlaymodeMenuBox = styled.div<IsLoop & PlayMode>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  i::before {
    color: var(--dark-blue-700);
  }

  .i-loop {
    font-size: 18px;
    &::before {
      color: ${({ isLoop }) => (isLoop ? 'var(--sky-blue-400)' : null)};
    }
  }

  .i-shuffle {
    font-size: 18px;
    &::before {
      color: ${({ playMode }) => (playMode === 'shuffle' ? 'var(--sky-blue-400)' : null)};
    }
  }

  .i-menu {
    font-size: 15px;
  }
`;
