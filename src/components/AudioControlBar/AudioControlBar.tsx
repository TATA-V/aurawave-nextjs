'use client';
import currentTrackState, { CurrentMusic } from '@/atom/currentTrackState';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from '@/styled/audioControlStyled';
import Image from 'next/image';
import MusicPauseSvg from '@/../public/musicPauseSvg.svg';
import formatTime from '@/utils/formatTime';
import updateProgressBarWidth from '@/utils/updateProgressBarWidth';

import PlayModeModal from './PlayModeModal';
import MusicDetailModal from '../MusicDetailModal/MusicDetailModal';

function AudioControlBar() {
  // 음악 총 시간, 현재 시간
  const [totalDuration, setTotalDuration] = useState(0); // 총 시간
  const [currentDuration, setCurrentDuration] = useState(0); // 현재 시간
  // 음악 progressBar
  const [progressBarWidth, setProgressBarWidth] = useState(0); // 음악 재생 중인 상태에서 progressBar의 가로 길이
  const [currentTime, setCurrentTime] = useState(0); // progressBar 위에 마우스가 올릴 때 해당 음악의 시간
  const [currentTimeWidth, setCurrentTimeWidth] = useState(0); // progressBar 위에 마우스가 올릴 때 해당 음악의 가로 길이
  const [isMouseMoveActive, setIsMouseMoveActive] = useState(false); // progressBar 위에 마우스가 있는지
  // BottomTab 컴포넌트 유무
  const [hasBottomTab, setHasBottomTab] = useState(true);
  // 옵션(Loop, Shuffle) 모달
  const [playModeModal, setPlayModeModal] = useState(false);

  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const {
    isPlaying,
    isShow,
    isLoop,
    playMode,
    showMusicDetail,
    currentMusic,
    currentTrack,
    suffleTrack,
  } = currentMusicAndTrack;
  const { uuid, imageUri, musicUri, title, composer } = currentMusic; // 현재 재생 중인 음악
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 음악 재생 상태 변경 시 총 시간 업데이트
      audio.addEventListener('durationchange', () => {
        setTotalDuration(audio.duration);
      });
      // 음악 재생 상태 변경 시 현재 시간 업데이트
      audio.addEventListener('timeupdate', () => {
        setCurrentDuration(audio.currentTime);
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener('durationchange', () => {
          setTotalDuration(audio.duration);
        });
        audio.removeEventListener('timeupdate', () => {
          setCurrentDuration(audio.currentTime);
        });
      }
    };
  }, []);

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
    if (audio && isShow) {
      if (isPlaying) {
        if (audio.src !== musicUri) {
          audio.src = musicUri;
        }
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isShow, isPlaying, musicUri]);

  // 현재 재생 중인 음악을 멈추거나 다시 재생
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.pause();
    } else if (audio && !isPlaying) {
      audio.play();
    }
    setCurrentMusicAndTrack((prev) => ({ ...prev, isPlaying: !isPlaying }));
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
  const handleProgressBar = (e: React.MouseEvent<HTMLDivElement>, type: string) => {
    updateProgressBarWidth({
      e,
      type,
      audioRef,
      setProgressBarWidth,
      setCurrentTime,
      setCurrentTimeWidth,
    });
  };

  // 현재 재생중인 음악 정보 업데이트
  const updateCurrentMusic = (music: CurrentMusic) => {
    setCurrentMusicAndTrack((prev) => ({
      ...prev,
      currentMusic: {
        uuid: music.uuid,
        imageUri: music.imageUri,
        musicUri: music.musicUri,
        title: music.title,
        composer: music.composer,
        copyright: music.copyright,
      },
    }));
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = music.musicUri;
      audio.play();
    }
  };

  // 이전, 다음 음악 재생
  const handlePrevNextMusic = (type = 'next') => {
    const musicTrack = playMode === 'shuffle' ? suffleTrack : currentTrack;

    const currentIndex = musicTrack.findIndex((track) => track.uuid === uuid);
    const isFirstMusic = currentIndex === 0;
    const isLastMusic = currentIndex === musicTrack.length - 1;

    // 무한 재생 아닐 때
    if (!isLoop) {
      if ((type === 'prev' && isFirstMusic) || (type === 'next' && isLastMusic)) return;
      const music = type === 'next' ? musicTrack[currentIndex + 1] : musicTrack[currentIndex - 1];
      updateCurrentMusic(music);
    }

    // 무한 재생일 때
    if (isLoop) {
      if (type === 'next') {
        const music = isLastMusic ? musicTrack[0] : musicTrack[currentIndex + 1];
        updateCurrentMusic(music);
      } else if (type === 'prev') {
        const music = isFirstMusic
          ? musicTrack[musicTrack.length - 1]
          : musicTrack[currentIndex - 1];
        updateCurrentMusic(music);
      }
    }
  };

  const handleshowMusicDetail = () => {
    setCurrentMusicAndTrack((prev) => ({ ...prev, showMusicDetail: true }));
  };

  const musicDetailProps = {
    // play, // 음악 재생 유무
    totalDuration, // 총 음악 시간
    currentDuration, // 현재 음악 시간
    handleTogglePlay, // 현재 재생 중인 음악을 멈추거나 다시 재생
    handlePrevNextMusic, // 이전, 다음 음악 재생
    progressBarWidth, // 음악 재생 중인 상태에서 progressBar의 가로 길이
    handleProgressBar, // progressBar 클릭한 위치에서 음악 재생(onClick), ProgressBar위에 마우스 올리면 해당 위치의 음악 시간 표시(onMouseMove)
    setIsMouseMoveActive, // progressBar 위에 마우스가 있는지 수정
    isMouseMoveActive, // progressBar 위에 마우스가 있는지
    currentTimeWidth, // progressBar 위에 마우스가 올릴 때 해당 음악의 가로 길이
    currentTime, // progressBar 위에 마우스가 올릴 때 해당 음악의 시간
  };

  return (
    <>
      {/* 음악 디테일 => MusicDetailModal 컴포넌트 */}
      {showMusicDetail && <MusicDetailModal {...musicDetailProps} />}

      <S.StyledAudio
        ref={audioRef}
        onEnded={() => handlePrevNextMusic()}
        onTimeUpdate={handleUpdateTime}
        controls
      >
        <source src={musicUri} type="audio/mpeg" />
      </S.StyledAudio>

      <S.AudioControlBarBlock $hasBottomTab={hasBottomTab}>
        <S.ProgressBarAndTime $currentTimeWidth={currentTimeWidth}>
          <S.ProgressBarBox $currentTimeWidth={currentTimeWidth}>
            <S.ProgressBar
              onMouseMove={(e) => {
                handleProgressBar(e, 'hover');
                setIsMouseMoveActive(true);
              }}
              onMouseLeave={() => setIsMouseMoveActive(false)}
              onClick={(e) => handleProgressBar(e, 'click')}
              $progressBarWidth={progressBarWidth}
            />
          </S.ProgressBarBox>
          {isMouseMoveActive && (
            <div className="hover-time">
              <p>{formatTime(currentTime)}</p>
            </div>
          )}
        </S.ProgressBarAndTime>

        {/* 현재 페이지에 BottomTab 컴포넌트가 없다면 */}
        {!hasBottomTab && (
          <S.SimpleMusicPlayer>
            <Image
              onClick={handleshowMusicDetail}
              className="image"
              width={38}
              height={38}
              src={imageUri}
              alt="album image"
            />
            <S.Controls>
              <button>
                <i onClick={() => handlePrevNextMusic('prev')} className="i-back-music" />
              </button>
              <button onClick={handleTogglePlay}>
                {isPlaying ? (
                  <MusicPauseSvg width={26} height={28} fill={'white'} />
                ) : (
                  <i className="i-play" />
                )}
              </button>
              <button onClick={() => handlePrevNextMusic()}>
                <i className="i-next-play" />
              </button>
            </S.Controls>

            <S.Option>
              <button onClick={() => setPlayModeModal(!playModeModal)}>
                <i className="i-setting" />
              </button>

              {/* 재생 모드 모달 => PlayModeModal 컴포넌트 */}
              {playModeModal && (
                <PlayModeModal playModeModal={playModeModal} setPlayModeModal={setPlayModeModal} />
              )}
            </S.Option>
          </S.SimpleMusicPlayer>
        )}

        {/* 현재 페이지에 BottomTab 컴포넌트가 있다면 */}
        {hasBottomTab && (
          <S.BottomTabMusicPlayer>
            {/* 현재 재생되고 있는 음악 정보 */}
            <S.LeftBox>
              <Image
                onClick={handleshowMusicDetail}
                className="image"
                width={36}
                height={36}
                src={imageUri}
                alt="album image"
              />
              <div className="details">
                <p onClick={handleshowMusicDetail} className="title">
                  {title}
                </p>
                <p onClick={handleshowMusicDetail} className="composer">
                  {composer}
                </p>
              </div>
            </S.LeftBox>

            {/* 음악 컨트롤 */}
            <S.RightBox>
              <button onClick={handleTogglePlay}>
                {isPlaying ? (
                  <MusicPauseSvg width={19} height={21} fill={'white'} />
                ) : (
                  <i className="i-play" />
                )}
              </button>
              <button onClick={() => handlePrevNextMusic()}>
                <i className="i-next-play" />
              </button>
              <S.StyledLink href={'/soundtrack'}>
                <i className="i-menu" />
              </S.StyledLink>
            </S.RightBox>
          </S.BottomTabMusicPlayer>
        )}
      </S.AudioControlBarBlock>
    </>
  );
}

export default AudioControlBar;
