import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from './config';
import { DeleteUserDoc, SetUserDoc, UpdateUserDoc, UpdateUserName } from '@/types/userTypes';

// 새로운 유저의 유저 정보 저장
export async function setUserDoc({ userUID, userData }: SetUserDoc) {
  const userDocRef = doc(firestore, 'user', userUID);
  await setDoc(userDocRef, userData);
}

// 유저 photoURL 정보 업데이트
export async function updateUserPhotoURL({ userUID, photoURL }: UpdateUserDoc) {
  const userDocRef = doc(firestore, 'user', userUID);
  await updateDoc(userDocRef, { photoURL: photoURL });
}

// 유저 username 정보 업데이트
export async function updateUserName({ userUID, username }: UpdateUserName) {
  const userDocRef = doc(firestore, 'user', userUID);
  await updateDoc(userDocRef, { username: username });
}

// 유저 정보 삭제
export async function deleteUserDoc({ userUID }: DeleteUserDoc) {
  const userDocRef = doc(firestore, 'user', userUID);
  await deleteDoc(userDocRef);
}
