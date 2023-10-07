import useAuthentication from '@/hook/useAuthentication';
import React from 'react';
import styled from 'styled-components';
import AudioControlBar from '../AudioControlBar/AudioControlBar';
import { useRecoilValue } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';
// import MusicDetailModal from '../Modal/MusicDetailModal';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const { isShow } = useRecoilValue(currentTrackState);

  useAuthentication();

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
