'use client';
import React from 'react';
import styled from 'styled-components';
import * as S from '@/styled/musicLiStyled';
import Image from 'next/image';
import { MusicData } from '@/types/musicTypes';
import useMusicPlay from '@/hook/useMusicPlay';
import { useRecoilState } from 'recoil';
import playlistDataState from '@/atom/playlistDataState';

interface Props {
  el: MusicData;
}
function CreatePlaylistMusicLi({ el }: Props) {
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { musicList } = playlistData;
  const { imageUri, title, composer } = el;
  const musicPlay = useMusicPlay(); // hook

  const handleMusicPlay = () => {
    musicPlay(el);
  };

  // 플레이리스트에 음악을 추가
  const handleRemove = () => {
    const removeMusic = musicList.filter((music) => music.uuid !== el.uuid);
    setPlaylistData((prev) => ({ ...prev, musicList: removeMusic }));
  };

  return (
    <S.MusicLiBlock>
      <div className="music-content">
        <div className="details-box">
          <Image
            onClick={handleMusicPlay}
            className="image"
            width={49}
            height={49}
            src={imageUri}
            alt="recommended music"
          />
          <p className="details">
            <span onClick={handleMusicPlay} className="title">
              {title}
            </span>
            <br />
            <span onClick={handleMusicPlay} className="composer">
              {composer}
            </span>
          </p>
        </div>

        {/* 플레이리스트에서 해당 음악 삭제 */}
        <DeleteBtn onClick={handleRemove}>
          <i className="i-trash" />
        </DeleteBtn>
      </div>
    </S.MusicLiBlock>
  );
}

export default CreatePlaylistMusicLi;

const DeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  .i-trash {
    font-size: 13.89px;
  }
`;
