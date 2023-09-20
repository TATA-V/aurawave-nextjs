'use client';
import styled from 'styled-components';
import Link from 'next/link';

export const AuthBlock = styled.div`
  padding: 0 24px 0 24px;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const AuthTextBox = styled.div`
  height: 78px;
  margin-bottom: 37px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .auth-text {
    color: var(--dark-blue-900);
    font-size: 2.1875rem;
    font-weight: 600;
  }

  .hi-text {
    color: var(--blue-gray-700);
    font-size: 0.875rem;
    font-weight: 400;
  }
`;

export const InputBox = styled.div`
  input {
    height: 46px;
    width: 100%;
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 400;
    border: 1px solid var(--gray-100);
    border-radius: 6px;
    padding-left: 16px;

    &:focus {
      outline: 5px solid #e4eff0;
      border: 1px solid #6ec4ce;
    }

    &::placeholder {
      color: var(--gray-250);
    }
  }

  .margin-top {
    margin-top: 8px;
  }
`;

export const SubmitBtn = styled.button`
  height: 53px;
  color: var(--white-100);
  font-size: 0.96875rem;
  margin-top: 12px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(16, 29, 33, 0.1);
  background: linear-gradient(to left, #7ec5ed, #5fc0c0);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  color: var(--dark-blue-650);
  font-size: 0.75rem;
  font-weight: 500;
  padding-top: 25px;
  text-decoration: none;
`;

export const GoogleBox = styled.div`
  margin-top: 97px;
`;

export const GrayLineTxtBox = styled.div`
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .gray-line {
    height: 1px;
    width: 103px;
    background-color: var(--gray-100);
  }

  .sns-txt {
    color: var(--blue-gray-700);
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
