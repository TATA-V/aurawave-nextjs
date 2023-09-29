import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import * as S from '@/styled/authStyled';
import { auth, storage } from '@/firebase/config';
import { updateMusicImg } from '@/firebase/music';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import albumDefaultImg from '@/assets/jpg-file/album-defult-Img.jpg';

function ChangeMusicImg() {
  const [uuid, setUuid] = useState('');
  const [imageUri, setImageUri] = useState('');
  const imageRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const user = auth.currentUser;
    if (user && files && files.length > 0) {
      const file = files[0];
      const metadata = { contentType: file.type };

      let uploadTask = uploadBytesResumable(
        ref(storage, `music_image/${uuid}`), // 저장 경로
        file, // 이미지 파일
        metadata // 파일 타입
      );

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              break;
            case 'storage/canceled':
              break;
            case 'storage/unknown':
              break;

            default:
              break;
          }
        },
        () => {
          // 업로드가 성공적으로 완료
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUri(downloadURL);
          });
        }
      );
    }
  };

  const handleSubmit = () => {
    if (uuid !== '' && imageUri !== '') {
      // firestore 이미지 수정
      updateMusicImg({ uuid, imageUri });
      setUuid('');
      setImageUri('');
    }
  };

  return (
    <>
      <H3>앨범 이미지 수정</H3>
      <S.InputBox>
        <input
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          type="text"
          placeholder="음악 uuid 입력"
          autoComplete="off"
          required
        />
      </S.InputBox>

      <InputImg
        onChange={handleUploadImage}
        ref={imageRef}
        accept="image/jpeg, image/png"
        type="file"
      />
      <AlbumFile>
        <div className="album-file-box">
          <FileTxt>앨범 이미지</FileTxt>
          <FileBtn onClick={() => imageRef.current?.click()}>
            <i className="i-plus-small" />
          </FileBtn>
        </div>
        <Image
          width={147}
          height={147}
          src={imageUri !== '' ? imageUri : albumDefaultImg}
          alt="album image"
          className="album-img"
        />
      </AlbumFile>
      <S.SubmitBtn onClick={handleSubmit}>앨범 이미지 수정</S.SubmitBtn>
    </>
  );
}

export default ChangeMusicImg;

const H3 = styled.h3`
  color: var(--dark-blue-900);
  font-size: 1.5rem;
  font-weight: 600;
  padding: 28px 0 30px 0;
`;

const AlbumFile = styled.div`
  padding: 13px 0 3px 0;
  display: flex;

  .album-file-box {
    height: 20px;
    display: flex;
    align-items: center;
  }

  .album-img {
    border: 1.5px solid var(--gray-100);
    border-radius: 5px;
    transform: translateX(45px);
    object-fit: cover;
  }
`;

const FileTxt = styled.p`
  color: var(--dark-blue-700);
  font-size: 0.875rem;
  font-weight: 400;
`;

const FileBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid var(--sky-blue-450);
  border-radius: 3px;
  margin: 0 9px 0 9px;
  background-color: var(--sky-blue-400);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.07);
  }

  .i-plus-small {
    font-size: 10px;
  }
`;

const InputImg = styled.input`
  display: none;
`;
