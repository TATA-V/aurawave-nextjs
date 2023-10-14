'use client';
import React from 'react';
import styled from 'styled-components';
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
    <MusicLiBlock>
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
    </MusicLiBlock>
  );
}

export default CreatePlaylistMusicLi;

const MusicLiBlock = styled.li`
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

const DeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  .i-trash {
    font-size: 13.89px;
  }
`;
