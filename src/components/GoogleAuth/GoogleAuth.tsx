'use client';
import React from 'react';
import styled from 'styled-components';
import GoogleSvg from '../../../public/GoogleSvg.svg';

function GoogleAuth() {
  return (
    <GoogleAuthBlock>
      <GoogleBtn>
        <GoogleSvg />
        <p className="signin-txt">Sign in with Google</p>
      </GoogleBtn>
    </GoogleAuthBlock>
  );
}

export default GoogleAuth;

const GoogleAuthBlock = styled.div`
  padding-top: 22.5px;
  display: flex;
  justify-content: center;
`;

const GoogleBtn = styled.button`
  width: 170px;
  height: 43px;
  padding: 0 15px 0 15px;
  border: 1px solid var(--gray-100);
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .signin-txt {
    color: var(--dark-blue-650);
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
