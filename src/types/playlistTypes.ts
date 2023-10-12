import { FieldValue, OrderByDirection } from 'firebase/firestore';
import { MusicData } from './musicTypes';

export interface AWPlaylistData {
  uuid: string;
  playlistImageUri: string | File;
  playlistTitle: string;
  description: string;
  musicList: MusicData[];
  timestamp?: FieldValue;
}

export interface UserPlaylistData {
  uuid: string;
  isPublic: boolean;
  playlistImageUri: string | File;
  playlistTitle: string;
  description: string;
  musicList: MusicData[];
  timestamp?: FieldValue;
}

export interface setAwPlaylistDoc {
  uuid: string;
  awplaylistData: AWPlaylistData;
}

export interface DeleteAWPlaylistDoc {
  uuid: string;
}

export interface UpdateAWPlaylist {
  uuid: string;
  awplaylistData: AWPlaylistData;
}

export interface SetUserPlaylistDoc {
  uuid: string;
  playlistData: UserPlaylistData;
}

export interface DeleteUserPlaylistDoc {
  uuid: string;
}

export interface UpdateUserPlaylist {
  uuid: string;
  playlistData: UserPlaylistData;
}

export interface GetAwPlaylistDocs {
  limitNum: number;
  orderByField: string;
  orderByDirection: OrderByDirection;
}
