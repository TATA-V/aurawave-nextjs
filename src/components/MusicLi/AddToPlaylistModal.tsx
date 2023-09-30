'use clinet';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

/**
 * 상위에서 쓰이고 있는 useState
 * const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
 */

// 임시 데이터
const data = [
  {
    id: 1,
    playlistTitle: '여행가서 들으면 좋은 노래 모음',
  },
  {
    id: 2,
    playlistTitle: '새벽 감성 노래 모음',
  },
  {
    id: 3,
    playlistTitle: '꽃향기를 닮은 음악',
  },
  {
    id: 4,
    playlistTitle: '주인장이 좋아하는 감성 힙합',
  },
  {
    id: 5,
    playlistTitle: '우주를 여행하는 기분',
  },
];

interface Props {
  showAddToPlaylistModal: boolean;
  setShowAddToPlaylistModal: (value: boolean) => void;
}
function AddToPlaylistModal({ showAddToPlaylistModal, setShowAddToPlaylistModal }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달창 밖에 눌렀을 시 모달창 닫힘
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        showAddToPlaylistModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setShowAddToPlaylistModal(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showAddToPlaylistModal, setShowAddToPlaylistModal]);

  return (
    <Container>
      <AddToPlaylistModalBlock ref={modalRef}>
        <ModalTitle>
          <p>내 플레이리스트에 추가</p>
        </ModalTitle>

        <AddToPlaylistUl>
          {data.map((el) => (
            <AddToPlaylistLi key={el.id} num={el.id}>
              <div className="playlist-box">
                <i className="i-plus-music-circle" />
                <p className="playlist-title">{el.playlistTitle}</p>
              </div>
            </AddToPlaylistLi>
          ))}
        </AddToPlaylistUl>
        <AddNewPlaylist>
          <i className="i-plus-circle" />
          <p className="add-new-playlist">새 플레이리스트 추가</p>
        </AddNewPlaylist>
      </AddToPlaylistModalBlock>
    </Container>
  );
}

export default AddToPlaylistModal;

interface Num {
  num: number;
}

const Container = styled.div`
  position: absolute;
  top: 23px;
  right: 0;
  width: 130px;
  padding-bottom: 65px;
  z-index: 1;
`;

const AddToPlaylistModalBlock = styled.div`
  padding-left: 5px;
  border: 1px solid var(--gray-100);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(16, 29, 33, 0.05);
  background-color: var(--white-100);
`;

const ModalTitle = styled.div`
  width: 120px;
  height: 38px;
  border-bottom: 1px solid var(--gray-50);
  margin-right: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: var(--dark-blue-800);
    font-size: 0.65rem;
    font-weight: 500;
    padding-top: 1px;
    user-select: none;
  }
`;

const AddToPlaylistUl = styled.ul`
  max-height: 140px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: #ccc;
  }

  &::-webkit-scrollbar-track {
    border-radius: 20px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    bottom: 10px;
  }
`;

const AddToPlaylistLi = styled.li<Num>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ num }) => (num === 1 ? '2px' : '0')};

  .playlist-box {
    width: 110px;
    height: 35px;
    padding: 0 2px 0 2px;
    border-bottom: 1px solid var(--gray-50);
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  .i-plus-music-circle {
    color: var(--dark-blue-700);
    font-size: 14.5px;
  }

  .playlist-title {
    color: var(--dark-blue-700);
    font-size: 0.3375rem;
    font-weight: 400;
    line-height: 0.75rem;
    padding-left: 4px;
  }
`;

const AddNewPlaylist = styled.div`
  width: 100%;
  height: 35px;
  padding-right: 5px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  .i-plus-circle {
    color: var(--gray-300);
    font-size: 5px;
  }

  .add-new-playlist {
    color: var(--gray-300);
    font-size: 0.375rem;
    font-weight: 400;
    padding-left: 4px;
  }
`;
