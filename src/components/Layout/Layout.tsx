import React from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <LayoutBlock>
      <RecoilRoot>
        <LayoutStyle>{children}</LayoutStyle>
      </RecoilRoot>
    </LayoutBlock>
  );
}

export default Layout;

const LayoutBlock = styled.div`
  min-height: 100vh;
  background-color: rgb(233, 236, 239);

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
