import { MusicData } from '@/types/musicTypes';
import { atom } from 'recoil';

interface PlaylistData {
  uuid: string;
  isPublic: boolean;
  playlistImageUri: string | File;
  playlistTitle: string;
  description: string;
  musicList: MusicData[];
}

const DefaultValue: PlaylistData = {
  uuid: '',
  isPublic: false,
  playlistImageUri: '',
  playlistTitle: '',
  description: '',
  musicList: [],
};

const playlistDataState = atom<PlaylistData>({
  key: 'playlistData',
  default: DefaultValue,
});

export default playlistDataState;
