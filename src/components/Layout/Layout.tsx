import useAuthentication from '@/hook/useAuthentication';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  useAuthentication();

  return (
    <LayoutBlock>
      <LayoutStyle>{children}</LayoutStyle>
    </LayoutBlock>
  );
}

export default Layout;

const LayoutBlock = styled.div`
  min-height: 100vh;
  background-color: rgb(233, 236, 239);
  font-family: 'Noto Sans KR', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutStyle = styled.div`
  width: 390px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
