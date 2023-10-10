import { MusicData } from '@/types/musicTypes';
import { atom } from 'recoil';

interface CreatePlaylist {
  uuid: string;
  isPublic: boolean;
  playlistImageUri: string | File;
  playlistTitle: string;
  description: string;
  musicList: MusicData[];
}

const DefaultValue: CreatePlaylist = {
  uuid: '',
  isPublic: false,
  playlistImageUri: '',
  playlistTitle: '',
  description: '',
  musicList: [],
};

const createPlaylistState = atom<CreatePlaylist>({
  key: 'createPlaylist',
  default: DefaultValue,
});

export default createPlaylistState;
