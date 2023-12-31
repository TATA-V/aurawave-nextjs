'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential } from 'firebase/auth';
import { auth, storage } from '@/firebase/config';
import { deleteUserDoc } from '@/firebase/user';
import { deleteObject, ref } from 'firebase/storage';
import { useResetRecoilState } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';
import useCloseModal from '@/hook/useCloseModal';

interface Props {
  toggleModal: boolean;
  setToggleModal: (value: boolean) => void;
  type: string;
}

function CustomModal({ toggleModal, setToggleModal, type }: Props) {
  const [loading, setLoading] = useState(false);
  const [deleteTxt, setDeleteTxt] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const resetCurrentMusicAndTrack = useResetRecoilState(currentTrackState); // 리코일
  const pwdRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = auth.currentUser; // 현재 유저

  // 모달창 영역 밖을 클릭하면 모달창 닫힘
  useCloseModal({ modalRef, state: toggleModal, setState: setToggleModal }); // hook

  useEffect(() => {
    if (type === '탈퇴') {
      pwdRef.current?.focus();
      setMessage('탈퇴하시겠습니까? 탈퇴 후에는 다시 복구할 수 없습니다.');
      setDeleteTxt('탈퇴');
      const googleSignIn = user?.providerData[0].providerId === 'google.com'; // 현재 로그인 된 계정이 구글인지 확인
      if (googleSignIn) {
        setIsGoogleSignIn(true);
      }
    }

    if (type === '플레이리스트삭제') {
      setMessage('이 플레이리스트를\n삭제하시겠습니까? 삭제 후에는\n다시 복구할 수 없습니다.');
      setDeleteTxt('삭제');
    }

    if (type === '플레이리스트에서한곡삭제') {
      setMessage('선택한 1곡을 플레이리스트에서 삭제하시겠습니까?');
      setDeleteTxt('삭제');
    }
  }, [type, user?.providerData]);

  const handleWithdrawal = async () => {
    /* 유저 탈퇴 */
    if (type === '탈퇴') {
      try {
        if (user && user.email) {
          setLoading(true);
          // 만약 현재 로그인 된 계정이 구글 계정이라면
          if (isGoogleSignIn) {
            await deleteUser(user);
            setToggleModal(false);
          } else {
            // 만약 현재 로그인 된 계정이 일반 이메일 계정이라면
            const { email } = user;
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(user, credential);
            await deleteUser(user);
            setToggleModal(false);
          }
          // firestore에서 유저 정보 삭제
          await deleteUserDoc(user.uid);
          // storage에서 유저 이미지 삭제
          const storageRef = ref(storage, `user_image/${user.uid}`);
          await deleteObject(storageRef);
        }
        router.push('/login');
        setLoading(false);
        resetCurrentMusicAndTrack();
      } catch (error) {
        console.log('회원 탈퇴 실패:', error);
        setLoading(false);
      }
    }

    /* 플레이리스트 삭제 */
    if (type === '플레이리스트삭제') {
    }

    /* 플레이리스트에서 한 곡 삭제 */
    if (type === '플레이리스트에서한곡삭제') {
    }
  };

  return (
    <ModalBlock>
      <Modal ref={modalRef}>
        <div className="modal-content">
          <p className="modal-text">{message}</p>
        </div>

        {type === '탈퇴' && !isGoogleSignIn && (
          <input
            ref={pwdRef}
            className="pwd-input"
            type="password"
            placeholder="계정 비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <div className="btn-box">
          <button className="btn cancel" onClick={() => setToggleModal(false)}>
            취소
          </button>
          <button disabled={loading} onClick={handleWithdrawal} className="btn delete">
            {deleteTxt}
          </button>
        </div>
      </Modal>
    </ModalBlock>
  );
}

export default CustomModal;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(70px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  width: 390px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 3;
`;

const Modal = styled.div`
  animation: ${fadeInUp} 0.33s ease-out;
  width: 315px;
  padding: 6px;
  border-radius: 6px;
  background-color: var(--white-100);

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .modal-content {
    width: 223px;
    padding-top: 36px;
    line-height: 1.5rem;
  }

  .modal-text {
    color: var(--dark-blue-900);
    font-size: 1.0625rem;
    text-align: center;
    white-space: pre-line;
  }

  .pwd-input {
    width: 239px;
    height: 46px;
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 400;
    border: 1px solid var(--gray-100);
    border-radius: 6px;
    padding-left: 16px;
    margin-top: 15px;

    &::placeholder {
      color: var(--gray-250);
    }
    &:focus {
      outline: 5px solid #e4eff0;
      border: 1px solid #6ec4ce;
    }
  }

  .btn-box {
    width: 100%;
    padding-top: 11px;
    display: flex;
    justify-content: space-between;
  }

  .btn {
    width: 146px;
    height: 67px;
    font-size: 1.0625rem;
    font-weight: 500;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    &:hover {
      background-color: var(--gray-30);
    }
  }

  .cancel {
    color: var(--blue-gray-700);
    &:hover {
      color: var(--blue-gray-800);
    }
  }

  .delete {
    color: var(--pink-500);
    &:hover {
      color: var(--red-600);
    }
  }
`;
