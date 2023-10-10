'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import userState from '@/atom/userState';
import * as S from '@/styled/CreatePlaylist';
import createPlaylistState from '@/atom/createPlaylistState';

import PlaylistGoBackHead from '../GoBackHead/PlaylistGoBackHead';
import PlaylistImage from './CreatePlaylistMaterial/PlaylistImage';
import CreatePlaylistMusicLi from './CreatePlaylistMaterial/CreatePlaylistMusicLi';

function CreatePlaylist() {
  const [createPlaylist, setCreatePlaylist] = useRecoilState(createPlaylistState); // 리코일
  const { playlistTitle, description, musicList } = createPlaylist;
  const { isAdmin } = useRecoilValue(userState); // 리코일
  const router = useRouter();
  const pathname = usePathname();
  const adminPlaylist = pathname === '/admin-awplaylist';

  useEffect(() => {
    if (adminPlaylist) {
      if (!isAdmin) {
        router.replace('/');
      }
    }
  }, [adminPlaylist, isAdmin, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreatePlaylist((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <>
        <PlaylistGoBackHead title={adminPlaylist ? '플레이리스트 등록' : '새 플레이리스트 추가'} />

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
            <button onClick={() => setCreatePlaylist((prev) => ({ ...prev, playlistTitle: '' }))}>
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
            <button onClick={() => setCreatePlaylist((prev) => ({ ...prev, description: '' }))}>
              <i className="i-delete-thin margin-top" />
            </button>
          </S.InputBox>

          {/* 새로운 곡  추가 */}
          <S.AddNewMusic>
            <S.StyledLink href={`${pathname}/add-music`}>
              <div className="plus-icon">
                <i className="i-plus-small" />
              </div>
            </S.StyledLink>
            <S.StyledLink className="add-music" href={`${pathname}/add-music`}>
              <p>새로운 곡 추가</p>
            </S.StyledLink>
          </S.AddNewMusic>

          {/* 플레이리스트에 추가된 곡 */}
          <ul>
            {musicList.map((el) => (
              <CreatePlaylistMusicLi key={el.uuid} el={el} />
            ))}
          </ul>
        </CreatePlaylistBlock>
      </>
    </>
  );
}

export default CreatePlaylist;

const CreatePlaylistBlock = styled.div`
  padding: 61px 21px 0 21px;
`;
