'use client';
import styled, { keyframes } from 'styled-components';

interface OpenModal {
  openModal: boolean;
}

interface ProgressBarWidth {
  progressBarWidth: number;
}

export const fadeInUp = keyframes`
  from {
    opacity: 0.7;
    transform: translateY(360px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

export const MusicDetailModalBlock = styled.div`
  width: 390px;
  height: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 2;
`;

export const MusicDetailBox = styled.div<OpenModal>`
  width: 390px;
  height: 100%;
  background-color: var(--white-100);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.12);
  animation: ${fadeInUp} 0.25s ease-out;
  transform: ${({ openModal }) => (openModal ? 'translateY(0)' : 'translateY(370px)')};
  opacity: ${({ openModal }) => (openModal ? '1' : '0')};
  transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;

  position: absolute;
  top: 20px;

  .image {
    border: 1px solid var(--gray-100);
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

export const MusicDetail = styled.div`
  min-height: 770px;
  padding: 11px 25px 30px 25px;
`;

export const CloseBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .close-btn {
    padding: 5px 0 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close {
    width: 58px;
    height: 5px;
    border-radius: 8px;
    background-color: var(--blue-gray-300);
  }
`;

export const Composer = styled.div`
  padding-bottom: 28px;

  .composer {
    color: var(--blue-gray-700);
    font-size: 0.875rem;
    font-size: 400;
  }
`;

export const ProgressBarBox = styled.div<ProgressBarWidth>`
  width: 100%;
  height: 5.3px;
  border-radius: 10px;
  background-color: #e5ecee;
  box-shadow: inset 0.5px -1.5px 2px rgba(16, 29, 33, 0.1);
  cursor: pointer;

  .progressbar {
    width: ${({ progressBarWidth }) => (isNaN(progressBarWidth) ? '0%' : `${progressBarWidth}%`)};
    height: 5.3px;
    border-radius: 50px 0 0 50px;
    background: linear-gradient(to top, #2f7381, #7a99a4);
    box-shadow: 2px 2px 3px rgba(16, 29, 33, 0.1);
    position: relative;
    cursor: pointer;
  }

  .circle {
    position: absolute;
    bottom: -4.5px;
    right: -3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-image: linear-gradient(345deg, #255660 0%, #587f86 50%, #8da7b1 100%);
    box-shadow: 2px 1px 3px rgba(16, 29, 33, 0.15);
    cursor: pointer;
  }
`;

export const MusicTime = styled.div`
  padding-top: 9px;
  display: flex;
  justify-content: space-between;

  p {
    color: var(--gray-400);
    font-size: 0.625rem;
    font-weight: 400;
  }
`;

export const Controls = styled.div`
  height: 187px;
  padding: 38px 34px 30px 34px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const PlayBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  i::before {
    color: var(--dark-blue-800);
  }

  .play-btn {
    padding-left: 5px;
  }

  .i-play {
    font-size: 44px;
  }

  .i-back-music {
    font-size: 26px;
  }

  .i-next-play {
    font-size: 26px;
  }
`;
