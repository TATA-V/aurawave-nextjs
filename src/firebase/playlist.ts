import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from './config';
import {
  AWPlaylistData,
  DeleteAWPlaylistDoc,
  DeleteUserPlaylistDoc,
  GetAwPlaylistDocs,
  SetUserPlaylistDoc,
  UpdateAWPlaylist,
  UpdateUserPlaylist,
  setAwPlaylistDoc,
} from '@/types/playlistTypes';

// 새로운 AuraWave 플레이리스트 정보 등록
export async function setAwPlaylistDoc({ uuid, awplaylistData }: setAwPlaylistDoc) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await setDoc(musicRef, awplaylistData);
}

// AuraWave 플레이리스트 삭제
export async function deleteAwPlaylistDoc({ uuid }: DeleteAWPlaylistDoc) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await deleteDoc(musicRef);
}

// AuraWave 플레이리스트 수정하기
export async function updateAwPlaylist({ uuid, awplaylistData }: UpdateAWPlaylist) {
  const musicRef = doc(firestore, 'aw_playlist', uuid);
  await updateDoc(musicRef, { data: awplaylistData });
}

// AuraWave 플레이리스트 collection 가져오기
const musicCollection = collection(firestore, 'aw_playlist');

// 모든 AuraWave 플레이리스트 가져오기
export async function getAllAwPlaylistDocs() {
  const playlistArr: AWPlaylistData[] = [];

  const querySanpshot = await getDocs(query(musicCollection, orderBy('timestamp', 'desc')));

  querySanpshot.forEach((doc) => {
    playlistArr.push(doc.data() as AWPlaylistData);
  });
  return playlistArr;
}

// AuraWave 플레이리스트 n개를 orderBy에 맞게 가져오기
export async function getAwPlaylistDocs({
  limitNum,
  orderByField,
  orderByDirection,
}: GetAwPlaylistDocs) {
  const playlistArr: AWPlaylistData[] = [];

  const querySanpshot = await getDocs(
    query(musicCollection, orderBy(orderByField, orderByDirection), limit(limitNum))
  );

  querySanpshot.forEach((doc) => {
    playlistArr.push(doc.data() as AWPlaylistData);
  });
  return playlistArr;
}

// ---------------------------

// 새로운 user 플레이리스트 정보 등록
export async function setUserPlaylistDoc({ uuid, playlistData }: SetUserPlaylistDoc) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await setDoc(musicRef, playlistData);
}

// user 플레이리스트 삭제
export async function deleteUserPlaylistDoc({ uuid }: DeleteUserPlaylistDoc) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await deleteDoc(musicRef);
}

// user 플레이리스트 수정하기
export async function updateUserPlaylist({ uuid, playlistData }: UpdateUserPlaylist) {
  const musicRef = doc(firestore, 'user_playlist', uuid);
  await updateDoc(musicRef, { data: playlistData });
}
