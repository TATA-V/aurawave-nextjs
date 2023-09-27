import React, { useEffect, useState } from 'react';

interface Music {
  id: number;
  image: any;
  title: string;
  composer: string;
}

interface Props {
  data: Music[];
  nextData: Music[];
  endRef: React.MutableRefObject<null>;
}

const useInfiniteScroll = ({ data, nextData, endRef }: Props) => {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState(data);

  useEffect(() => {
    if (!endRef.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoading(true);
          setTimeout(() => {
            setMusicData((prev) => [...prev, ...nextData]);
            setLoading(false);
          }, 1000);
        }
      });
    };

    const options = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(endRef.current);

    return () => {
      observer.disconnect();
    };
  }, [nextData, endRef]);

  return { loading, musicData };
};

export default useInfiniteScroll;
