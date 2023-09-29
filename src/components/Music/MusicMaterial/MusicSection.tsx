'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { getMusicDocs } from '@/firebase/music';
import { MusicData } from '@/types/musicTypes';
import 'swiper/css';

import CollectionLi from './CollectionLi';

function MusicSection() {
  const [data, setData] = useState<MusicData[]>([]);

  useEffect(() => {
    // 최근에 추가한 음악 15개를 가져오기
    getMusicDocs({ limitNum: 15, orderByField: 'timestamp', orderByDirection: 'desc' })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MusicCollectionSection>
      <TopBox>
        <p className="music-collection">음악 컬렉션</p>
        <Link href={'/music-collection'} className="all-txt">
          전체보기
        </Link>
      </TopBox>

      <StyledSwiper slidesPerView={1}>
        <SwiperSlide>
          <ul>
            {data.slice(0, 5).map((el) => (
              <CollectionLi
                key={el.uuid}
                image={el.imageUri}
                title={el.title}
                composer={el.composer}
              />
            ))}
          </ul>
        </SwiperSlide>
        <SwiperSlide>
          <ul>
            {data.slice(5, 10).map((el) => (
              <CollectionLi
                key={el.uuid}
                image={el.imageUri}
                title={el.title}
                composer={el.composer}
              />
            ))}
          </ul>
        </SwiperSlide>
        <SwiperSlide>
          <ul>
            {data.slice(10, 15).map((el) => (
              <CollectionLi
                key={el.uuid}
                image={el.imageUri}
                title={el.title}
                composer={el.composer}
              />
            ))}
          </ul>
        </SwiperSlide>
      </StyledSwiper>
    </MusicCollectionSection>
  );
}

export default MusicSection;

const MusicCollectionSection = styled.section``;

const TopBox = styled.div`
  width: 100%;
  padding: 20px 0 18px 21px;
  display: flex;
  justify-content: space-between;

  .music-collection {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
  }

  .all-txt {
    color: var(--gray-400);
    font-size: 0.875rem;
    font-weight: 500;
    padding-right: 18px;
    text-decoration: none;
  }
`;

const StyledSwiper = styled(Swiper)`
  padding-left: 21px;
  padding-right: 21px;
`;