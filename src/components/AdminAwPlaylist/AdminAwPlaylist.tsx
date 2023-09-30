'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import userState from '@/atom/userState';

import GoBackHead from '../GoBackHead/GoBackHead';

function AdminAwPlaylist() {
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
          <GoBackHead title="플레이리스트 등록 & 삭제" />
        </>
      )}
    </>
  );
}

export default AdminAwPlaylist;
