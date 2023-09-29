import { MusicData } from '@/types/musicTypes';
import React, { SetStateAction, useEffect, useState } from 'react';

interface Props {
  allData: MusicData[];
  data: MusicData[];
  sliceNum: number;
  setSliceNum: React.Dispatch<SetStateAction<number>>;
  endRef: React.MutableRefObject<null>;
}

const useInfiniteScroll = ({ allData, data, sliceNum, setSliceNum, endRef }: Props) => {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState(data);

  useEffect(() => {
    setMusicData(data);
  }, [data]);

  // 무한스크롤
  useEffect(() => {
    if (!endRef.current || loading) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (sliceNum < allData.length) {
            setLoading(true);
            setTimeout(() => {
              // 그 다음 데이터 8개
              const nextData = allData.slice(sliceNum, sliceNum + 8);
              setMusicData((prev) => [...prev, ...nextData]);
              setSliceNum((num) => num + 8);
              setLoading(false);
            }, 1000);
          }
        }
      });
    };

    const options = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(endRef.current);

    return () => {
      observer.disconnect();
    };
  }, [allData, sliceNum, loading, data, endRef, setSliceNum]);

  return { loading, musicData };
};

export default useInfiniteScroll;
