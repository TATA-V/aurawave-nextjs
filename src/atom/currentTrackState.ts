import { atom } from 'recoil';
import localStorageEffect from './localStorageEffect';

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
  showMusicDetail: boolean;
  currentMusic: CurrentMusic;
  currentTrack: CurrentMusic[];
  suffleTrack: CurrentMusic[];
}

const DefaultValue: CurrentTrackState = {
  isShow: false,
  isLoop: false,
  playMode: '',
  showMusicDetail: false,
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
  effects: [localStorageEffect('current_track')],
});

export default currentTrackState;
