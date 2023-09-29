import {
  deleteDoc,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  updateDoc,
  startAfter,
} from 'firebase/firestore';
import { firestore } from './config';
import {
  DeleteMudicDoc,
  SetMusicDoc,
  MusicData,
  GetMusicDocs,
  UpdateMusicPhoto,
  GetNextMusicDocs,
} from '@/types/musicTypes';

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

// 앨범 이미지 uri 수정하기
export async function updateMusicImg({ uuid, imageUri }: UpdateMusicPhoto) {
  const musicRef = doc(firestore, 'music', uuid);
  await updateDoc(musicRef, { imageUri: imageUri });
}

// music collection 가져오기
const musicCollection = collection(firestore, 'music');

// 모든 음악데이터 가져오기
export async function getAllMusicDocs() {
  const musicArr: MusicData[] = [];

  const querySanpshot = await getDocs(query(musicCollection));

  querySanpshot.forEach((doc) => {
    musicArr.push(doc.data() as MusicData);
  });
  return musicArr;
}

// 최근에 추가한 음악 n개를 orderBy에 맞게 가져오기
export async function getMusicDocs({ limitNum, orderByField, orderByDirection }: GetMusicDocs) {
  const musicArr: MusicData[] = [];

  const querySanpshot = await getDocs(
    query(musicCollection, orderBy(orderByField, orderByDirection), limit(limitNum))
  );

  querySanpshot.forEach((doc) => {
    musicArr.push(doc.data() as MusicData);
  });
  return musicArr;
}

// 마지막 음악 데이터(lastDoc) 이후의 음악 데이터 가져오기
export async function getNextMusicDocs({ lastDoc, limitNum }: GetNextMusicDocs) {
  const musicArr: MusicData[] = [];

  const querySanpshot = await getDocs(query(musicCollection, startAfter(lastDoc), limit(limitNum)));

  console.log('querySanpshot:', querySanpshot);

  querySanpshot.forEach((doc) => {
    musicArr.push(doc.data() as MusicData);
  });
  return musicArr;
}
