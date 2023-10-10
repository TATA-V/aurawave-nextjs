'use client';
import styled from 'styled-components';
import Link from 'next/link';

export const InputBox = styled.div`
  position: relative;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 100%;
    height: 50px;
    padding-right: 23px;
    border-bottom: 1px solid var(--dark-blue-500);
    line-height: 50px;
    vertical-align: middle;

    &:focus {
      outline: none;
    }
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 1.09375rem;
    font-weight: 500;
    &::placeholder {
      color: var(--gray-200);
    }
  }

  .i-delete-thin {
    font-size: 16px;
    position: absolute;
    right: 3px;
    top: 17px;
  }

  .margin-top {
    margin-top: 15px;
  }

  .description {
    color: var(--dark-blue-900);
    font-size: 0.8125rem;
    font-weight: 400;

    &::placeholder {
      color: var(--gray-200);
    }
  }
`;

export const AddNewMusic = styled.div`
  padding: 43px 0 60px 0;
  display: flex;
  align-items: center;

  .plus-icon {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    background-color: var(--sky-blue-400);

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.07);
    }
  }

  .i-plus-small {
    font-size: 10px;
  }

  .add-music {
    color: var(--sky-blue-400);
    font-size: 1rem;
    font-weight: 400;
    margin-left: 19px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

// 플레이리스트 이미지
export const PlaylistImageBlock = styled.div`
  padding: 12px 0 24px 0;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  .image {
    border-radius: 15px;
    object-fit: cover;
  }

  .camera-btn {
    width: 35px;
    height: 35px;
    border: 1px solid rgba(78, 89, 97, 0.5);
    border-radius: 50%;
    background-color: rgba(16, 29, 33, 0.5);
    position: absolute;
    right: 90px;
    top: 126px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i-camera {
    font-size: 17.1px;
    transform: translateY(-0.75px);
  }

  input {
    display: none;
  }
`;
