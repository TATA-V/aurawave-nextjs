import { UserPlaylistData } from './playlistTypes';

export interface SetUserDoc {
  uuid: string;
  userData: {
    uid: string;
    email: string;
    username: string;
    photoURL?: string;
  };
}

export interface UpdateUserDoc {
  uuid: string;
  photoURL: string;
}

export interface UpdateUserName {
  uuid: string;
  username: string;
}

export interface UpdateUserPlaylists {
  uuid: string;
  playlistData: UserPlaylistData;
}
