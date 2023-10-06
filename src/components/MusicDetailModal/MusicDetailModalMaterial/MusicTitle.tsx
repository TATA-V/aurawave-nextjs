import React, { useState } from 'react';
import MoreSvg from '@/../public/more.svg';

import AddToPlaylistModal from '../../MusicLi/AddToPlaylistModal';
import { useRecoilValue } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';
import styled from 'styled-components';

function MusicTitle() {
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const { currentMusic } = useRecoilValue(currentTrackState); // 리코일
  const { title } = currentMusic;

  return (
    <MusicTitleBlock>
      <div className="left" />
      <p className="title">{title}</p>
      <button
        onClick={() => setShowAddToPlaylistModal(!showAddToPlaylistModal)}
        className="more-btn"
      >
        <MoreSvg width={28.12} height={5.62} fill={'#B1B7B9'} />
      </button>
      {showAddToPlaylistModal && (
        <AddToPlaylistModal
          el={currentMusic}
          top="32"
          showAddToPlaylistModal={showAddToPlaylistModal}
          setShowAddToPlaylistModal={setShowAddToPlaylistModal}
        />
      )}
    </MusicTitleBlock>
  );
}

export default MusicTitle;

const MusicTitleBlock = styled.div`
  width: 100%;
  height: 34px;
  margin: 19px 0 18px 0;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    width: 38.12px;
  }

  .more-btn {
    width: 38.12px;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 1rem;
    font-weight: 600;
  }
`;
