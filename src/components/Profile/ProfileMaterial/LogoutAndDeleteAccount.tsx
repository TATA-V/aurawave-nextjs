'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import userState from '../../../atom/userState';
import Image from 'next/image';
import crayonPng from '../../../assets/png-file/crayon-line.png';
import { auth } from '../../../firebase/config';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

import CustomModal from '@/components/CustomModal/CustomModal';

function LogoutAndDeleteAccount() {
  const [toggleModal, setToggleModal] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useRecoilValue(userState); // 리코일

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.log('로그아웃 실패:', error);
      alert('로그아웃 도중에 문제가 발생했습니다.');
    }
  };

  return (
    <LogoutAndDeleteAccountBlock>
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-box">
          <i className="i-logout-circle" />
          <p className="logout-txt">로그아웃</p>
        </button>
      )}
      <Image className="crayon-img" src={crayonPng} alt="crayon line" />

      {isLoggedIn && (
        <button onClick={() => setToggleModal(true)} className="delete-box">
          <span className="delete-txt">탈퇴하기</span>
        </button>
      )}

      {/* 탈퇴하기 모달 => CustomModal 컴포넌트 */}
      {toggleModal && (
        <CustomModal toggleModal={toggleModal} setToggleModal={setToggleModal} type="탈퇴" />
      )}
    </LogoutAndDeleteAccountBlock>
  );
}

export default LogoutAndDeleteAccount;

const LogoutAndDeleteAccountBlock = styled.div`
  padding-top: 15px;

  .logout-box {
    padding: 0 25px 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .i-logout-circle {
    color: var(--blue-gray-750);
    font-size: 12.54px;
  }

  .logout-txt {
    color: var(--blue-gray-750);
    padding: 1.24px 0 0 5.46px;
    font-size: 0.6875rem;
    display: flex;
    align-items: center;
  }

  .crayon-img {
    height: 228px;
    padding-top: 12px;
  }

  .delete-box {
    width: 100%;
    padding: 0 25px 10px 25px;
    display: flex;
    justify-content: end;
  }

  .delete-txt {
    color: var(--blue-gray-700);
    font-size: 0.6875rem;
    transform: translateY(-22px);
  }
`;
