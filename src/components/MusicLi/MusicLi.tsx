'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import MoreSvg from '@/../public/more.svg';

import AddToPlaylistModal from './AddToPlaylistModal';

interface Props {
  image: any;
  title: string;
  composer: string;
}

function MusicLi({ image, title, composer }: Props) {
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);

  return (
    <MusicLiBlock>
      <div className="music-content">
        <div className="details-box">
          <Image
            className="image"
            width={49}
            height={49}
            src={image}
            alt="recommended music"
            placeholder="blur"
          />
          <p className="details">
            <span className="title">{title}</span>
            <br />
            <span className="composer">{composer}</span>
          </p>
        </div>

        {/* 더보기 */}
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
