'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { MusicData } from '@/types/musicTypes';
import { useRecoilState } from 'recoil';
import playlistDataState from '@/atom/playlistDataState';
import useMusicPlay from '@/hook/useMusicPlay';

interface Props {
  el: MusicData;
}
function AddMusicMusicLi({ el }: Props) {
  const [isInPlaylist, setIsInPlaylist] = useState(false);
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { musicList } = playlistData;
  const { imageUri, title, composer } = el;
  const musicPlay = useMusicPlay(); // hook

  useEffect(() => {
    const inPlaylist = musicList.some((music) => music.uuid === el.uuid);
    setIsInPlaylist(inPlaylist);
  }, [musicList, el.uuid]);

  const handleMusicPlay = (el: MusicData) => {
    musicPlay(el);
  };

  const handleAddMusic = () => {
    if (isInPlaylist) {
      // 플레이리스트에서 음악을 삭제
      const removeMusic = musicList.filter((music) => music.uuid !== el.uuid);
      setPlaylistData((prev) => ({ ...prev, musicList: removeMusic }));
    } else {
      // 플레이리스트에 음악을 추가
      setPlaylistData((prev) => ({ ...prev, musicList: [...prev.musicList, el] }));
    }
    setIsInPlaylist(!isInPlaylist);
  };

  return (
    <MusicLiBlock>
      <div className="music-content">
        <div className="details-box">
          <Image
            onClick={() => handleMusicPlay(el)}
            className="image"
            width={49}
            height={49}
            src={imageUri}
            alt="recommended music"
          />
          <p className="details">
            <span onClick={() => handleMusicPlay(el)} className="title">
              {title}
            </span>
            <br />
            <span onClick={() => handleMusicPlay(el)} className="composer">
              {composer}
            </span>
          </p>
        </div>

        {/* 플레이리스트에서 해당 음악 삭제 */}
        <DeleteBtn onClick={handleAddMusic} $isInPlaylist={isInPlaylist}>
          <i className="i-music-plus" />
        </DeleteBtn>
      </div>
    </MusicLiBlock>
  );
}

export default AddMusicMusicLi;

interface IsInPlaylist {
  $isInPlaylist: boolean;
}

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

const DeleteBtn = styled.button<IsInPlaylist>`
  display: flex;
  justify-content: center;
  align-items: center;

  .i-music-plus {
    font-size: 20px;

    &::before {
      color: ${({ $isInPlaylist }) =>
        $isInPlaylist ? 'var(--fl-blue-500)' : 'var(--sky-blue-300)'};
    }
  }
`;
