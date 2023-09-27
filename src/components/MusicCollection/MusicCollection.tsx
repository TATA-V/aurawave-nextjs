'use client';
import React, { useRef } from 'react';
import styled from 'styled-components';
import * as S from '@/styled/searchStyled';
import summer from '@/assets/png-file/summer.png';

import GoBackHead from '../GoBackHead/GoBackHead';
import MusicLi from '../MusicLi/MusicLi';
import LoadingLottie from '../Lottie/LoadingLottie';
import { End } from '@/styled/endStyled';
import useInfiniteScroll from '@/hook/useInfiniteScroll';

// 임시 데이터
const data = [
  {
    id: 1,
    image: summer,
    title: '거리에서 (Feat. ASH ISLAND)',
    composer: '릴러말즈 (Leellamarz)',
  },
  {
    id: 2,
    image: summer,
    title: 'Love Me Again',
    composer: 'V',
  },
  {
    id: 3,
    image: summer,
    title: '후라이의 꿈',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 4,
    image: summer,
    title: 'Bubble',
    composer: 'STAYC(스테이씨)',
  },
  {
    id: 5,
    image: summer,
    title: `그대만 있다면 (여름날 우리 X
      너드커넥션 (Nerd Connection)`,
    composer: '너드커넥션(Nerd Connection)',
  },
  {
    id: 6,
    image: summer,
    title: 'Kidding',
    composer: '이세계아이돌',
  },
  {
    id: 7,
    image: summer,
    title: '달빛에 그려지는',
    composer: '미연((여자)아이들)',
  },
  {
    id: 8,
    image: summer,
    title: 'Love Lee',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 9,
    image: summer,
    title: '거리에서 (Feat. ASH ISLAND)',
    composer: '릴러말즈 (Leellamarz)',
  },
  {
    id: 10,
    image: summer,
    title: 'Love Me Again',
    composer: 'V',
  },
  {
    id: 11,
    image: summer,
    title: '후라이의 꿈',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 12,
    image: summer,
    title: 'Bubble',
    composer: 'STAYC(스테이씨)',
  },
  {
    id: 13,
    image: summer,
    title: `그대만 있다면 (여름날 우리 X
      너드커넥션 (Nerd Connection)`,
    composer: '너드커넥션(Nerd Connection)',
  },
  {
    id: 14,
    image: summer,
    title: 'Kidding',
    composer: '이세계아이돌',
  },
  {
    id: 15,
    image: summer,
    title: '달빛에 그려지는',
    composer: '미연((여자)아이들)',
  },
  {
    id: 16,
    image: summer,
    title: 'Love Lee',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 17,
    image: summer,
    title: '거리에서 (Feat. ASH ISLAND)',
    composer: '릴러말즈 (Leellamarz)',
  },
  {
    id: 18,
    image: summer,
    title: 'Love Me Again',
    composer: 'V',
  },
  {
    id: 19,
    image: summer,
    title: '후라이의 꿈',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 20,
    image: summer,
    title: 'Bubble',
    composer: 'STAYC(스테이씨)',
  },
  {
    id: 21,
    image: summer,
    title: `그대만 있다면 (여름날 우리 X
      너드커넥션 (Nerd Connection)`,
    composer: '너드커넥션(Nerd Connection)',
  },
  {
    id: 22,
    image: summer,
    title: 'Love Me Again',
    composer: 'V',
  },
  {
    id: 23,
    image: summer,
    title: '후라이의 꿈',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 24,
    image: summer,
    title: 'Bubble',
    composer: 'STAYC(스테이씨)',
  },
  {
    id: 25,
    image: summer,
    title: `그대만 있다면 (여름날 우리 X
      너드커넥션 (Nerd Connection)`,
    composer: '너드커넥션(Nerd Connection)',
  },
  {
    id: 26,
    image: summer,
    title: 'Kidding',
    composer: '이세계아이돌',
  },
  {
    id: 27,
    image: summer,
    title: '달빛에 그려지는',
    composer: '미연((여자)아이들)',
  },
  {
    id: 28,
    image: summer,
    title: 'Love Lee',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 29,
    image: summer,
    title: '달빛에 그려지는',
    composer: '미연((여자)아이들)',
  },
  {
    id: 30,
    image: summer,
    title: 'Love Lee',
    composer: 'AKMU(악뮤)',
  },
];

const nextData = [
  {
    id: 31,
    image: summer,
    title: '거리에서 (Feat. ASH ISLAND)',
    composer: '릴러말즈 (Leellamarz)',
  },
  {
    id: 32,
    image: summer,
    title: 'Love Me Again',
    composer: 'V',
  },
  {
    id: 33,
    image: summer,
    title: '후라이의 꿈',
    composer: 'AKMU(악뮤)',
  },
  {
    id: 34,
    image: summer,
    title: 'Bubble',
    composer: 'STAYC(스테이씨)',
  },
  {
    id: 35,
    image: summer,
    title: `그대만 있다면 (여름날 우리 X
      너드커넥션 (Nerd Connection)`,
    composer: '너드커넥션(Nerd Connection)',
  },
  {
    id: 36,
    image: summer,
    title: 'Kidding',
    composer: '이세계아이돌',
  },
  {
    id: 37,
    image: summer,
    title: '달빛에 그려지는',
    composer: '미연((여자)아이들)',
  },
  {
    id: 38,
    image: summer,
    title: 'Love Lee',
    composer: 'AKMU(악뮤)',
  },
];

function MusicCollection() {
  const endRef = useRef(null);
  const { loading, musicData } = useInfiniteScroll({ data, nextData, endRef }); // hook

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
            <MusicLi key={el.id} image={el.image} title={el.title} composer={el.composer} />
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
