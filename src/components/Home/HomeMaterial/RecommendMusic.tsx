'use client';
import MusicLi from '@/components/MusicLi/MusicLi';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LoadingLottie from '@/components/Lottie/LoadingLottie';
import Link from 'next/link';
import { End } from '@/styled/endStyled';
import { MusicData } from '@/types/musicTypes';
import { getAllMusicDocs } from '@/firebase/music';
import useInfiniteScroll from '@/hook/useInfiniteScroll';

function RecommendMusic() {
  const [allRandomData, setAllRandomData] = useState<MusicData[]>([]);
  const [data, setData] = useState<MusicData[]>([]);
  const [sliceNum, setSliceNum] = useState(8);

  const endRef = useRef(null);
  const { loading } = useInfiniteScroll({
    allData: allRandomData,
    data,
    setData,
    sliceNum,
    setSliceNum,
    endRef,
  }); // hook

  // 배열 데이터를 랜덤으로
  const shuffle = (array: MusicData[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // 모든 음악 데이터 가져오기
  useEffect(() => {
    getAllMusicDocs()
      .then((data) => {
        const randomData = shuffle(data); // 배열 데이터를 랜덤으로
        setAllRandomData(randomData);
        const initialData = randomData.slice(0, 8); // 처음 데이터 지정
        setData(initialData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        {data.map((el) => (
          <MusicLi key={el.uuid} image={el.imageUri} title={el.title} composer={el.composer} />
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
