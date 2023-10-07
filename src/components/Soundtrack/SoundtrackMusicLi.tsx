'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import MoreSvg from '@/../public/more.svg';
import { MusicData } from '@/types/musicTypes';
import useMusicPlay from '@/hook/useMusicPlay';

import AddToPlaylistModal from '../MusicLi/AddToPlaylistModal';

interface Props {
  el: MusicData;
  idx: number;
  handleDragStart: (idx: number) => void;
  handelDragEnter: (idx: number) => void;
  handleDragEnd: () => void;
}
function SoundtrackMusicLi({ el, idx, handleDragStart, handelDragEnter, handleDragEnd }: Props) {
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const { imageUri, title, composer } = el;
  const musicPlay = useMusicPlay(); // hook

  const handleMusicPlay = (el: MusicData) => {
    musicPlay(el);
  };

  return (
    <MusicLiBlock
      draggable
      onDragStart={() => handleDragStart(idx)}
      onDragEnter={() => handelDragEnter(idx)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
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

        {/* 더보기 */}
        <MoreBox>
          <button onClick={() => setShowAddToPlaylistModal(true)}>
            <MoreSvg width={19} height={4} fill={'#62686A'} />
          </button>
          {/* 플레이리스트에 음악 추가하는 모달 => AddToPlaylistModal 컴포넌트 */}
          {showAddToPlaylistModal && (
            <AddToPlaylistModal
              el={el}
              showAddToPlaylistModal={showAddToPlaylistModal}
              setShowAddToPlaylistModal={setShowAddToPlaylistModal}
            />
          )}
        </MoreBox>
      </div>
    </MusicLiBlock>
  );
}

export default SoundtrackMusicLi;

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

const MoreBox = styled.div`
  position: relative;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
