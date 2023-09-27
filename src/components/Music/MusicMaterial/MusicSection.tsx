'use client';
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import summer from '@/assets/png-file/summer.png';

import 'swiper/css';

import CollectionLi from './CollectionLi';

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
];

function MusicSection() {
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
            {data.map((el) => (
              <CollectionLi key={el.id} image={el.image} title={el.title} composer={el.composer} />
            ))}
          </ul>
        </SwiperSlide>
        <SwiperSlide>
          <ul>
            {data.map((el) => (
              <CollectionLi key={el.id} image={el.image} title={el.title} composer={el.composer} />
            ))}
          </ul>
        </SwiperSlide>
        <SwiperSlide>
          <ul>
            {data.map((el) => (
              <CollectionLi key={el.id} image={el.image} title={el.title} composer={el.composer} />
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
