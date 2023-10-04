import { useRecoilState } from 'recoil';
import currentTrackState from '@/atom/currentTrackState';
import { MusicData } from '@/types/musicTypes';

const useMusicPlay = () => {
  const [currentMusicAndTrack, setCurrentMusicAndTrack] = useRecoilState(currentTrackState); // 리코일
  const { playMode, currentTrack, suffleTrack } = currentMusicAndTrack;
  const musicTrack = playMode === 'shuffle' ? suffleTrack : currentTrack;
  const musicTrackTxt = playMode === 'shuffle' ? 'suffleTrack' : 'currentTrack';

  const musicPlay = (el: MusicData) => {
    const isUuidInCurrentTrack = musicTrack.some((track) => track.uuid === el.uuid);

    setCurrentMusicAndTrack((prev) => ({
      ...prev,
      isShow: true,
      currentMusic: {
        uuid: el.uuid,
        imageUri: el.imageUri,
        musicUri: el.musicUri,
        title: el.title,
        composer: el.composer,
        copyright: el.copyright,
      },
    }));

    // musicTrack배열에 현재 클릭한 음악이 없다면
    if (!isUuidInCurrentTrack) {
      setCurrentMusicAndTrack((prev) => ({
        ...prev,
        [musicTrackTxt]: [
          ...prev[musicTrackTxt],
          {
            uuid: el.uuid,
            imageUri: el.imageUri,
            musicUri: el.musicUri,
            title: el.title,
            composer: el.composer,
            copyright: el.copyright,
          },
        ],
      }));
    }
  };

  return musicPlay;
};

export default useMusicPlay;
