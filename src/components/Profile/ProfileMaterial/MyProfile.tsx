'use client';
import userState from '../../../atom/userState';
import { auth, storage } from '../../../firebase/config';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import Image from 'next/image';
import defaultProfileJpg from '../../../assets/jpg-file/default-profile.jpg';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import styled from 'styled-components';

function MyProfile() {
  const [openTextInput, setOpenTextInput] = useState(false);
  const [changeUsername, setChangeUsername] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userState); // 리코일
  const textInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { username, photoURL, isLoggedIn } = userInfo;
  const user = auth.currentUser;

  // 닉네임 변경 버튼을 눌렀을 경우 textInputRef으로 바로 focus됨
  useEffect(() => {
    if (openTextInput && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [openTextInput]);

  const handleBlueBtnClick = () => {
    // 로그인 안 되어있을 땐 로그인 페이지로 이동
    if (!isLoggedIn) {
      return router.push('/login');
    }
    // 로그인이 되어있을 경우엔 닉네임 변경
    // setOpenTextInput(!openTextInput);
  };

  // 닉네임 변경
  const handleSubmit = async () => {
    setOpenTextInput(false);
    let isValidUsername = changeUsername.length !== 0 && changeUsername.length < 21;
    // firebase 닉네임 변경해주기
    try {
      if (user && isValidUsername) {
        await updateProfile(user, { displayName: changeUsername });
        setUserInfo((data) => ({ ...data, username: changeUsername }));
        setChangeUsername('');
      }
    } catch (error) {
      console.log('닉네임 변경 실패:', error);
    }
  };

  /* 프로필 이미지 수정 */
  // const handleUploadImage = () => {
  //     let uploadTask = uploadBytesResumable(
  //       ref(storage, `user_image/${user.uid}`), // 저장 경로
  //       blob, // 이미지 파일
  //       metadata // 파일 타입
  //     );

  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log('Upload is ' + progress + '% done');
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused');
  //             break;
  //           case 'running':
  //             console.log('Upload is running');
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         switch (error.code) {
  //           case 'storage/unauthorized':
  //             break;
  //           case 'storage/canceled':
  //             break;
  //           case 'storage/unknown':
  //             break;

  //           default:
  //             break;
  //         }
  //       },
  //       () => {
  //         // 업로드가 성공적으로 완료
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           // 프로필 이미지 수정
  //           updateProfile(user, {
  //             photoURL: downloadURL,
  //           });
  //           // 리코일에 저장
  //           setUserInfo((data) => ({ ...data, photoURL: downloadURL }));

  //           // 파이어스토어 유저 이미지 수정하기
  //         });
  //       }
  //     );
  //   }
  // };

  return (
    <MyProfileBlock>
      <LeftBox>
        <p className="name-text">{isLoggedIn ? username : '로그인 해주세요'}</p>
        <button className="login-changename-btn" onClick={handleBlueBtnClick}>
          {isLoggedIn ? '닉네임 변경' : '로그인'}
        </button>
        {openTextInput && (
          <div className="input-box">
            <ChangeNameInput
              className="changename-input"
              defaultValue={changeUsername}
              type="text"
              ref={textInputRef}
              onBlur={() => setOpenTextInput(false)}
              onChange={(e) => setChangeUsername(e.target.value)}
              onSubmit={handleSubmit}
              placeholder="2자 이상 20자 이하로 입력"
            />
            <button className="submit-btn" onClick={handleSubmit}>
              <i className="i-submit" />
            </button>
          </div>
        )}
      </LeftBox>

      <RightBox>
        <Image
          width={86}
          height={86}
          src={isLoggedIn && photoURL !== null ? photoURL : defaultProfileJpg}
          alt="user profile"
          className="profile-img"
        />
        {/* onClick={handleUploadImage} */}
        {isLoggedIn && (
          <button className="pen-icon-box">
            <i className="i-pen-icon" />
          </button>
        )}
      </RightBox>
    </MyProfileBlock>
  );
}

export default MyProfile;

const MyProfileBlock = styled.div`
  height: 172px;
  padding: 53px 22px 18px 22px;
  display: flex;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  .name-text {
    color: var(--dark-blue-900);
    font-size: 1.5625rem;
    font-weight: 700;
  }

  .login-changename-btn {
    height: 22px;
    border: 1px solid var(--sky-blue-450);
    border-radius: 15px;
    padding: 4px 12px 3px 12px;
    margin: 9px 0 5px 0;
    background-color: var(--sky-blue-400);
    color: var(--white-100);
    font-size: 10px;
    font-weight: 400;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-box {
    width: 177px;
    position: relative;
  }

  .submit-btn {
    position: absolute;
    top: 8.5px;
    right: 9px;
  }
`;

const ChangeNameInput = styled.input`
  width: 100%;
  height: 28px;
  color: var(--dark-blue-800);
  font-size: 0.625rem;
  font-weight: 400;
  text-shadow: 0 0 0 var(--dark-blue-800);
  padding: 6px 26.5px 6px 12px;
  border: 1px solid var(--gray-100);
  border-radius: 5px;
  background-color: var(--gray-30);
  line-height: 28px;
  vertical-align: middle;

  &::placeholder {
    color: var(--gray-200);
    text-shadow: 0 0 0 var(--gray-200);
  }

  &:focus {
    outline: none;
  }
`;

const RightBox = styled.div`
  position: relative;

  .pen-icon-box {
    width: 23px;
    height: 23px;
    border: 1px solid var(--gray-100);
    border-radius: 50%;
    background-color: var(--white-100);
    position: absolute;
    right: 0;
    bottom: 10px;
    box-shadow: 0 2px 5px rgba(16, 29, 33, 0.05);
  }

  .i-pen-icon {
    color: var(--dark-blue-800);
    font-size: 9px;
  }

  .profile-img {
    border-radius: 50%;
  }
`;
