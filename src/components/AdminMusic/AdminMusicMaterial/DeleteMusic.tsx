'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as S from '@/styled/authStyled';
import { deleteMudicDoc } from '@/firebase/music';
import { storage } from '@/firebase/config';
import { deleteObject, ref } from 'firebase/storage';

function DeleteMusic() {
  const [uuid, setUuid] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // firebase에 있는 음악 정보 삭제
    await deleteMudicDoc({ uuid: uuid });
    // storage에 있는 앨범 이미지 삭제
    const musicRef = ref(storage, `music_image/${uuid}`);
    await deleteObject(musicRef);
    // storage에 있는 음악 삭제
    const mp3Ref = ref(storage, `music_audio/${uuid}`);
    await deleteObject(mp3Ref);
    setUuid('');
  };

  return (
    <>
      <H3>음악 삭제</H3>
      <form onSubmit={handleSubmit}>
        <S.InputBox>
          <input
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
            type="text"
            placeholder="음악 uuid 입력"
            autoComplete="off"
            required
          />
        </S.InputBox>
        <S.SubmitBtn>음악 삭제</S.SubmitBtn>
      </form>
    </>
  );
}

export default DeleteMusic;

const H3 = styled.h3`
  color: var(--dark-blue-900);
  font-size: 1.5rem;
  font-weight: 600;
  padding: 28px 0 30px 0;
`;
