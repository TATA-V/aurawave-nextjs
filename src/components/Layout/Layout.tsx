'use client';
import useAuthentication from '@/hook/useAuthentication';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AudioControlBar from '../AudioControlBar/AudioControlBar';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';
import { v4 as uuidv4 } from 'uuid';
import formatDateToYYYYMMDD from '@/utils/formatDateToYYYYMMDD';
import createPlaylistState from '@/atom/createPlaylistState';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const { isShow } = useRecoilValue(currentTrackState);
  const setCreatePlaylist = useSetRecoilState(createPlaylistState);

  useAuthentication();

  useEffect(() => {
    const id = uuidv4(); // uuid 생성
    const formattedDate = formatDateToYYYYMMDD(); // 현재 날짜
    setCreatePlaylist((prev) => ({ ...prev, uuid: id, playlistTitle: formattedDate }));
  }, [setCreatePlaylist]);

  return (
    <LayoutBlock>
      <LayoutStyle $isShow={isShow}>
        {children}
        {isShow && <AudioControlBar />}
      </LayoutStyle>
    </LayoutBlock>
  );
}

export default Layout;

interface IsShow {
  $isShow: boolean;
}

const LayoutBlock = styled.div`
  min-height: 100vh;
  background-color: rgb(233, 236, 239);
  font-family: 'Noto Sans KR', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutStyle = styled.div<IsShow>`
  width: 390px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
  padding-bottom: ${({ $isShow }) => ($isShow ? '61px' : '0')};

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
