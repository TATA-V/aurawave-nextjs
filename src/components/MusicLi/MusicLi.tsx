'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import MoreSvg from '@/../public/more.svg';

import AddToPlaylistModal from './AddToPlaylistModal';
import { MusicData } from '@/types/musicTypes';
import useMusicPlay from '@/hook/useMusicPlay';

interface Props {
  el: MusicData;
  hideRightBtn?: boolean;
}

function MusicLi({ el, hideRightBtn }: Props) {
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const { imageUri, title, composer } = el;
  const musicPlay = useMusicPlay(); // hook

  const handleMusicPlay = (el: MusicData) => {
    musicPlay(el);
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

        {/* 더보기 */}
        {!hideRightBtn && (
          <MoreBox>
            <button onClick={() => setShowAddToPlaylistModal(true)}>
              <MoreSvg />
            </button>
            {/* 플레이리스트에 음악 추가하는 모달 => AddToPlaylistModal 컴포넌트 */}
            {showAddToPlaylistModal && (
              <AddToPlaylistModal
                showAddToPlaylistModal={showAddToPlaylistModal}
                setShowAddToPlaylistModal={setShowAddToPlaylistModal}
              />
            )}
          </MoreBox>
        )}
      </div>
    </MusicLiBlock>
  );
}

export default MusicLi;

const MusicLiBlock = styled.li`
  padding-bottom: 17px;

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
`;
