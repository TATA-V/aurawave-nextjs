import { atom } from 'recoil';

interface CurrentMusic {
  uuid: string;
  imageUri: string;
  musicUri: string;
  title: string;
  composer: string;
  copyright: string;
}

export interface CurrentTrackState {
  isShow: boolean;
  isPlaying: boolean;
  currentMusic: CurrentMusic;
  currentTrack: CurrentMusic[];
}

const DefaultValue: CurrentTrackState = {
  isShow: false,
  isPlaying: false,
  currentMusic: {
    uuid: '',
    imageUri: '',
    musicUri: '',
    title: '',
    composer: '',
    copyright: '',
  },
  currentTrack: [],
};

const currentTrackState = atom<CurrentTrackState>({
  key: 'currentTrackState',
  default: DefaultValue,
});

export default currentTrackState;
