'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import playlistDefaultJpg from '@/assets/jpg-file/playlist-default.jpg';
import playlistDataState from '@/atom/playlistDataState';
import * as S from '@/styled/playlistEditorStyled';
import { useRecoilState } from 'recoil';
import { auth } from '@/firebase/config';

function PlaylistImage() {
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { playlistImageUri } = playlistData;
  const imageRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const user = auth.currentUser;
    if (user && files && files.length > 0) {
      const file = files[0];
      setPlaylistData((prev) => ({ ...prev, playlistImageUri: file }));
    }
  };

  return (
    <S.PlaylistImageBlock>
      <div className="image-box">
        <Image
          className="image"
          width={186}
          height={158}
          src={
            playlistImageUri instanceof File
              ? URL.createObjectURL(playlistImageUri)
              : playlistDefaultJpg
          }
          alt="playlist image"
        />
        <button onClick={() => imageRef.current?.click()} className="camera-btn">
          <i className="i-camera" />
        </button>
        <input onChange={handleImage} ref={imageRef} type="file" accept="image/jpeg, image/png" />
      </div>
    </S.PlaylistImageBlock>
  );
}

export default PlaylistImage;
