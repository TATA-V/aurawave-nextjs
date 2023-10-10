import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './config';
import { DeleteAWPlaylistDoc, UpdateAWPlaylist, setAWPlaylistDoc } from '@/types/playlistTypes';

// 새로운 AuraWave 플레이리스트 정보 등록
export async function setAWPlaylistDoc({ uuid, awplaylistData }: setAWPlaylistDoc) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await setDoc(musicRef, awplaylistData);
}

// AuraWave 플레이리스트 삭제
export async function deleteAWPlaylistDoc({ uuid }: DeleteAWPlaylistDoc) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await deleteDoc(musicRef);
}

// AuraWave 플레이리스트 수정하기
export async function updateAWPlaylist({ uuid, awplaylistData }: UpdateAWPlaylist) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await updateDoc(musicRef, { data: awplaylistData });
}

// 새로운 user 플레이리스트 정보 등록
export async function setUserPlaylistDoc({ uuid, awplaylistData }: setAWPlaylistDoc) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await setDoc(musicRef, awplaylistData);
}

// user 플레이리스트 삭제
export async function deleteUserPlaylistDoc({ uuid }: DeleteAWPlaylistDoc) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await deleteDoc(musicRef);
}

// user 플레이리스트 수정하기
export async function updateUserPlaylist({ uuid, awplaylistData }: UpdateAWPlaylist) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await updateDoc(musicRef, { data: awplaylistData });
}
