'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import playlistDataState from '@/atom/playlistDataState';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { setUserPlaylistDoc } from '@/firebase/playlist';
import uploadImage from '@/firebase/image';
import formatDateToYYYYMMDD from '@/utils/formatDateToYYYYMMDD';
import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp } from 'firebase/firestore';
import compressImage from '@/utils/compressImage';
import { updateUserPlaylists } from '@/firebase/user';
import { auth } from '@/firebase/config';

function PlaylistGoBackHead() {
  const [rightTxt, setRightTxt] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { isPublic, uuid, playlistImageUri, playlistTitle, description, musicList } = playlistData;
  const resetPlaylistDataState = useResetRecoilState(playlistDataState); // 리코일
  const formattedDate = formatDateToYYYYMMDD(); // 현재 날짜
  const router = useRouter();
  const pathname = usePathname();
  const user = auth.currentUser;

  // 오른쪽 글자
  useEffect(() => {
    if (pathname === '/playlist-editor') {
      setRightTxt('저장');
    } else {
      setRightTxt('닫기');
    }
  }, [pathname]);

  // 저장 버튼 눌리면 동작
  useEffect(() => {
    const isValid =
      uuid !== '' &&
      imageUri !== '' &&
      playlistTitle.trim() !== '' &&
      description.trim() !== '' &&
      musicList.length !== 0;

    if (isValid) {
      const playlistData = {
        uuid: uuid,
        isPublic: isPublic,
        playlistImageUri: imageUri,
        playlistTitle: playlistTitle,
        description: description,
        musicList: musicList,
      };
      // firestore에 저장
      if (user) {
        setUserPlaylistDoc({ uuid, playlistData }); // user_playlist에 플레이리스트 등록
        updateUserPlaylists({ uuid: user.uid, playlistData }); // 유저 정보에 등록한 플레이리스트 추가
        resetPlaylistDataState();
        const id = uuidv4(); // uuid 생성
        setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
      }
    }
  }, [
    router,
    uuid,
    user,
    isPublic,
    description,
    imageUri,
    musicList,
    playlistTitle,
    formattedDate,
    setPlaylistData,
    resetPlaylistDataState,
  ]);

  // 뒤로가기
  const handleGoBack = () => {
    router.back();
    if (pathname === '/playlist-editor') {
      resetPlaylistDataState();
      const id = uuidv4(); // uuid 생성
      setPlaylistData((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
    }
  };

  // 오른쪽 버튼 클릭 시
  const handleRightBtnClick = async () => {
    if (rightTxt === '저장') {
      // File 형식의 이미지에서 URI를 추출
      if (playlistImageUri instanceof File) {
        const compressFile = await compressImage(playlistImageUri); // 이미지 압축
        const props = {
          file: compressFile,
          setState: setImageUri,
          path: 'user_playlist_image',
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
        <i className="i-back" />
      </div>

      <Title>새 플레이리스트 추가</Title>

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
