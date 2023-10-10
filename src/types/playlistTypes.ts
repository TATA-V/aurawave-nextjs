import { MusicData } from './musicTypes';

export interface AWPlaylistData {
  uuid: string;
  playlistImageUri: string | File;
  playlistTitle: string;
  description: string;
  musicList: MusicData[];
}

export interface setAWPlaylistDoc {
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
