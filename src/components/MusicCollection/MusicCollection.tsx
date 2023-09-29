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
  const [sliceNum, setSliceNum] = useState(30);
  const endRef = useRef(null);
  const { loading, musicData } = useInfiniteScroll({
    allData,
    data: allData.slice(0, 30), // 처음 데이터 지정
    sliceNum,
    setSliceNum,
    endRef,
  }); // hook

  useEffect(() => {
    // 모든 데이터 가져오기
    getAllMusicDocs()
      .then((data) => {
        setAllData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(musicData);

  // // 무한스크롤
  // useEffect(() => {
  //   if (!endRef.current || loading) return;
  //   const callback = (entries: IntersectionObserverEntry[]) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         if (sliceNum < allData.length) {
  //           setLoading(true);
  //           setTimeout(() => {
  //             // 그 다음 데이터 8개
  //             const nextData = allData.slice(sliceNum, sliceNum + 8);
  //             setData((prev) => [...prev, ...nextData]);
  //             setSliceNum((num) => num + 8);
  //             setLoading(false);
  //           }, 1000);
  //         }
  //       }
  //     });
  //   };
  //   const options = { root: null, rootMargin: '0px', threshold: 0.1 };
  //   const observer = new IntersectionObserver(callback, options);
  //   observer.observe(endRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [allData, sliceNum, loading, data]);

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
          {musicData.map((el) => (
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
