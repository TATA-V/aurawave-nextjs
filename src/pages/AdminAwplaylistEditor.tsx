'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import userState from '@/atom/userState';
import * as S from '@/styled/playlistEditorStyled';
import playlistDataState from '@/atom/playlistDataState';

import PlaylistImage from '../components/PlaylistEditor/PlaylistImage';
import PlaylistEditorMusicLi from '../components/PlaylistEditor/PlaylistEditorMusicLi';
import AwPlaylistGoBackHead from '../components/GoBackHead/AwPlaylistGoBackHead';

function AdminAwplaylistEditor() {
  const [playlistData, setPlaylistData] = useRecoilState(playlistDataState); // 리코일
  const { playlistTitle, description, musicList } = playlistData;
  const { isAdmin } = useRecoilValue(userState); // 리코일
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlaylistData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <>
        <AwPlaylistGoBackHead />

        <CreatePlaylistBlock>
          {/* 플레이리스트 이미지 => PlaylistImage 컴포넌트 */}
          <PlaylistImage />

          {/* 플레이리스트 제목, 간단한 설명 작성 */}
          <S.InputBox>
            <input
              onChange={handleInputChange}
              className="title"
              type="text"
              value={playlistTitle}
              placeholder="플레이리스트 제목을 적어주세요."
              autoComplete="off"
              name="playlistTitle"
            />
            <button onClick={() => setPlaylistData((prev) => ({ ...prev, playlistTitle: '' }))}>
              <i className="i-delete-thin" />
            </button>
          </S.InputBox>
          <S.InputBox>
            <input
              onChange={handleInputChange}
              className="description margin-top"
              type="text"
              value={description}
              placeholder="플레이리스트 설명을 간략하게 적어주세요."
              autoComplete="off"
              name="description"
            />
            <button onClick={() => setPlaylistData((prev) => ({ ...prev, description: '' }))}>
              <i className="i-delete-thin margin-top" />
            </button>
          </S.InputBox>

          {/* 새로운 곡  추가 */}
          <S.AddNewMusic>
            <S.StyledLink href={'/admin-awplaylist-editor/add-music'}>
              <div className="plus-icon">
                <i className="i-plus-small" />
              </div>
            </S.StyledLink>
            <S.StyledLink className="add-music" href={'/admin-awplaylist-editor/add-music'}>
              <p>새로운 곡 추가</p>
            </S.StyledLink>
          </S.AddNewMusic>

          {/* 플레이리스트에 추가된 곡 */}
          <ul>
            {musicList.map((el) => (
              <PlaylistEditorMusicLi key={el.uuid} el={el} />
            ))}
          </ul>
        </CreatePlaylistBlock>
      </>
    </>
  );
}

export default AdminAwplaylistEditor;

const CreatePlaylistBlock = styled.div`
  padding: 61px 21px 0 21px;
`;
