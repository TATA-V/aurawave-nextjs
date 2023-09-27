'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import summer from '@/assets/png-file/summer.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SkeletonNewMusic from './SkeletonNewMusic';

// 임시 데이터
const data = [
  {
    id: 1,
    image: summer,
    title: '몇 번의 여름',
    composer: 'TOIL, Gist',
  },
  {
    id: 2,
    image: summer,
    title: 'Super Shy',
    composer: 'NewJeans',
  },
  {
    id: 3,
    image: summer,
    title: 'Seven',
    composer: '정국',
  },
  {
    id: 4,
    image: summer,
    title: '몇 번의 여름',
    composer: 'TOIL, Gist',
  },
  {
    id: 5,
    image: summer,
    title: 'Super Shy',
    composer: 'NewJeans',
  },
  {
    id: 6,
    image: summer,
    title: 'Seven',
    composer: '정국',
  },
  {
    id: 7,
    image: summer,
    title: '몇 번의 여름',
    composer: 'TOIL, Gist',
  },
  {
    id: 8,
    image: summer,
    title: 'Super Shy',
    composer: 'NewJeans',
  },
  {
    id: 9,
    image: summer,
    title: 'Seven',
    composer: '정국',
  },
  {
    id: 10,
    image: summer,
    title: 'Seven',
    composer: '정국',
  },
];

function NewMusic() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <NewMusicSection>
      <h2 className="section-heading">최신 음악</h2>
      {!loaded && (
        <SkeletonNewMusicBlock>
          {[...Array(4)].map((el, i) => (
            <SkeletonNewMusic key={i} />
          ))}
        </SkeletonNewMusicBlock>
      )}

      {loaded && (
        <StyledSwiper spaceBetween={15} slidesPerView={3.1}>
          {data.map((el) => (
            <SwiperSlide key={el.id}>
              <NewMusicLi num={el.id}>
                <div className="music-content">
                  <Image
                    className="image"
                    width={95}
                    height={95}
                    src={el.image}
                    alt="new music"
                    placeholder="blur"
                  />
                  <div className="details">
                    <p className="title">{el.title}</p>
                    <p className="composer">{el.composer}</p>
                  </div>
                </div>
              </NewMusicLi>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
    </NewMusicSection>
  );
}

export default NewMusic;

interface Num {
  num: number;
}

const SkeletonNewMusicBlock = styled.div`
  padding: 14px 21px 0 21px;
  display: flex;
`;

const NewMusicSection = styled.section`
  padding-bottom: 45px;

  .section-heading {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
    padding-left: 21px;
  }
`;

const StyledSwiper = styled(Swiper)`
  padding: 14px 21px 0 21px;
`;

const NewMusicLi = styled.li<Num>`
  .music-content {
    width: 95px;
    height: 133px;
  }

  .image {
    width: 95px;
    height: 95px;
    border: 1px solid var(--gray-100);
    border-radius: 4px;
    object-fit: 'cover';
    cursor: pointer;
  }

  .details {
    height: 32px;
    padding-top: 9px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.625rem;
    font-weight: 500;
    cursor: pointer;
  }

  .composer {
    color: var(--gray-400);
    font-size: 0.4375rem;
    font-weight: 400;
    cursor: pointer;
  }
`;
