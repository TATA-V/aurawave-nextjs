import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from './config';
import { DeleteMudicDoc, SetMusicDoc } from '@/types/musicTypes';

// 새로운 음악 정보 등록
export async function setMusicDoc({ uuid, musicData }: SetMusicDoc) {
  const musicRef = doc(firestore, 'music', uuid);
  await setDoc(musicRef, musicData);
}

// 음악 삭제
export async function deleteMudicDoc({ uuid }: DeleteMudicDoc) {
  const musicRef = doc(firestore, 'music', uuid);
  await deleteDoc(musicRef);
}
