'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlayBlue from '@/../public/PlayBlueSvg.svg';
import Image from 'next/image';
import love from '@/assets/jpg-file/love.jpg';
import gloomy from '@/assets/jpg-file/gloomy.jpg';
import refresh from '@/assets/jpg-file/refresh.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SkeletonPlaylist from './SkeletonPlaylist';

// 임시 데이터
const data = [
  {
    id: 1,
    image: love,
    title: '듣자마자 반하는',
    subtitle: '좋은 노래는 3초 만에 알잖아🎧',
  },
  {
    id: 2,
    image: gloomy,
    title: '내겐 너무 다정한 우울',
    subtitle: '난 우울할 때 이 노랠 들어😶‍🌫️',
  },
  {
    id: 3,
    image: refresh,
    title: '상큼함 치사량',
    subtitle: '답답한 하루에 상큼함을🍋',
  },
];

function RecommendPlaylist() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <PlaylistSection>
      <h2 className="section-heading">추천 플레이리스트</h2>
      {/* 스켈레톤 => SkeletonPlaylist 컴포넌트 */}
      {!loaded && (
        <SkeletonPlaylistBlock>
          <SkeletonPlaylist />
          <SkeletonPlaylist />
        </SkeletonPlaylistBlock>
      )}

      {loaded && (
        <StyledSwiper spaceBetween={22} slidesPerView={1.7}>
          {data.map((el) => (
            <SwiperSlide key={el.id}>
              <PlaylistItem className="playlist-li" num={el.id}>
                <div className="playlist-content">
                  <Image
                    className="image"
                    width={186}
                    height={158}
                    src={el.image}
                    alt="recommended playlist"
                    placeholder="blur"
                  />
                  <div className="details">
                    <div className="des">
                      <p className="title">{el.title}</p>
                      <p className="subtitle">{el.subtitle}</p>
                    </div>
                    <PlayBlue className="paly-blue" />
                  </div>
                </div>
              </PlaylistItem>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
    </PlaylistSection>
  );
}

export default RecommendPlaylist;

interface Num {
  num: number;
}

const SkeletonPlaylistBlock = styled.div`
  width: 439px;
  padding-left: 21px;
  display: flex;
  justify-content: space-between;
`;

const PlaylistSection = styled.section`
  padding: 50px 0 45px 0;

  .section-heading {
    color: var(--dark-blue-900);
    font-size: 1.1875rem;
    font-weight: 500;
    padding-left: 21px;
  }
`;

const StyledSwiper = styled(Swiper)`
  margin-top: 14px;
  padding: 0 21px 0 21px;
  height: 259px;
`;

const PlaylistItem = styled.div<Num>`
  .playlist-content {
    width: 200px;
    height: 243px;
    border: 1px solid var(--gray-100);
    border-radius: 18px;
    padding: 7px 7px 0 7px;
    box-shadow: 0 2px 8px rgba(16, 29, 33, 0.1);
    background-color: var(--white-100);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .details {
    width: 168px;
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 16px 0 16px;
  }

  .image {
    border-radius: 15px;
    cursor: pointer;
  }

  .des {
    width: 152px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }

  .subtitle {
    color: var(--dark-blue-800);
    font-size: 0.625rem;
    font-weight: 400;
    cursor: pointer;
  }

  .paly-blue {
    cursor: pointer;
    transform: translate(3px, 1px);
  }
`;
