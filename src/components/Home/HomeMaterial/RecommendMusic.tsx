'use client';
import MusicLi from '@/components/MusicLi/MusicLi';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import summer from '@/assets/png-file/summer.png';
import LoadingLottie from '@/components/Lottie/LoadingLottie';
import Link from 'next/link';
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
];

const nextData = [
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
];

function RecommendMusic() {
  const endRef = useRef(null);
  const { loading, musicData } = useInfiniteScroll({ data, nextData, endRef }); // hook

  return (
    <RecommendMusicSection>
      <TopBox>
        <h2 className="section-heading">추천 음악</h2>
        <Link href={'/music-collection'} className="view-all-btn">
          전체보기
        </Link>
      </TopBox>

      <ul>
        {/* 음악 => MusicLi 컴포넌트 */}
        {musicData.map((el) => (
          <MusicLi key={el.id} image={el.image} title={el.title} composer={el.composer} />
        ))}
      </ul>

      {loading && <LoadingLottie />}
      <End ref={endRef} />
    </RecommendMusicSection>
  );
}

export default RecommendMusic;

const RecommendMusicSection = styled.section`
  padding: 0 0 50px 21px;
`;

const TopBox = styled.div`
  padding-bottom: 14px;
  display: flex;
  justify-content: space-between;

  .section-heading {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
  }

  .view-all-btn {
    color: var(--gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    padding-right: 18px;
  }
`;
