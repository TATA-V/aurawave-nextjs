interface MusicData {
  uuid: string;
  imageUri: string;
  musicUri: string;
  title: string;
  composer: string;
  copyright: string;
}

export interface SetMusicDoc {
  uuid: string;
  musicData: MusicData;
}

export interface DeleteMudicDoc {
  uuid: string;
}
