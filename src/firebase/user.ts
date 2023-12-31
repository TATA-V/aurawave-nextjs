import { doc, setDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { firestore } from './config';
import {
  SetUserDoc,
  UpdateUserDoc,
  UpdateUserName,
  UpdateUserPlaylists,
  UserData,
} from '@/types/userTypes';

// 새로운 유저의 유저 정보 저장
export async function setUserDoc({ uuid, userData }: SetUserDoc) {
  const userDocRef = doc(firestore, 'user', uuid);
  await setDoc(userDocRef, userData);
}

// 유저의 photoURL 정보 업데이트
export async function updateUserPhotoURL({ uuid, photoURL }: UpdateUserDoc) {
  const userDocRef = doc(firestore, 'user', uuid);
  await updateDoc(userDocRef, { photoURL: photoURL });
}

// 유저의 username 정보 업데이트
export async function updateUserName({ uuid, username }: UpdateUserName) {
  const userDocRef = doc(firestore, 'user', uuid);
  await updateDoc(userDocRef, { username: username });
}

// 유저의 playlists 정보 업데이트
export async function updateUserPlaylists({ uuid, playlistData }: UpdateUserPlaylists) {
  const userDocRef = doc(firestore, 'user', uuid);
  const userDocSnapshot = await getDoc(userDocRef);
  const userData = userDocSnapshot.data();

  const playlistDataArr = userData?.playlists || [];
  playlistDataArr.push(playlistData);
  await updateDoc(userDocRef, { playlists: playlistDataArr });
}

// 현재 유저 정보 가져오기
export async function getUserInfo(uuid: string) {
  const userDocRef = doc(firestore, 'user', uuid);
  const userDocSnapshot = await getDoc(userDocRef);
  const userData = userDocSnapshot.data();
  return userData as UserData;
}

// 유저 정보 삭제
export async function deleteUserDoc(uuid: string) {
  const userDocRef = doc(firestore, 'user', uuid);
  await deleteDoc(userDocRef);
}
