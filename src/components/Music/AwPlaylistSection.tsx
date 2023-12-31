'use client';
import { getAwPlaylistDocs } from '@/firebase/playlist';
import { bubblegum } from '@/fonts/fonts';
import { AWPlaylistData } from '@/types/playlistTypes';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SkelAwPlaylistSection from '../Skeleton/SkelAwPlaylistSection';

function AwPlaylistSection() {
  const [loaded, setLoaded] = useState(false);
  const [playlistData, setPlaylistData] = useState<AWPlaylistData[]>([]);

  useEffect(() => {
    // AuraWave 플레이리스트 가져오기
    getAwPlaylistDocs({ limitNum: 3, orderByField: 'timestamp', orderByDirection: 'desc' })
      .then((data) => {
        setPlaylistData(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setLoaded(false);
      });
  }, []);

  return (
    <section>
      <TopBox>
        <p className="aw-playlist">
          <span className={`aw ${bubblegum.className}`}>AuraWave</span> 플레이리스트
        </p>
        <Link href={'/aw-playlist'} className="all-txt">
          전체보기
        </Link>
      </TopBox>
      {!loaded && <SkelAwPlaylistSection />}

      {loaded && (
        <StyledSwiper spaceBetween={11} slidesPerView={2}>
          {playlistData.map((el) => (
            <SwiperSlide key={el.uuid}>
              <PlaylistItem>
                <Image
                  className="image"
                  width={168}
                  height={143}
                  src={String(el.playlistImageUri)}
                  alt="aurawave playlist"
                />
                <div className="details">
                  <span className="title">{el.playlistTitle}</span>
                  <span className="description">{el.description}</span>
                </div>
              </PlaylistItem>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
    </section>
  );
}

export default AwPlaylistSection;

const TopBox = styled.div`
  width: 100%;
  padding: 40px 0 18px 21px;
  display: flex;
  justify-content: space-between;

  .aw {
    font-size: 1.1875rem;
    font-weight: 400;
    text-shadow: 0 0 0 var(--dark-blue-900);
  }

  .aw-playlist {
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

const PlaylistItem = styled.div`
  width: 168px;
  height: 188px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .image {
    border: 1px solid var(--gray-100);
    border-radius: 15px;
    object-fit: cover;
  }

  .details {
    height: 33px;
    padding-left: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 500;
  }

  .description {
    height: 12px;
    color: var(--dark-blue-700);
    font-size: 0.6875rem;
    font-weight: 400;
  }
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  padding: 0 21px 0 21px;
`;
