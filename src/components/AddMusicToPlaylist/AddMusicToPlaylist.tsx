'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as S from '@/styled/searchStyled';
import PlaylistGoBackHead from '../GoBackHead/PlaylistGoBackHead';
import AddMusicAWMusicLi from './AddMusicMusicLi';
import { getAllMusicDocs } from '@/firebase/music';
import { MusicData } from '@/types/musicTypes';
import useInfiniteScroll from '@/hook/useInfiniteScroll';

import LoadingLottie from '../Lottie/LoadingLottie';
import SkeletonMusicLi30 from '../Skeleton/SkeletonMusicLi30';

function AddMusicToPlaylist() {
  const [loaded, setLoded] = useState(false);
  // search 음악
  const [searchText, setSearchText] = useState('');
  const [findSearchData, setFindSearchData] = useState<MusicData[]>([]);
  // all 음악
  const [allData, setAllData] = useState<MusicData[]>([]);
  const [data, setData] = useState<MusicData[]>([]);
  const [sliceNum, setSliceNum] = useState(30);
  const endRef = useRef(null);
  const { loading } = useInfiniteScroll({
    allData,
    data,
    setData,
    sliceNum,
    setSliceNum,
    endRef,
  }); // hook

  useEffect(() => {
    // 모든 데이터 가져오기
    getAllMusicDocs()
      .then((data) => {
        setAllData(data);
        const initialData = data.slice(0, 30); // 처음 데이터 지정
        setData(initialData);
        setLoded(true);
      })
      .catch((error) => {
        console.log(error);
        setLoded(false);
      });
  }, []);

  // 검색
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(e.target.value, 'gi');
    const searchResult = allData.reduce((acc, music) => {
      if ((music.title && music.title.match(regex)) || music.composer.match(regex)) {
        acc.push(music);
      }
      return acc;
    }, [] as MusicData[]);
    setFindSearchData(searchResult);
    setSearchText(e.target.value);
  };

  return (
    <>
      <PlaylistGoBackHead />

      <AddMusicPlaylistblock>
        {/* 검색창 */}
        <S.SearchBox>
          <input
            onChange={handleSearch}
            className="search-input"
            type="text"
            placeholder="원하는 곡을 검색해 보세요"
          />
          <i className="i-search" />
          <S.Bar className="bar" />
        </S.SearchBox>
        {/* 스켈레톤 => SkeletonMusicCollection 컴포넌트 */}
        {!loaded && <SkeletonMusicLi30 />}

        {/* 모든 음악들 */}
        <MusicUl>
          {(searchText.trim() !== '' ? findSearchData : data).map((el) => (
            <AddMusicAWMusicLi key={el.uuid} el={el} />
          ))}
        </MusicUl>
        {loading && <LoadingLottie />}
      </AddMusicPlaylistblock>
    </>
  );
}

export default AddMusicToPlaylist;

const AddMusicPlaylistblock = styled.div`
  padding-top: 61px;
`;

const MusicUl = styled.ul`
  padding: 0 21px 0 21px;
`;
