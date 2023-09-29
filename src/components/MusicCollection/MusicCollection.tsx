'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as S from '@/styled/searchStyled';
import { End } from '@/styled/endStyled';
import useInfiniteScroll from '@/hook/useInfiniteScroll';
import { getAllMusicDocs } from '@/firebase/music';
import { MusicData } from '@/types/musicTypes';

import GoBackHead from '../GoBackHead/GoBackHead';
import MusicLi from '../MusicLi/MusicLi';
import LoadingLottie from '../Lottie/LoadingLottie';

function MusicCollection() {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* 뒤로가기 => GoBackHead 컴포넌트 */}
      <GoBackHead title="음악 컬렉션" />

      {/* 검색창 */}
      <MusicCollectionBlock>
        <S.SearchBox>
          <input className="search-input" type="text" placeholder="원하는 곡을 검색해 보세요" />
          <i className="i-search" />
          <S.Bar className="bar" />
        </S.SearchBox>

        {/* 모든 음악 */}
        <MusicUl>
          {data.map((el) => (
            <MusicLi key={el.uuid} image={el.imageUri} title={el.title} composer={el.composer} />
          ))}
        </MusicUl>
      </MusicCollectionBlock>
      {loading && <LoadingLottie />}
      <End ref={endRef} />
    </>
  );
}

export default MusicCollection;

const MusicCollectionBlock = styled.div`
  padding-top: 61px;
`;

const MusicUl = styled.ul`
  padding-left: 21px;
`;