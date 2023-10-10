'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import { bubblegum } from '@/fonts/fonts';
import createPlaylistState from '@/atom/createPlaylistState';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { setAWPlaylistDoc } from '@/firebase/playlist';
import uploadImage from '@/firebase/image';
import formatDateToYYYYMMDD from '@/utils/formatDateToYYYYMMDD';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  title: string;
}

function PlaylistGoBackHead({ title }: Props) {
  const [isAurawaveTxt, setIsAurawaveTxt] = useState(false);
  const [rightTxt, setRightTxt] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [createPlaylist, setCreatePlaylist] = useRecoilState(createPlaylistState); // 리코일
  const { uuid, playlistImageUri, playlistTitle, description, musicList } = createPlaylist;
  const resetCreatePlaylistState = useResetRecoilState(createPlaylistState); // 리코일
  const formattedDate = formatDateToYYYYMMDD(); // 현재 날짜
  const router = useRouter();
  const pathname = usePathname();

  // 오른쪽 글자
  useEffect(() => {
    if (pathname === '/admin-awplaylist') {
      setRightTxt('저장');
    }
    if (pathname === '/admin-awplaylist/add-music') {
      setRightTxt('닫기');
    }
  }, [pathname]);

  useEffect(() => {
    if (title === '플레이리스트 등록') {
      setIsAurawaveTxt(true);
    }
  }, [title]);

  // 저장 버튼 눌리면 동작
  useEffect(() => {
    const isValid =
      uuid !== '' &&
      imageUri !== '' &&
      playlistTitle.trim() !== '' &&
      description.trim() !== '' &&
      musicList.length !== 0;
    // firestore에 저장
    if (isValid) {
      const awplaylistData = {
        uuid: uuid,
        playlistImageUri: imageUri,
        playlistTitle: playlistTitle,
        description: description,
        musicList: musicList,
      };
      setAWPlaylistDoc({ uuid, awplaylistData });
      resetCreatePlaylistState();
      const id = uuidv4(); // uuid 생성
      setCreatePlaylist((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
    }
  }, [
    router,
    uuid,
    description,
    imageUri,
    musicList,
    playlistTitle,
    formattedDate,
    setCreatePlaylist,
    resetCreatePlaylistState,
  ]);

  // 뒤로가기
  const handleGoBack = () => {
    router.back();
    if (pathname === '/admin-awplaylist') {
      resetCreatePlaylistState();
      const id = uuidv4(); // uuid 생성
      setCreatePlaylist((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
    }
  };

  // 오른쪽 버튼 클릭 시
  const handleRightBtnClick = () => {
    if (rightTxt === '저장') {
      // File 형식의 이미지에서 URI를 추출
      if (playlistImageUri instanceof File) {
        const props = {
          file: playlistImageUri,
          setState: setImageUri,
          path: 'aw_playlist_image',
          uuid,
        };
        uploadImage(props);
      }
    }

    if (rightTxt === '닫기') {
      router.back();
    }
  };

  return (
    <GoBackHeadBlok>
      <div onClick={handleGoBack} role="button" className="back-btn">
        {title !== '재생목록' && <i className="i-back" />}
      </div>

      {title && !isAurawaveTxt && <Title>{title}</Title>}
      {title && isAurawaveTxt && (
        <Title>
          <span className={`aw-txt ${bubblegum.className}`}>{isAurawaveTxt && 'AW'}</span> {title}
        </Title>
      )}

      <RightBox>
        <button onClick={handleRightBtnClick} className="right-btn">
          {rightTxt}
        </button>
      </RightBox>
    </GoBackHeadBlok>
  );
}

export default PlaylistGoBackHead;

const GoBackHeadBlok = styled.header`
  position: fixed;
  top: 0;
  width: 390px;
  height: 61px;
  background-color: var(--white-100);
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .back-btn {
    width: 63px;
    height: 61px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .i-back {
    font-size: 18;

    &::before {
      color: var(--dark-blue-900);
    }
  }
`;

const Title = styled.p`
  color: var(--dark-blue-900);
  font-size: 1.09375rem;
  font-weight: 600;

  .aw-txt {
    font-size: 1.1875rem;
    font-weight: 400;
  }
`;

const RightBox = styled.div`
  width: 63px;
  height: 61px;
  display: flex;
  justify-content: center;
  align-items: center;

  .right-btn {
    color: var(--sky-blue-400);
    font-size: 1rem;
    font-weight: 400;
  }
`;
