import { atom } from 'recoil';

export interface CurrentMusic {
  uuid: string;
  imageUri: string;
  musicUri: string;
  title: string;
  composer: string;
  copyright: string;
}

export interface CurrentTrackState {
  isShow: boolean;
  isLoop: boolean;
  playMode: string;
  currentMusic: CurrentMusic;
  currentTrack: CurrentMusic[];
  suffleTrack: CurrentMusic[];
}

const DefaultValue: CurrentTrackState = {
  isShow: false,
  isLoop: false,
  playMode: '',
  currentMusic: {
    uuid: '',
    imageUri: '',
    musicUri: '',
    title: '',
    composer: '',
    copyright: '',
  },
  currentTrack: [],
  suffleTrack: [],
};

const currentTrackState = atom<CurrentTrackState>({
  key: 'currentTrackState',
  default: DefaultValue,
});

export default currentTrackState;
