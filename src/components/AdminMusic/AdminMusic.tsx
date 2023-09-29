'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import userState from '@/atom/userState';

import GoBackHead from '../GoBackHead/GoBackHead';
import AddMusic from './AdminMusicMaterial/AddMusic';
import DeleteMusic from './AdminMusicMaterial/DeleteMusic';
import ChangeMusicImg from './AdminMusicMaterial/ChangeMusicImg';

function AdminMusic() {
  const { isAdmin } = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, router]);

  return (
    <>
      {isAdmin && (
        <>
          {/* 뒤로가기 => GoBackHead 컴포넌트 */}
          <GoBackHead title="음악 등록 & 삭제" />

          <AdminMusicBlock>
            {/* 음악 추가 => AddMusic 컴포넌트 */}
            <AddMusic />
            <Hr />
            {/* 음악 삭제 => DeleteMusic 컴포넌트 */}
            <DeleteMusic />
            <Hr />
            {/* 음악 이미지 수정 => ChangeMusicImg 컴포넌트 */}
            <ChangeMusicImg />
          </AdminMusicBlock>
        </>
      )}
    </>
  );
}

export default AdminMusic;

const AdminMusicBlock = styled.div`
  padding: 61px 24px 100px 24px;
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 2px dashed var(--gray-100);
  padding-top: 15px;
`;
