'use client';
import currentTrackState from '@/atom/currentTrackState';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import MusicPauseSvg from '@/../public/musicPauseSvg.svg';
import formatTime from '@/utils/formatTime';
import updateProgressBarOnInteraction from '@/utils/updateProgressBarOnInteraction';

function AudioControlBar() {
  const [play, setPlay] = useState(false);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeWidth, setCurrentTimeWidth] = useState(0);
  const [hasBottomTab, setHasBottomTab] = useState(true);

  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { isPlaying, currentMusic, currentTrack } = currentMusicAndTrack;
  const { imageUri, musicUri, title, composer } = currentMusic;
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const hasBottomTabPage =
      pathname === '/' || pathname === '/music' || pathname === '/chat' || pathname === '/profile';

    // BottomTab 컴포넌트가 있으면
    if (hasBottomTabPage) {
      setHasBottomTab(true);
    } else {
      setHasBottomTab(false);
    }
  }, [pathname]);

  // 음악 재생
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      setPlay(true);
      audio.src = musicUri;
      audio.play();
    }
  }, [isPlaying, musicUri]);

  // 현재 재생 중인 음악을 멈추거나 다시 재생
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (audio && play) {
      audio.pause();
    } else if (audio && !play) {
      audio.play();
    }
    setPlay(!play);
  };

  // ProgressBar width
  const handleUpdateTime = () => {
    const audio = audioRef.current;
    if (audio) {
      const width = (audio.currentTime / audio.duration) * 100;
      setProgressBarWidth(width);
    }
  };

  // ProgressBar를 클릭하면 클릭한 위치에서 음악을 재생(onClick)
  // ProgressBar위에 마우스 올리면 해당 위치의 음악 시간 표시(onMouseMove)
  const handleProgressBarClickAndHover = (e: React.MouseEvent<HTMLDivElement>, type: string) => {
    updateProgressBarOnInteraction({
      e,
      type,
      audioRef,
      setProgressBarWidth,
      setCurrentTime,
      setCurrentTimeWidth,
    });
  };

  return (
    <>
      <StyledAudio ref={audioRef} onTimeUpdate={handleUpdateTime} controls>
        <source src={musicUri} type="audio/mpeg" />
      </StyledAudio>

      <AudioControlBarBlock hasBottomTab={hasBottomTab}>
        <ProgressBarBox currentTimeWidth={currentTimeWidth}>
          <ProgressBar
            onMouseMove={(e) => handleProgressBarClickAndHover(e, 'hover')}
            onClick={(e) => handleProgressBarClickAndHover(e, 'click')}
            progressBarWidth={progressBarWidth}
          />
          <div className="hover-time">
            <p>{formatTime(currentTime)}</p>
          </div>
        </ProgressBarBox>

        <MusicPlayer>
          {/* 현재 재생되고 있는 음악 정보 */}
          <LeftBox>
            <Image className="image" width={36} height={36} src={imageUri} alt="album image" />
            <div className="details">
              <p className="title">{title}</p>
              <p className="composer">{composer}</p>
            </div>
          </LeftBox>

          {/* 음악 컨트롤 */}
          <RightBox>
            <button onClick={handleTogglePlay}>
              {play ? (
                <div className="pause-box">
                  <MusicPauseSvg width={19} height={21} fill={'white'} />
                </div>
              ) : (
                <i className="i-play" />
              )}
            </button>
            <button className="next-play-btn">
              <i className="i-next-play" />
            </button>
            <button className="menu-btn">
              <i className="i-menu" />
            </button>
          </RightBox>
        </MusicPlayer>
      </AudioControlBarBlock>
    </>
  );
}

export default AudioControlBar;

interface HasBottomTab {
  hasBottomTab: boolean;
}

interface ProgressBarWidth {
  progressBarWidth: number;
}

interface CurrentTimeWidth {
  currentTimeWidth: number;
}

const fadeInUp = keyframes`
  from {
    opacity: 0.8;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const StyledAudio = styled.audio`
  display: none;
`;

const AudioControlBarBlock = styled.div<HasBottomTab>`
  animation: ${fadeInUp} 0.2s ease-out;
  width: 390px;
  height: ${({ hasBottomTab }) => (hasBottomTab ? '60px' : '71px')};
  border-radius: 10px 10px 0 0;
  background: linear-gradient(to right, #648b8b, #e38989);
  overflow: hidden;
  position: fixed;
  bottom: ${({ hasBottomTab }) => (hasBottomTab ? '50px' : '0')};
  z-index: 1;
`;

const ProgressBarBox = styled.div<CurrentTimeWidth>`
  display: flex;
  justify-content: center;
  position: relative;
  width: 390px;

  .hover-time {
    width: 42px;
    height: 22px;
    color: var(--white-100);
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 2px;
    background-color: #648b8b;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0;
    position: absolute;
    top: 8px;
    left: ${({ currentTimeWidth }) => currentTimeWidth - 12}%;
    transition: opacity 0.1s ease;
    z-index: 1;
  }

  &:hover .hover-time {
    opacity: 100;
  }
`;

const ProgressBar = styled.div<ProgressBarWidth>`
  width: 100%;
  height: 2px;
  background-color: var(--gray-70);
  position: relative;
  cursor: pointer;

  &:hover::before,
  &:hover::after {
    height: 5px;
    transition: height 0.25s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    height: 2px;
    z-index: 1;
    width: ${({ progressBarWidth }) => progressBarWidth}%;
    transition: width 0.1s ease;
    background-color: var(--dark-green-700);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    height: 2px;
    width: 100%;
    z-index: 1;
    background-color: var(--gray-70);
  }
`;

const MusicPlayer = styled.div`
  padding: 10px 16px 12px 16px;
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;

  .image {
    border-radius: 2px;
  }

  .details {
    padding-left: 13px;
    height: 33px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .title {
    color: var(--white-100);
    font-size: 0.9375rem;
    font-weight: 400;
    white-space: nowrap;
  }

  .composer {
    color: var(--blue-gray-400);
    font-size: 0.8125rem;
    font-weight: 400;
  }
`;

const RightBox = styled.div`
  width: 101px;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .pause-box {
    padding-top: 1px;
  }

  &::after {
    content: '';
    position: absolute;
    right: 116px;
    height: 58px;
    width: 17px;
    background: linear-gradient(to right, transparent, #bf8a8a);
  }
  &::before {
    content: '';
    position: absolute;
    right: 101px;
    height: 58px;
    width: 17px;
    background-color: #bd8a8a;
  }

  .i-play {
    font-size: 21px;
  }

  .i-next-play {
    font-size: 18px;
  }

  .i-menu {
    font-size: 13px;
  }

  .menu-btn {
    padding-top: 1.8px;
  }

  .next-play-btn {
    padding-top: 1%.8;
  }
`;
